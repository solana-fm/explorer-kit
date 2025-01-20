import { base58 } from "@metaplex-foundation/umi";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { mapAccountKeysToName, mapDataTypeToName } from "../../../helpers/idl";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { PhoenixIDL } from "../../../idls/phoenix";
import { InstructionParserInterface } from "../../../interfaces";
import { IdlItem } from "../../../types/IdlItem";
import { KinobiTreeGeneratorType } from "../../../types/KinobiTreeGenerator";
import { ParserOutput, ParserType } from "../../../types/Parsers";

export const createShankIxPhoenix: (idlItem: IdlItem) => InstructionParserInterface = (idlItem: IdlItem) => {
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
  ).constructLayout(KinobiTreeGeneratorType.INSTRUCTIONS);

  const parseInstructions = (instructionData: string, accountKeys?: string[], mapTypes?: boolean): ParserOutput => {
    try {
      const dataBuffer = base58.serialize(instructionData);
      const ixDiscriminant = Buffer.from(dataBuffer).readUint8(0);
      const ixSerializer = instructionsLayout.get(ixDiscriminant);
      if (ixSerializer && dataBuffer.byteLength > 0) {
        const decodedShankData = ixSerializer.serializer?.deserialize(dataBuffer);

        if (decodedShankData && decodedShankData[0]) {
          // TODO: Fix portion where we will read the instructions from the Kinobi Tree instead of the IDL
          const filteredIdlInstruction = PhoenixIDL.instructions?.filter(
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
            const mappedAccountKeys = mapAccountKeysToName(accountKeys, instructionAccounts, mapTypes);

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
    return "Phoenix Program";
  };

  return {
    instructionsLayout,
    parseInstructions,
    getProgramName,
  };
};
