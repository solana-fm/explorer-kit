import { BorshInstructionCoder } from "@coral-xyz/anchor";
import { BorshInstructionCoder as NewBorshInstructionCoder } from "@coral-xyz/anchor-new";

import {
  createAnchorInstructionParser,
  createAnchorV1InstructionParser,
  createShankInstructionParser,
  createShankIxConfig,
  createShankIxMemo,
} from "../parsers/v2/instruction";
import { createShankIxATA } from "../parsers/v2/instruction/ata";
import { createNoopIx } from "../parsers/v2/instruction/noop";
import { createShankIxPhoenix } from "../parsers/v2/instruction/phoenix";
import { createTokenV2Ix } from "../parsers/v2/instruction/token-v2";
import { IdlItem } from "../types/IdlItem";
import { FMShankSerializer } from "../types/KinobiTreeGenerator";
import { ParserOutput } from "../types/Parsers";

export type InstructionParsers =
  | BorshInstructionCoder
  | NewBorshInstructionCoder
  | Map<number | string, FMShankSerializer>;

export interface InstructionParserInterface {
  instructionsLayout: InstructionParsers;
  parseInstructions(instructionData: string, accountKeys?: string[], mapTypes?: boolean): ParserOutput;
  getProgramName(): string;
}

export const createInstructionParser = (idlItem: IdlItem, programHash: string) => {
  switch (idlItem.idlType) {
    case "anchor":
      return createAnchorInstructionParser(idlItem);

    case "anchorV1":
      return createAnchorV1InstructionParser(idlItem);

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
