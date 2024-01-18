import { base58 } from "@metaplex-foundation/umi-serializers";
import { Idl, Idl as ShankIdl } from "@solanafm/kinobi-lite";
import { convertBNToNumberInObject, encodeBase58 } from "@solanafm/utils";

import { mapDataTypeToName } from "../../../helpers/idl";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { mapMultisigAccountKeysToName } from "../../../helpers/multisig-checker";
import {
  ConfidentialTransferExtensionIDL,
  ConfidentialTransferFeeExtensionIDL,
  CpiGuardExtensionIDL,
  DefaultAccountStateExtensionIDL,
  GroupMemberPointerIDL,
  GroupPointerIDL,
  InterestBearingMintIDL,
  MemoTransferExtensionIDL,
  MetadataPointerExtensionIdl,
  TokenGroupInterfaceExtensionIDL,
  TokenMetadataInterfaceExtensionIDL,
  TransferFeeExtensionIDL,
  TransferHookExtensionIDL,
} from "../../../idls/token-22/extensions";
import { InstructionParserInterface } from "../../../interfaces";
import { IdlItem } from "../../../types/IdlItem";
import { FMShankSerializer, KinobiTreeGeneratorType } from "../../../types/KinobiTreeGenerator";
import { ParserOutput, ParserType } from "../../../types/Parsers";
import { serializeTransferFeeExt } from "./token-2022-extensions";

export type ExtensionTypes = {
  extensionInstructionName: string;
  extensionInstructionData: any;
};

