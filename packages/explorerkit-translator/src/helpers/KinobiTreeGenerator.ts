import {
  array,
  bool,
  bytes,
  BytesSerializerOptions,
  dataEnum,
  f32,
  f64,
  i8,
  i16,
  i32,
  i64,
  i128,
  map,
  NumberSerializer,
  option,
  OptionSerializerOptions,
  publicKey,
  set,
  string,
  StringSerializerOptions,
  struct,
  tuple,
  u8,
  u16,
  u32,
  u64,
  u128,
  unit,
} from "@metaplex-foundation/umi/serializers";
import { splDiscriminate } from "@solana/spl-type-length-value";
import {
  assertStructFieldTypeNode,
  bytesTypeNode,
  createFromIdls,
  createFromJson,
  DefinedTypeNode,
  EnumVariantTypeNode,
  getAllAccounts,
  getAllDefinedTypes,
  getAllInstructions,
  Idl,
  isStructTypeNode,
  NumberFormat,
  numberTypeNode,
  prefixedSize,
  RootNode,
  stringTypeNode,
  structFieldTypeNode,
  TransformNodesVisitor,
  TypeNode,
} from "@solanafm/kinobi-lite";
import { encodeBase58 } from "@solanafm/utils";

import { FMShankSerializer, KinobiTreeGeneratorType, ShankSerializer } from "../types/KinobiTreeGenerator";
import { toSnakeCase } from "./common";

export class KinobiTreeGenerator {
  public rootNode: RootNode;
  public treeGeneratorType: KinobiTreeGeneratorType;

  constructor(
    idl: Idl,
    treeGeneratorType: KinobiTreeGeneratorType = KinobiTreeGeneratorType.INSTRUCTIONS,
    kinobiJsonString?: string
  ) {
    const kinobiTree = kinobiJsonString ? createFromJson(kinobiJsonString) : createFromIdls([idl]);

    // initialize patches for specific IDLs that wants to thbe patched via Kinobi
    // probably will throw into a function in the future ?
    if (idl.metadata.address === "Config1111111111111111111111111111111111111") {
      kinobiTree.update(
        new TransformNodesVisitor([
          {
            selector: { kind: "structFieldTypeNode", name: "info" },
            transformer: (node) => {
              assertStructFieldTypeNode(node);
              return structFieldTypeNode({
                ...node,
                child: stringTypeNode({
                  size: prefixedSize(numberTypeNode("u64")),
                }),
              });
            },
          },
        ])
      );
    } else if (idl.metadata.address === "BPFLoaderUpgradeab1e11111111111111111111111") {
      kinobiTree.update(
        new TransformNodesVisitor([
          {
            selector: { kind: "structFieldTypeNode", name: "data" },
            transformer: (node) => {
              assertStructFieldTypeNode(node);
              return structFieldTypeNode({
                ...node,
                child: bytesTypeNode({
                  kind: "remainder",
                }),
              });
            },
          },
        ])
      );
    } else if (idl.metadata.address === "noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV") {
      kinobiTree.update(
        new TransformNodesVisitor([
          {
            selector: { kind: "structFieldTypeNode", name: "data" },
            transformer: (node) => {
              assertStructFieldTypeNode(node);
              return structFieldTypeNode({
                ...node,
                child: bytesTypeNode({
                  kind: "remainder",
                }),
              });
            },
          },
        ])
      );
    } else if (idl.metadata.address === "11111111111111111111111111111111") {
      kinobiTree.update(
        new TransformNodesVisitor([
          {
            selector: { kind: "structFieldTypeNode", name: "seed" },
            transformer: (node) => {
              assertStructFieldTypeNode(node);
              return structFieldTypeNode({
                ...node,
                child: stringTypeNode({
                  size: prefixedSize(numberTypeNode("u64")),
                }),
              });
            },
          },
        ])
      );
    }

    this.rootNode = kinobiTree.getRoot();
    this.treeGeneratorType = treeGeneratorType;
  }

  /**
   * Constructs a map with the discriminant as the key and the serializer as the value for a single shank-generated IDL
   * @param treeGeneratorType - The type of tree generator to construct
   * @param interfaceDiscriminantMode - Uses 8-bytes discriminant for the map key name if true, otherwise uses the discriminant value from the IDL
   * @param interfacePrefixString - String to prefix the interface name with
   * @returns A map with the discriminant as the key and the serializer as the value
   */
  public constructLayout(
    treeGeneratorType: KinobiTreeGeneratorType = KinobiTreeGeneratorType.INSTRUCTIONS,
    interfaceDiscriminantMode: boolean = false,
    interfacePrefixString?: string
  ): Map<number | string, FMShankSerializer> {
    return this._constructLayout(treeGeneratorType, interfaceDiscriminantMode, interfacePrefixString);
  }

