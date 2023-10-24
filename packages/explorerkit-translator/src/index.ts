export type { DataWithMappedType } from "./helpers/idl";
export { isDataWithMappedType } from "./helpers/idl";
export type {
  AccountParserInterface,
  ErrorParserInterface,
  EventParserInterface,
  InstructionParserInterface,
} from "./interfaces";
export { SolanaFMParser } from "./SolanaFMParser";
export type { Parser, ParserOutput } from "./types/Parsers";
export {
  checkIfAccountParser,
  checkIfErrorsParser,
  checkIfEventParser,
  checkIfInstructionParser,
  ParserType,
} from "./types/Parsers";
export type { Event } from "@coral-xyz/anchor";
// export { Event } from "@coral-xyz/anchor";
export * from "./types/AnchorTypes";
export type { IdlError } from "@solanafm/kinobi-lite";
