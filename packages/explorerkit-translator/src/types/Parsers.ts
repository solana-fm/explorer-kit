import { AccountParserInterface, InstructionParserInterface, EventParserInterface } from "..";
import { ErrorParserInterface } from "../interfaces/ErrorParserInterface";

export enum ParserType {
  ACCOUNT = "account",
  INSTRUCTION = "instruction",
  EVENT = "event",
  ERROR = "error",
}

export type Parser =
  | AccountParserInterface
  | InstructionParserInterface
  | EventParserInterface
  | ErrorParserInterface
  | null;

export type ParserOutput = {
  name: string;
  data: any;
  type: ParserType;
} | null;

/**
 * Checks if the given parser is an InstructionParserInterface.
 * @param {Parser} parser - The parser to check.
 * @returns {boolean} - True if the parser is an InstructionParserInterface, false otherwise.
 */
export const checkIfInstructionParser = (parser: Parser): parser is InstructionParserInterface => {
  return parser ? "instructionsLayout" in parser && parser.instructionsLayout !== undefined : false;
};

/**
 * Checks if the given parser is an EventParserInterface.
 * @param {Parser} parser - The parser to check.
 * @returns {boolean} - True if the parser is an EventParserInterface, false otherwise.
 */
export const checkIfEventParser = (parser: Parser): parser is EventParserInterface => {
  return parser ? "eventsLayout" in parser && parser.eventsLayout !== undefined : false;
};

/**
 * Checks if the given parser is an ErrorParserInterface.
 * @param {Parser} parser - The parser to check.
 * @returns {boolean} - True if the parser is an ErrorParserInterface, false otherwise.
 */
export const checkIfErrorsParser = (parser: Parser): parser is ErrorParserInterface => {
  return parser ? "errorsLayout" in parser && parser.errorsLayout !== undefined : false;
};

/**
 * Checks if the given parser is an AccountParserInterface.
 * @param {Parser} parser - The parser to check.
 * @returns {boolean} - True if the parser is an AccountParserInterface, false otherwise.
 */
export const checkIfAccountParser = (parser: Parser): parser is AccountParserInterface => {
  return parser ? "accountLayouts" in parser && parser.accountLayouts !== undefined : false;
};