  private _constructLayout(
    treeGeneratorType: KinobiTreeGeneratorType,
    interfaceDiscriminantMode: boolean,
    interfacePrefixString?: string
  ): Map<number | string, FMShankSerializer> {
    const typeNodes = getAllDefinedTypes(this.rootNode);

    switch (treeGeneratorType) {
      case KinobiTreeGeneratorType.INSTRUCTIONS:
        const instructionLayout = new Map<number | string, FMShankSerializer>();
        const instructionNodes = getAllInstructions(this.rootNode);
        instructionNodes.forEach((instructionNode, index) => {
          if (isStructTypeNode(instructionNode.dataArgs.struct)) {
            const fields = instructionNode.dataArgs.struct.fields;

            if (fields[0]) {
              // shank-generated IDLs have the discriminant stated in the IDL
              const ixDiscriminant = fields[0].defaultsTo?.value;

              // if this is a IDL generated from shank and program is not made with the anchor framework
              if (ixDiscriminant?.kind === "number") {
                const discriminant = ixDiscriminant.value;
                const serializer = KinobiTreeGenerator.createSerializer(
                  instructionNode.dataArgs.struct,
                  typeNodes,
                  instructionNode.name
                );

                const fmShankSerializer: FMShankSerializer = {
                  serializer: serializer[1],
                  instructionName: serializer[0],
                };
                instructionLayout.set(discriminant, fmShankSerializer);
              }

              // If there's no discriminant, we will still want to try to create the layout
              if (!ixDiscriminant) {
                // TODO: Would merge 8-bytes discriminants in the future when we fully merge A`nchor with ExplorerKit.
                const serializer = KinobiTreeGenerator.createSerializer(
                  instructionNode.dataArgs.struct,
                  typeNodes,
                  instructionNode.name
                );

                const fmShankSerializer: FMShankSerializer = {
                  serializer: serializer[1],
                  instructionName: serializer[0],
                };

                if (interfaceDiscriminantMode) {
                  // Will convert to snake case for now since all the discriminators are made from snake-cases
                  const ixName = toSnakeCase(instructionNode.name);
                  const discriminant = splDiscriminate(`${interfacePrefixString ?? ""}:${ixName}`);
                  instructionLayout.set(encodeBase58(discriminant), fmShankSerializer);
                } else {
                  instructionLayout.set(index, fmShankSerializer);
                }
              }
              // !For anchor in the future
              // if (metadataValue?.__kind === "list") {
              //   const discriminant = metadataValue.values;
              //   const array: number[] = [];
              //   discriminant.forEach((value) => {
              //     if (value.__kind === "number") {
              //       array.push(value.value);
              //     }
              //   });
            }
          }
        });

        return instructionLayout;

      case KinobiTreeGeneratorType.ACCOUNTS:
        const accountNodes = getAllAccounts(this.rootNode);
        const accountLayout = new Map<number | string, FMShankSerializer>();

        accountNodes.forEach((account, index) => {
          if (isStructTypeNode(account.data.struct)) {
            const fields = account.data.struct.fields;
            const ixDiscriminant = fields[0]?.defaultsTo?.value;

            if (ixDiscriminant) {
              // if this is a IDL generated from shank and program is not made with the anchor framework
              if (ixDiscriminant?.kind === "number") {
                const discriminant = ixDiscriminant.value;
                const serializer = KinobiTreeGenerator.createSerializer(
                  account.data.struct,
                  typeNodes,
                  account.name,
                  treeGeneratorType
                );

                const fmShankSerializer: FMShankSerializer = {
                  serializer: serializer[1],
                  instructionName: serializer[0],
                };
                accountLayout.set(discriminant, fmShankSerializer);
              } else if (ixDiscriminant?.kind === "list") {
                const discriminant = ixDiscriminant.values;
                const array: number[] = [];
                discriminant.forEach((value) => {
                  if (value.kind === "number") {
                    array.push(value.value);
                  }
                });

                const buffer = Buffer.from(array);
                const serializer = KinobiTreeGenerator.createSerializer(
                  account.data.struct,
                  typeNodes,
                  account.name,
                  treeGeneratorType
                );

                const fmShankSerializer: FMShankSerializer = {
                  serializer: serializer[1],
                  instructionName: serializer[0],
                };

                accountLayout.set(buffer.toString("base64"), fmShankSerializer);
              }
            } else {
              const serializer = KinobiTreeGenerator.createSerializer(
                account.data.struct,
                typeNodes,
                account.name,
                treeGeneratorType
              );
              const fmShankSerializer: FMShankSerializer = {
                serializer: serializer[1],
                instructionName: serializer[0],
              };

              // TODO: Will try to strongly take reference from the IDL in the future
              const accountDiscriminator = index;
              accountLayout.set(accountDiscriminator, fmShankSerializer);
            }
          }
        });

        return accountLayout;

      case KinobiTreeGeneratorType.TYPES:
        const parentTypeNodes = getAllDefinedTypes(this.rootNode);
        const typeLayout = new Map<string, FMShankSerializer>();

        parentTypeNodes.forEach((typeNode) => {
          const serializer = KinobiTreeGenerator.createSerializer(
            typeNode.data,
            typeNodes,
            typeNode.name,
            treeGeneratorType
          );

          const fmShankSerializer: FMShankSerializer = {
            serializer: serializer[1],
            instructionName: serializer[0],
          };

          typeLayout.set(typeNode.idlName, fmShankSerializer);
        });

        return typeLayout;

      default:
        return new Map();
    }
  }

