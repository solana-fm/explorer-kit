import { base58 } from "@metaplex-foundation/umi";
import { IdlType } from "@solanafm/kinobi-lite";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { DataWithMappedType } from "../../../helpers/idl";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { InstructionParserInterface } from "../../../interfaces";
import { IdlItem } from "../../../types/IdlItem";
import { KinobiTreeGeneratorType } from "../../../types/KinobiTreeGenerator";
import { ParserOutput, ParserType } from "../../../types/Parsers";

export const createShankIxMemo: (idlItem: IdlItem) => InstructionParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as string;
  const instructionsLayout = new KinobiTreeGenerator(
    {
      version: "",
      name: "",
      instructions: [],
      metadata: {
        address: "",
      },
    },
    KinobiTreeGeneratorType.INSTRUCTIONS,
    idl
  ).constructLayout();

  const parseInstructions = (instructionData: string, accountKeys?: string[], mapTypes?: boolean): ParserOutput => {
    try {
      const dataBuffer = base58.serialize(instructionData);
      const ixSerializer = instructionsLayout.get(0);

      if (ixSerializer && dataBuffer.byteLength > 0) {
        const decodedShankData = ixSerializer.serializer?.deserialize(dataBuffer);

        if (decodedShankData && decodedShankData[0]) {
          // Will only work for numbered discriminant for now
          // Means no anchor support
          if (mapTypes) {
            const dataKeys = Object.keys(decodedShankData[0]);
            const mappedDataType: Record<string, DataWithMappedType> = {};
            dataKeys.forEach((keyName) => {
              if (keyName === "memo") {
                mappedDataType[keyName] = {
                  type: "string" as IdlType,
                  data: decodedShankData[0][keyName],
                };
              }

              decodedShankData[0] = mappedDataType;
            });
          }

          if (accountKeys && accountKeys.length > 0) {
            return {
              name: ixSerializer.instructionName,
              data: {
                ...convertBNToNumberInObject(decodedShankData[0]),
                ...(mapTypes
                  ? {
                      signers: {
                        data: accountKeys[0],
                        type: "publicKey",
                      },
                    }
                  : { signers: accountKeys[0] }),
              },
              type: ParserType.INSTRUCTION,
            };
          }

          return {
            name: ixSerializer.instructionName,
            data: convertBNToNumberInObject(decodedShankData[0]),
            type: ParserType.INSTRUCTION,
          };
        }
      }

      return null;
    } catch (error) {
      throw new Error(`Error parsing instruction data - ${instructionData}`, {
        cause: {
          decoderError: error,
          programId: idlItem.programId,
        },
      });
    }
  };

  const getProgramName = (): string => {
    return "Memo Program";
  };

  return {
    instructionsLayout,
    parseInstructions,
    getProgramName,
  };
};
