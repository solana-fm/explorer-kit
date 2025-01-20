import { base58 } from "@metaplex-foundation/umi-serializers";
import { Idl as ShankIdl } from "@solanafm/kinobi-lite";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { mapDataTypeToName } from "../../../helpers/idl";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { InstructionParserInterface } from "../../../interfaces";
import { IdlItem } from "../../../types/IdlItem";
import { ParserOutput, ParserType } from "../../../types/Parsers";

export const createNoopIx: (idlItem: IdlItem) => InstructionParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as ShankIdl;
  const instructionsLayout = new KinobiTreeGenerator(idl).constructLayout();

  const parseInstructions = (instructionData: string, _?: string[], mapTypes?: boolean): ParserOutput => {
    try {
      const dataBuffer = base58.serialize(instructionData);
      const ixSerializer = instructionsLayout.get(0);

      if (ixSerializer && dataBuffer.byteLength > 0) {
        const decodedShankData = ixSerializer.serializer?.deserialize(dataBuffer);
        if (decodedShankData && decodedShankData[0]) {
          // Will only work for numbered discriminant for now
          // Means no anchor support
          const filteredIdlInstruction = idl.instructions[0];

          if (mapTypes) {
            decodedShankData[0] = mapDataTypeToName(decodedShankData[0], filteredIdlInstruction?.args);
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
    return idl.name;
  };

  return {
    instructionsLayout,
    parseInstructions,
    getProgramName,
  };
};
