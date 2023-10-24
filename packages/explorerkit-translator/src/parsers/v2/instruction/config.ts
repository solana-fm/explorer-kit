import { base58 } from "@metaplex-foundation/umi";
import { Idl as ShankIdl, IdlInstruction } from "@solanafm/kinobi-lite";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { mapAccountKeysToName, mapDataTypeToName } from "../../../helpers/idl";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { InstructionParserInterface } from "../../../interfaces";
import { IdlItem } from "../../../types/IdlItem";
import { ParserOutput, ParserType } from "../../../types/Parsers";

export const createShankIxConfig: (idlItem: IdlItem) => InstructionParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as ShankIdl;
  const instructionsLayout = new KinobiTreeGenerator(idl).constructLayout();

  const parseInstructions = (instructionData: string, accountKeys?: string[], mapTypes?: boolean): ParserOutput => {
    try {
      const dataBuffer = base58.serialize(instructionData);
      const filteredIdlInstruction: IdlInstruction[] = [];
      let ixSerializer;

      if (dataBuffer.byteLength <= 9) {
        ixSerializer = instructionsLayout.get(0);
        if (idl.instructions[0]) {
          filteredIdlInstruction.push(idl.instructions[0]);
        }
      } else if (dataBuffer.byteLength > 9) {
        ixSerializer = instructionsLayout.get(1);
        if (idl.instructions[1]) {
          filteredIdlInstruction.push(idl.instructions[1]);
        }
      }

      if (ixSerializer && dataBuffer.byteLength > 0) {
        const decodedShankData = ixSerializer.serializer?.deserialize(dataBuffer);

        if (decodedShankData && decodedShankData[0]) {
          // Will only work for numbered discriminant for now
          // Means no anchor support
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
