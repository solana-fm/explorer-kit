import { createAccountParser, createErrorParser, createEventParser, createInstructionParser } from "./interfaces";
import { IdlItem } from "./types/IdlItem";
import { Parser, ParserType } from "./types/Parsers";

/**
 * Represents a SolanaFM Client to parse data in the Solana Blockchain.
 * @example
 * ```typescript
 * // Creates the client so that it can be used to create parsers
 * const parser = new SolanaFMParser(idl, programHash, accountHash)
 * // To create an account parser
 * const accountParser = parser.createParser(ParserType.ACCOUNT);
 * // To create an error parser
 * const errorParser = parser.createParser(ParserType.ERROR);
 * // To create an event parser
 * const eventParser = parser.createParser(ParserType.EVENT);
 * // To create an instruction parser
 * const instructionParser = parser.createParser(ParserType.INSTRUCTION);
 * ```
 */
export class SolanaFMParser {
  /**
   * The IDL item.
   */
  private readonly idlItem: IdlItem;

  /**
   * The program hash.
   * @remarks For account parsing, this is also known as the owner of the account
   */
  private readonly programHash: string;

  /**
   * The account hash.
   * @remarks This is optional because not all parsers require an account hash and it's only usable for parsing accounts such as sysvar accounts
   */
  private readonly accountHash?: string;

  /**
   * Creates a new instance of the FMClient class.
   * @param idl The IDL that's to be used for initalizing the client.
   * @param programHash The program hash.
   * @param accountHash The account hash.
   */
  constructor(idl: IdlItem, programHash: string, accountHash?: string) {
    this.idlItem = idl;
    this.programHash = programHash;
    this.accountHash = accountHash;
  }

  /**
   * Creates a parser based on the specified parser type.
   * @param parserType The parser type.
   * @returns A parser instance.
   */
  public createParser(parserType: ParserType): Parser {
    switch (parserType) {
      case ParserType.ACCOUNT:
        return createAccountParser(this.idlItem, this.programHash, this.accountHash);

      case ParserType.INSTRUCTION:
        return createInstructionParser(this.idlItem, this.programHash);

      case ParserType.EVENT:
        return createEventParser(this.idlItem, this.programHash);

      case ParserType.ERROR:
        return createErrorParser(this.idlItem);

      default:
        return null;
    }
  }

  /**
   * Gets the program hash.
   * @returns The program hash.
   */
  public getProgramHash(): string {
    return this.programHash;
  }
}
