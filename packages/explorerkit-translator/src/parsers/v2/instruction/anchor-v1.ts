import { BorshInstructionCoder, Idl as AnchorIdl } from "@coral-xyz/anchor-new";
import { convertBNToNumberInObject, decodeBase58 } from "@solanafm/utils";

import { mapNewAnchorDataTypeToName } from "../../../helpers/idl";
import { mapNewAnchorAccountKeysToName } from "../../../helpers/new-idl";
import { InstructionParserInterface } from "../../../interfaces";
import { IdlItem } from "../../../types/IdlItem";
import { ParserOutput, ParserType } from "../../../types/Parsers";

export const createAnchorV1InstructionParser: (idlItem: IdlItem) => InstructionParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as AnchorIdl;
  const instructionsLayout = new BorshInstructionCoder(idl);

  const parseInstructions = (instructionData: string, accountKeys?: string[], mapTypes?: boolean): ParserOutput => {
    try {
      if (instructionsLayout) {
        // Checks for Anchor Self-CPI event discriminators
        // This is the event discriminator for Anchor Self-CPI to check with
        // Buffer.from(sha256("anchor:event").slice(0, 8)).reverse();
        // It's a sha-256 hash of the string "anchor:event" and then the first 8 bytes reversed (little endian)
        const ixBuffer = decodeBase58(instructionData);
        const ixDisc = Buffer.from(ixBuffer.subarray(0, 8));
        const eventDisc = Buffer.from("5EWlLlHLmh0=", "base64");

        // We won't decode the instruction if it's an Anchor Self-CPI event but handles it at the EventParser level
        if (ixDisc.equals(eventDisc)) {
          return {
            name: "Anchor Self-CPI Log",
            // Checks if there's an account keys array that's being supplied, if not return an empty data since there's no account keys that's being mapped
            data: accountKeys
              ? {
                  logAuthority: {
                    data: accountKeys[0],
                    type: "publicKey",
                  },
                }
              : null,
            type: ParserType.INSTRUCTION,
          };
        }

        const decodedAnchorData = instructionsLayout.decode(instructionData, "base58");
        if (decodedAnchorData) {
          const filteredIdlInstruction = idl.instructions.filter(
            (instruction) => instruction.name === decodedAnchorData.name
          );

          if (mapTypes) {
            decodedAnchorData.data = mapNewAnchorDataTypeToName(
              decodedAnchorData.data,
              filteredIdlInstruction[0]?.args
            );
          }

          if (filteredIdlInstruction.length > 0) {
            const instructionAccounts = filteredIdlInstruction[0]?.accounts;
            const mappedAccountKeys = mapNewAnchorAccountKeysToName(accountKeys, instructionAccounts, mapTypes);

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
    return idl.metadata.name;
  };

  return {
    instructionsLayout,
    parseInstructions,
    getProgramName,
  };
};
