import { convertBNToNumberInObject } from "@solanafm/utils";
import { Idl as ShankIdl } from "@solanafm/kinobi-lite";
import { base58 } from "@metaplex-foundation/umi";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { mapAccountKeysToName, mapDataTypeToName } from "../../../helpers/idl";
import { IdlItem } from "../../../types/IdlItem";
import { InstructionParserInterface } from "../../../interfaces";
import { ParserOutput, ParserType } from "../../../types/Parsers";

export const createShankInstructionParser: (idlItem: IdlItem) => InstructionParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as ShankIdl;
  const instructionsLayout = new KinobiTreeGenerator(idl).constructLayout();

  const parseInstructions = (instructionData: string, accountKeys?: string[], mapTypes?: boolean): ParserOutput => {
    try {
      const dataBuffer = base58.serialize(instructionData);
      const ixDiscriminant = Buffer.from(dataBuffer).readUint8(0);
      const ixSerializer = instructionsLayout.get(ixDiscriminant);

      if (ixSerializer && dataBuffer.byteLength > 0) {
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
      console.error(error);
      return null;
    }
  };

  const getProgramName = (): string => {
    return idl.name;
  };

  return {
    instructionsLayout,
    parseInstructions,
    getProgramName,
  };
};
