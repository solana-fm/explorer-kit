import { BorshInstructionCoder,Idl as AnchorIdl } from "@coral-xyz/anchor";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { mapAccountKeysToName, mapDataTypeToName } from "../../../helpers/idl";
import { InstructionParserInterface } from "../../../interfaces";
import { IdlItem } from "../../../types/IdlItem";
import { ParserOutput, ParserType } from "../../../types/Parsers";

export const createAnchorInstructionParser: (idlItem: IdlItem) => InstructionParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as AnchorIdl;
  const instructionsLayout = new BorshInstructionCoder(idl);

  const parseInstructions = (instructionData: string, accountKeys?: string[], mapTypes?: boolean): ParserOutput => {
    try {
      if (instructionsLayout) {
        const decodedAnchorData = instructionsLayout.decode(instructionData, "base58");
        if (decodedAnchorData) {
          const filteredIdlInstruction = idl.instructions.filter(
            (instruction) => instruction.name === decodedAnchorData.name
          );

          if (mapTypes) {
            decodedAnchorData.data = mapDataTypeToName(decodedAnchorData.data, filteredIdlInstruction[0]?.args);
          }

          if (filteredIdlInstruction.length > 0) {
            const instructionAccounts = filteredIdlInstruction[0]?.accounts;
            const mappedAccountKeys = mapAccountKeysToName(accountKeys, instructionAccounts, mapTypes);

            return {
              name: decodedAnchorData.name,
              data: { ...convertBNToNumberInObject(decodedAnchorData.data), ...mappedAccountKeys },
              type: ParserType.INSTRUCTION,
            };
          }

          return {
            name: decodedAnchorData.name,
            data: convertBNToNumberInObject(decodedAnchorData.data),
            type: ParserType.INSTRUCTION,
          };
        }

        return null;
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