export const createTokenV2Ix: (idlItem: IdlItem) => InstructionParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as ShankIdl;
  const instructionsLayout = new KinobiTreeGenerator(idl).constructLayout();

  // Interface layouts to create
  const tokenMetadataInterfaceLayout = new KinobiTreeGenerator(TokenMetadataInterfaceExtensionIDL).constructLayout(
    KinobiTreeGeneratorType.INSTRUCTIONS,
    true,
    "spl_token_metadata_interface"
  );

  const tokenGroupInterfaceLayout = new KinobiTreeGenerator(TokenGroupInterfaceExtensionIDL).constructLayout(
    KinobiTreeGeneratorType.INSTRUCTIONS,
    true,
    "spl_token_group_interface"
  );

  const parseInstructions = (instructionData: string, accountKeys?: string[], mapTypes?: boolean): ParserOutput => {
    try {
      const dataBuffer = base58.serialize(instructionData);
      const ixDiscriminant = Buffer.from(dataBuffer).readUint8(0);

      const ixSerializer = instructionsLayout.get(ixDiscriminant);

      // Token 2022 has interfaces which uses 8 bytes discriminants to identify the instruction, we will check for the default logic first before
      // proceeding with interface discriminants
      if (ixSerializer && dataBuffer.byteLength > 0) {
        switch (ixDiscriminant) {
          // Transfer Fee Extension Enum
          case 26:
            const transferFeeData = serializeTransferFeeExt(TransferFeeExtensionIDL, dataBuffer, mapTypes, accountKeys);

            if (transferFeeData) {
              return {
                name: ixSerializer.instructionName,
                data: convertBNToNumberInObject(transferFeeData),
                type: ParserType.INSTRUCTION,
              };
            }
            break;

          // Confidential Transfer Extension Enum
          case 27:
            const confidentialTransferData = serializeExtension(
              ConfidentialTransferExtensionIDL,
              dataBuffer,
              mapTypes,
              accountKeys
            );

            if (confidentialTransferData) {
              return {
                name: ixSerializer.instructionName,
                data: convertBNToNumberInObject(confidentialTransferData),
                type: ParserType.INSTRUCTION,
              };
            }
            break;

          // Default Account State Extension Enum
          case 28:
            const defaultAccountStateData = serializeExtension(
              DefaultAccountStateExtensionIDL,
              dataBuffer,
              mapTypes,
              accountKeys
            );

            if (defaultAccountStateData) {
              return {
                name: ixSerializer.instructionName,
                data: convertBNToNumberInObject(defaultAccountStateData),
                type: ParserType.INSTRUCTION,
              };
            }
            break;

          // Memo Transfer Extension Enum
          case 30:
            const memoTransferData = serializeExtension(MemoTransferExtensionIDL, dataBuffer, mapTypes, accountKeys);

            if (memoTransferData) {
              return {
                name: ixSerializer.instructionName,
                data: convertBNToNumberInObject(memoTransferData),
                type: ParserType.INSTRUCTION,
              };
            }
            break;

          // Interest Bearing Mint Extension Enum
          case 33:
            if (dataBuffer.byteLength < 2) {
              return null;
            }

            const interestBearingMintData = serializeExtension(
              InterestBearingMintIDL,
              dataBuffer,
              mapTypes,
              accountKeys
            );

            if (interestBearingMintData) {
              return {
                name: ixSerializer.instructionName,
                data: convertBNToNumberInObject(interestBearingMintData),
                type: ParserType.INSTRUCTION,
              };
            }
            break;

          // CPI Guard Extension Enum
          case 34:
            if (dataBuffer.byteLength < 2) {
              return null;
            }

            const cpiGuardData = serializeExtension(CpiGuardExtensionIDL, dataBuffer, mapTypes, accountKeys);

            if (cpiGuardData) {
              return {
                name: ixSerializer.instructionName,
                data: convertBNToNumberInObject(cpiGuardData),
                type: ParserType.INSTRUCTION,
              };
            }
            break;

          // Transfer Hook Extension Enum
          case 36:
            if (dataBuffer.byteLength < 2) {
              return null;
            }

            const transferHookData = serializeExtension(TransferHookExtensionIDL, dataBuffer, mapTypes, accountKeys);

            if (transferHookData) {
              return {
                name: ixSerializer.instructionName,
                data: convertBNToNumberInObject(transferHookData),
                type: ParserType.INSTRUCTION,
              };
            }
            break;

          // Confidential Transfer FEE Extension Enum
          case 37:
            if (dataBuffer.byteLength < 2) {
              return null;
            }

            const confidentialTransferFeeData = serializeExtension(
              ConfidentialTransferFeeExtensionIDL,
              dataBuffer,
              mapTypes,
              accountKeys
            );

            if (confidentialTransferFeeData) {
              return {
                name: ixSerializer.instructionName,
                data: convertBNToNumberInObject(confidentialTransferFeeData),
                type: ParserType.INSTRUCTION,
              };
            }
            break;

          // Metadata Pointer Extension Enum
          case 39:
            if (dataBuffer.byteLength < 2) {
              return null;
            }

            const metadataPointerData = serializeExtension(
              MetadataPointerExtensionIdl,
              dataBuffer,
              mapTypes,
              accountKeys
            );

            if (metadataPointerData) {
              return {
                name: ixSerializer.instructionName,
                data: convertBNToNumberInObject(metadataPointerData),
                type: ParserType.INSTRUCTION,
              };
            }
            break;

          // Group Pointer Extension Enum
          case 40:
            if (dataBuffer.byteLength < 2) {
              return null;
            }

            const groupMemberPointerData = serializeExtension(GroupMemberPointerIDL, dataBuffer, mapTypes, accountKeys);

            if (groupMemberPointerData) {
              return {
                name: ixSerializer.instructionName,
                data: convertBNToNumberInObject(groupMemberPointerData),
                type: ParserType.INSTRUCTION,
              };
            }
            break;

          // Group Member Pointer Extension Enum
          case 41:
            if (dataBuffer.byteLength < 2) {
              return null;
            }

            const groupPointerData = serializeExtension(GroupPointerIDL, dataBuffer, mapTypes, accountKeys);

            if (groupPointerData) {
              return {
                name: ixSerializer.instructionName,
                data: convertBNToNumberInObject(groupPointerData),
                type: ParserType.INSTRUCTION,
              };
            }
            break;

          // If there's no nested extensions, it will use the default logic of deserializing the instruction
          // For Token 2022 Program, we will assume that those instructions with more than 1 account keys are usually Multisig Instructions
          default:
            const decodedShankData = ixSerializer.serializer?.deserialize(dataBuffer);
            if (decodedShankData && decodedShankData[0]) {
              // Will only work for numbered discriminant for now
              // Means no anchor support
              const filteredIdlInstruction = idl.instructions?.filter(
                (instruction) => instruction.discriminant?.value === ixDiscriminant
              );

              if (mapTypes) {
                decodedShankData[0] = mapDataTypeToName(
                  decodedShankData[0],
                  filteredIdlInstruction[0]?.args,
                  filteredIdlInstruction[0]?.discriminant
                );
              }

              if (filteredIdlInstruction.length > 0) {
                const instructionAccounts = filteredIdlInstruction[0]?.accounts;
                const mappedAccountKeys = mapMultisigAccountKeysToName(accountKeys, instructionAccounts);

                return {
                  name: ixSerializer.instructionName,
                  data: { ...convertBNToNumberInObject(decodedShankData[0]), ...mappedAccountKeys },
                  type: ParserType.INSTRUCTION,
                };
              }

              return {
                name: ixSerializer.instructionName,
                data: convertBNToNumberInObject(decodedShankData[0]),
                type: ParserType.INSTRUCTION,
              };
            }
            break;
        }
      } else {
        // Slices the first 8 bytes of the instruction data to check for interface discriminants
        const interfaceDiscriminant = Buffer.from(dataBuffer).subarray(0, 8);
        const bs58Discriminant = encodeBase58(interfaceDiscriminant);
        let interfaceSerializer: FMShankSerializer | undefined;

        // Iterate through the interface layouts and check if the discriminant matches
        if (tokenMetadataInterfaceLayout.has(bs58Discriminant) && dataBuffer.byteLength > 8) {
          interfaceSerializer = tokenMetadataInterfaceLayout.get(bs58Discriminant);
        } else if (tokenGroupInterfaceLayout.has(bs58Discriminant) && dataBuffer.byteLength > 8) {
          interfaceSerializer = tokenGroupInterfaceLayout.get(bs58Discriminant);
        }

        if (interfaceSerializer) {
          const decodedShankData = interfaceSerializer.serializer?.deserialize(dataBuffer.subarray(8));
          if (decodedShankData && decodedShankData[0]) {
            // Will only work for numbered discriminant for now
            // Means no anchor support
            const filteredIdlInstruction = idl.instructions?.filter(
              (instruction) => instruction.discriminant?.value === ixDiscriminant
            );

            if (mapTypes) {
              decodedShankData[0] = mapDataTypeToName(
                decodedShankData[0],
                filteredIdlInstruction[0]?.args,
                filteredIdlInstruction[0]?.discriminant
              );
            }

            if (filteredIdlInstruction.length > 0) {
              const instructionAccounts = filteredIdlInstruction[0]?.accounts;
              const mappedAccountKeys = mapMultisigAccountKeysToName(accountKeys, instructionAccounts);

              return {
                name: interfaceSerializer.instructionName,
                data: { ...convertBNToNumberInObject(decodedShankData[0]), ...mappedAccountKeys },
                type: ParserType.INSTRUCTION,
              };
            }

            return {
              name: interfaceSerializer.instructionName,
              data: convertBNToNumberInObject(decodedShankData[0]),
              type: ParserType.INSTRUCTION,
            };
          }
        }
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getProgramName = (): string => {
    return idl.name;
  };

  /**
   * Default Token 2022 Extension Serializer
   * @param {Idl} extensionIDL - The IDL of the transfer fee extension
   * @param {Uint8Array} dataBuffer - The data buffer containing the extension instruction data.
   * @param {boolean} [mapTypes=false] - Whether to map the data types to their names.
   * @param {string[]} [accountKeys=[]] - The account keys associated with the instruction.
   * @returns {ExtensionTypes | null} The serialized transfer fee extension instruction data.
   */
  const serializeExtension = (
    extensionIDL: Idl,
    dataBuffer: Uint8Array,
    mapTypes?: boolean,
    accountKeys?: string[]
  ): ExtensionTypes | null => {
    const extensionSerializerLayout = new KinobiTreeGenerator(extensionIDL).constructLayout();
    const extensionIxDiscriminant = Buffer.from(dataBuffer).readUint8(1);
    const extensionSerializer = extensionSerializerLayout.get(extensionIxDiscriminant);

    // This is to slice the initial discriminant from the parent token instruction data
    const dataToSerialize = dataBuffer.slice(1);

    if (extensionSerializer) {
      const decodedShankData = extensionSerializer.serializer?.deserialize(dataToSerialize);

      if (decodedShankData && decodedShankData[0]) {
        const filteredIdlInstruction = extensionIDL.instructions?.filter(
          (instruction) => instruction.discriminant?.value === extensionIxDiscriminant
        );

        if (mapTypes) {
          decodedShankData[0] = mapDataTypeToName(
            decodedShankData[0],
            filteredIdlInstruction[0]?.args,
            filteredIdlInstruction[0]?.discriminant
          );
        }

        if (filteredIdlInstruction.length > 0) {
          const instructionAccounts = filteredIdlInstruction[0]?.accounts;
          const mappedAccountKeys = mapMultisigAccountKeysToName(accountKeys, instructionAccounts);

          return {
            extensionInstructionName: extensionSerializer.instructionName,
            extensionInstructionData: { ...convertBNToNumberInObject(decodedShankData[0]), ...mappedAccountKeys },
          };
        }

        return {
          extensionInstructionName: extensionSerializer.instructionName,
          extensionInstructionData: convertBNToNumberInObject(decodedShankData[0]),
        };
      }
    }

    return null;
  };

  return {
    instructionsLayout,
    parseInstructions,
    getProgramName,
  };
};