  public static createSerializer(
    field: TypeNode | EnumVariantTypeNode,
    types: DefinedTypeNode[],
    keyName: string,
    treeGeneratorType: KinobiTreeGeneratorType = KinobiTreeGeneratorType.INSTRUCTIONS
  ): [string, ShankSerializer] {
    switch (field.kind) {
      case "arrayTypeNode":
        const innerArrayLayout = KinobiTreeGenerator.createSerializer(field.child, types, keyName, treeGeneratorType);
        if (innerArrayLayout[1] !== null) {
          let size = undefined;
          switch (field.size.kind) {
            case "fixed":
              size = field.size.value;
              break;

            case "prefixed":
              size = KinobiTreeGenerator.createNumberSerializer(field.size.prefix.format, "size")[1] ?? undefined;
              break;

            case "remainder":
              return [keyName, array(innerArrayLayout[1], { size: "remainder" })];
            // break;
          }

          return [keyName, array(innerArrayLayout[1], { size: size })];
        }
        return ["typeArrayNodeNull", null];

      // "native" type
      case "boolTypeNode":
        return [keyName, bool()];

      case "bytesTypeNode":
        // "native" type
        let size: BytesSerializerOptions["size"] | null = null;
        switch (field.size.kind) {
          case "fixed":
            size = field.size.value;
            break;

          case "prefixed":
            size = KinobiTreeGenerator.createNumberSerializer(field.size.prefix.format, "bytesPrefixedNumber")[1];
            break;

          case "remainder":
            size = "variable";
            break;

          default:
            break;
        }

        if (size) {
          return [
            keyName,
            bytes({
              size: size,
            }),
          ];
        }

        return [keyName, bytes()];

      case "linkTypeNode":
        const definedType = field.name;

        // extract the type from a list of types from the kinobi tree
        const filteredDefinedType = types.filter((type) => {
          return type.name === definedType;
        });

        const typeManifest = filteredDefinedType[0];
        if (typeManifest) {
          const innerDefinedLinkLayout = KinobiTreeGenerator.createSerializer(
            typeManifest.data,
            types,
            typeManifest.name,
            treeGeneratorType
          );
          return innerDefinedLinkLayout;
        }

        return ["typeDefinedLinkNodeNull", null];

      case "enumTypeNode":
        const innerEnumLayouts: any = [];
        const enumDiscSize = KinobiTreeGenerator.createNumberSerializer(field.size.format, "size");
        field.variants.forEach((variant) => {
          const layout = KinobiTreeGenerator.createSerializer(variant, types, variant.name, treeGeneratorType);
          innerEnumLayouts.push(layout);
        });

        if (enumDiscSize && enumDiscSize[1]) {
          return [
            keyName,
            dataEnum(innerEnumLayouts, {
              size: enumDiscSize[1],
            }),
          ];
        }

        return [keyName, dataEnum(innerEnumLayouts)];

      case "mapTypeNode":
        const keyLayout = KinobiTreeGenerator.createSerializer(field.key, types, keyName, treeGeneratorType);
        const valueLayout = KinobiTreeGenerator.createSerializer(field.value, types, keyName, treeGeneratorType);

        if (keyLayout[1] && valueLayout[1]) {
          let size = undefined;
          switch (field.size.kind) {
            case "fixed":
              size = field.size.value;
              break;

            case "prefixed":
              size = KinobiTreeGenerator.createNumberSerializer(field.size.prefix.format, "size")[1] ?? undefined;
              break;

            case "remainder":
              return [
                keyName,
                map(keyLayout[1], valueLayout[1], {
                  description: "",
                  size: "remainder",
                }),
              ];
          }

          return [
            keyName,
            map(keyLayout[1], valueLayout[1], {
              description: "",
              size: size,
            }),
          ];
        }

        return ["typeMapNodeNull", null];

      // "native" type
      case "numberTypeNode":
        const serializer = KinobiTreeGenerator.createNumberSerializer(field.format, keyName);
        return serializer;

      case "optionTypeNode":
        const innerOptionLayout = KinobiTreeGenerator.createSerializer(field.child, types, keyName, treeGeneratorType);

        const options: OptionSerializerOptions = {
          fixed: field.fixed,
          prefix: KinobiTreeGenerator.createNumberSerializer(field.prefix.format, "size")[1] ?? undefined,
        };

        if (innerOptionLayout[1]) {
          return [keyName, option(innerOptionLayout[1], options)];
        }

        return ["typeOptionNodeNull", null];

      // "native" type
      case "publicKeyTypeNode":
        return [keyName, publicKey()];

      case "setTypeNode":
        const innerSetLayout = KinobiTreeGenerator.createSerializer(field.child, types, keyName, treeGeneratorType);
        if (innerSetLayout[1]) {
          return [keyName, set(innerSetLayout[1])];
        }

        return ["typeSetNodeNull", null];

      // "native" type
      case "stringTypeNode":
        let stringSize: StringSerializerOptions["size"] | null = null;
        switch (field.size.kind) {
          case "fixed":
            stringSize = field.size.value;
            break;

          case "prefixed":
            stringSize = KinobiTreeGenerator.createNumberSerializer(
              field.size.prefix.format,
              "stringPrefixedNumber"
            )[1];
            break;

          case "remainder":
            stringSize = "variable";
            break;

          default:
            break;
        }

        if (stringSize) {
          return [
            keyName,
            string({
              size: stringSize,
            }),
          ];
        }

        return [keyName, string()];

      case "structTypeNode":
        const structLayout: Array<[string, NonNullable<ShankSerializer>]> = [];
        field.fields.forEach((innerField) => {
          const name = innerField.name;
          const innerStructLayout = KinobiTreeGenerator.createSerializer(
            innerField.child,
            types,
            name,
            treeGeneratorType
          );

          if (innerStructLayout[1] !== null) {
            const innerLayout = innerStructLayout[1];
            structLayout.push([innerStructLayout[0], innerLayout]);
          }
        });

        return [keyName, struct(structLayout)];

      case "tupleTypeNode":
        const innerTupleLayouts: Array<NonNullable<ShankSerializer>> = [];
        field.children.forEach((item) => {
          const innerItemLayout = KinobiTreeGenerator.createSerializer(item, types, keyName, treeGeneratorType);
          if (innerItemLayout[1]) {
            innerTupleLayouts.push(innerItemLayout[1]);
          }
        });

        return [keyName, tuple(innerTupleLayouts)];

      case "enumEmptyVariantTypeNode":
        return [field.name, unit()];

      case "enumStructVariantTypeNode":
        const innerEnumLayout = KinobiTreeGenerator.createSerializer(field.struct, types, keyName, treeGeneratorType);
        if (innerEnumLayout[1]) {
          return [keyName, innerEnumLayout[1]];
        }

        return ["typeEnumStructVariantNodeNull", null];

      case "enumTupleVariantTypeNode":
        const innerEnumTupleLayout = KinobiTreeGenerator.createSerializer(
          field.tuple,
          types,
          keyName,
          treeGeneratorType
        );
        if (innerEnumTupleLayout[1]) {
          return [keyName, innerEnumTupleLayout[1]];
        }

        return ["typeEnumStructVariantNodeNull", null];

      default:
        console.error("Unknown node type", field);
        return ["nullSerializer", null];
    }
  }

  public static createNumberSerializer(field: NumberFormat, keyName: string): [string, NumberSerializer | null] {
    switch (field) {
      case "u8":
        return [keyName, u8()];

      case "u16":
        return [keyName, u16()];

      case "u32":
        return [keyName, u32()];

      case "u64":
        return [keyName, u64()];

      case "u128":
        return [keyName, u128()];

      case "i8":
        return [keyName, i8()];

      case "i16":
        return [keyName, i16()];

      case "i32":
        return [keyName, i32()];

      case "i64":
        return [keyName, i64()];

      case "i128":
        return [keyName, i128()];

      case "f32":
        return [keyName, f32()];

      case "f64":
        return [keyName, f64()];

      default:
        console.error("Unidentifiable field of:", field);
        return ["null", null];
    }
  }
}
