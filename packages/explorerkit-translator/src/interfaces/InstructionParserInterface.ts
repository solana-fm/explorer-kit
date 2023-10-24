import { BorshInstructionCoder } from "@coral-xyz/anchor";

import {
  createAnchorInstructionParser,
  createShankInstructionParser,
  createShankIxConfig,
  createShankIxMemo,
} from "../parsers/v2/instruction";
import { createShankIxATA } from "../parsers/v2/instruction/ata";
import { createShankIxPhoenix } from "../parsers/v2/instruction/phoenix";
import { createTokenV2Ix } from "../parsers/v2/instruction/token-v2";
import { FMShankSerializer } from "../types/KinobiTreeGenerator";
import { ParserOutput } from "../types/Parsers";
import { IdlItem } from "../types/IdlItem";
import { createNoopIx } from "../parsers/v2/instruction/noop";

export type InstructionParsers = BorshInstructionCoder | Map<number | string, FMShankSerializer>;

export interface InstructionParserInterface {
  instructionsLayout: InstructionParsers;
  parseInstructions(instructionData: string, accountKeys?: string[], mapTypes?: boolean): ParserOutput;
  getProgramName(): string;
}

export const createInstructionParser = (idlItem: IdlItem, programHash: string) => {
  switch (idlItem.idlType) {
    case "anchor":
      return createAnchorInstructionParser(idlItem);

    case "shank":
      switch (programHash) {
        case "Config1111111111111111111111111111111111111":
          return createShankIxConfig(idlItem);

        case "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL":
          return createShankIxATA(idlItem);

        case "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb":
          return createTokenV2Ix(idlItem);

        case "noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV":
          return createNoopIx(idlItem);
      }

      return createShankInstructionParser(idlItem);

    case "kinobi":
      switch (programHash) {
        case "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr":
          return createShankIxMemo(idlItem);

        case "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo":
          return createShankIxMemo(idlItem);

        case "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY":
          return createShankIxPhoenix(idlItem);

        default:
          return null;
      }

    default:
      return null;
  }
};
