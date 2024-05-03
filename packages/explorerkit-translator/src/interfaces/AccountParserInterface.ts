import { BorshAccountsCoder } from "@coral-xyz/anchor";
import { BorshAccountsCoder as NewBorshAccountsCoder } from "@coral-xyz/anchor-new";

import {
  createAnchorAccountParser,
  createAnchorV1AccountParser,
  createShankAccountParser,
  createShankConfigAccount,
  createShankNameServiceAccount,
  createShankPhoenixAccount,
  createShankTokenAccount,
} from "../parsers/v2/account";
import { createShankMetaplexAccountParser } from "../parsers/v2/account/metadata";
import { createShankTokenV2Account } from "../parsers/v2/account/token-v2";
import { AccParserSerializationType } from "../types/BaseAccountTypes";
import { IdlItem } from "../types/IdlItem";
import { FMShankSerializer } from "../types/KinobiTreeGenerator";
import { ParserOutput } from "../types/Parsers";

export type AccountParsers = BorshAccountsCoder | NewBorshAccountsCoder | Map<number | string, FMShankSerializer>;

export interface AccountParserInterface {
  accountLayouts: AccountParsers;
  parseAccount(accountData: string, mapTypes?: boolean): ParserOutput;
  getProgramName(): string;
}

export const createAccountParser = (idlItem: IdlItem, programHash: string, accountHash?: string) => {
  switch (idlItem.idlType) {
    case "anchor":
      return createAnchorAccountParser(idlItem);

    case "anchorV1":
      return createAnchorV1AccountParser(idlItem);

    case "shank":
      const localSysvars = [
        "SysvarC1ock11111111111111111111111111111111",
        "SysvarEpochSchedu1e111111111111111111111111",
        "SysvarFees111111111111111111111111111111111",
        "SysvarRecentB1ockHashes11111111111111111111",
        "SysvarRent111111111111111111111111111111111",
        "SysvarRewards111111111111111111111111111111",
        "SysvarS1otHashes111111111111111111111111111",
        "SysvarStakeHistory1111111111111111111111111",
      ];

      const localBincode = [
        "Vote111111111111111111111111111111111111111",
        "Stake11111111111111111111111111111111111111",
        "BPFLoaderUpgradeab1e11111111111111111111111",
        "AddressLookupTab1e1111111111111111111111111",
      ];

      const localBorsh = [
        "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
        "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy",
        "namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX",
      ];

      // Custom parsers for specific program hashes
      switch (programHash) {
        case "Config1111111111111111111111111111111111111":
          return createShankConfigAccount(idlItem, accountHash ?? "");

        case "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA":
          return createShankTokenAccount(idlItem);

        case "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb":
          return createShankTokenV2Account(idlItem);

        case "namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX":
          return createShankNameServiceAccount(idlItem);

        case "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s":
          return createShankMetaplexAccountParser(idlItem);
      }

      if (accountHash && localSysvars.includes(accountHash)) {
        return createShankAccountParser(idlItem, AccParserSerializationType.SYSVAR);
      } else if (localBincode.includes(programHash)) {
        return createShankAccountParser(idlItem, AccParserSerializationType.BINCODE);
      } else if (localBorsh.includes(programHash)) {
        return createShankAccountParser(idlItem, AccParserSerializationType.BORSH);
      }

      return createShankAccountParser(idlItem);

    case "kinobi":
      // Most of the kinobi serializers are custom made so we will just do switch case for nwo
      switch (programHash) {
        case "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY":
          return createShankPhoenixAccount(idlItem);

        default:
          return null;
      }

    default:
      return null;
  }
};
