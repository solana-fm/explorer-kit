import { createAnchorErrorParser, createShankErrorParser } from "../parsers/v2/error";
import { IdlItem } from "../types/IdlItem";
import { ParserOutput } from "../types/Parsers";

export type ErrorParsers = Map<
  number,
  {
    name: string;
    msg: string;
  }
>;

export interface ErrorParserInterface {
  errorsLayout: ErrorParsers;
  parseError(errorCode: string): ParserOutput;
}

export const createErrorParser = (idlItem: IdlItem) => {
  switch (idlItem.idlType) {
    case "anchor":
      return createAnchorErrorParser(idlItem);
    case "shank":
      return createShankErrorParser(idlItem);
    default:
      return null;
  }
};
