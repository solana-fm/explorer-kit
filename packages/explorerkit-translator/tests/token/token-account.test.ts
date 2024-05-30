import { getProgramIdl } from "@solanafm/explorer-kit-idls";
import { beforeAll, describe, expect, it } from "vitest";

import { AccountParserInterface, checkIfAccountParser, ParserType, SolanaFMParser } from "../../src";

// To store the parser for the test cases to use
let token2022Parser: AccountParserInterface | null = null;
let tokenParser: AccountParserInterface | null = null;

beforeAll(async () => {
  const programId = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
  const tokenV1ProgramID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

  const idlItem = await getProgramIdl(programId);
  const tokenIdlItem = await getProgramIdl(tokenV1ProgramID);

  if (idlItem && tokenIdlItem) {
    const tokenV2Parser = new SolanaFMParser(idlItem, programId).createParser(ParserType.ACCOUNT);
    const tokenV1Parser = new SolanaFMParser(tokenIdlItem, tokenV1ProgramID).createParser(ParserType.ACCOUNT);
    if (tokenV2Parser && checkIfAccountParser(tokenV2Parser) && tokenV1Parser && checkIfAccountParser(tokenV1Parser)) {
      tokenParser = tokenV1Parser;
      token2022Parser = tokenV2Parser;
    }
  }
});

describe("parse a token-2022 mint account without extensions", () => {
  it("should be able to parse a mint account without extensions", () => {
    if (token2022Parser) {
      const accountData =
        "AQAAAFqwGSI62UWLPgxv2pSz9SlPqFaagM8EpcHR9Baz1ZsDAAAAAAAAAAAJAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
      const parsedAccountData = token2022Parser.parseAccount(accountData);
      expect(parsedAccountData?.name).toBe("mintAccount");
      expect(parsedAccountData?.data.decimals).toBe(9);
      expect(parsedAccountData?.data.extensions).toBeUndefined();
      expect(parsedAccountData?.data.accountType).toBeUndefined();
    }
  });
});

describe("parse token-2022 mint account with more than 1 extensions", () => {
  it("should be able to parse a mint account with more than 1 extensions and has 5 extensions", () => {
    if (token2022Parser) {
      const accountData =
        "AQAAAFqwGSI62UWLPgxv2pSz9SlPqFaagM8EpcHR9Baz1ZsDAAAAAAAAAAACAQEAAABasBkiOtlFiz4Mb9qUs/UpT6hWmoDPBKXB0fQWs9WbAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQwAIABasBkiOtlFiz4Mb9qUs/UpT6hWmoDPBKXB0fQWs9WbAwoANABasBkiOtlFiz4Mb9qUs/UpT6hWmoDPBKXB0fQWs9WbA9+Rv2QAAAAAMgDfkb9kAAAAADIACQAAAAYAAQACAQBsAFqwGSI62UWLPgxv2pSz9SlPqFaagM8EpcHR9Baz1ZsDWrAZIjrZRYs+DG/alLP1KU+oVpqAzwSlwdH0FrPVmwMAAAAAAAAAABkCAAAAAAAAgJaYAAAAAAAKABkCAAAAAAAAgJaYAAAAAAAKAA==";
      const parsedAccountData = token2022Parser.parseAccount(accountData);
      expect(parsedAccountData?.name).toBe("mintAccount");
      expect(parsedAccountData?.data.decimals).toBe(2);
      expect(parsedAccountData?.data.extensions).toHaveLength(5);
      expect(parsedAccountData?.data.extensions[0].enumType).toBe("permanentDelegate");
      expect(parsedAccountData?.data.extensions[1].enumType).toBe("interestBearingConfig");
      expect(parsedAccountData?.data.extensions[2].enumType).toBe("nonTransferable");
      expect(parsedAccountData?.data.extensions[3].enumType).toBe("defaultAccountState");
      expect(parsedAccountData?.data.extensions[4].enumType).toBe("transferFeeConfig");
      expect(parsedAccountData?.data.accountType.enumType).toBe("mint");
    }
  });

  it("should be able to parse a mint account with more than 1 extensions and has 2 extensions", () => {
    if (token2022Parser) {
      const accountData =
        "AQAAAFqwGSI62UWLPgxv2pSz9SlPqFaagM8EpcHR9Baz1ZsDAAAAAAAAAAACAQEAAABasBkiOtlFiz4Mb9qUs/UpT6hWmoDPBKXB0fQWs9WbAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQYAAQACAQBsAFqwGSI62UWLPgxv2pSz9SlPqFaagM8EpcHR9Baz1ZsDWrAZIjrZRYs+DG/alLP1KU+oVpqAzwSlwdH0FrPVmwMAAAAAAAAAABkCAAAAAAAAQEIPAAAAAAAKABkCAAAAAAAAQEIPAAAAAAAKAA==";
      const parsedAccountData = token2022Parser.parseAccount(accountData);
      expect(parsedAccountData?.name).toBe("mintAccount");
      expect(parsedAccountData?.data.decimals).toBe(2);
      expect(parsedAccountData?.data.extensions).toHaveLength(2);
      expect(parsedAccountData?.data.extensions[0].enumType).toBe("defaultAccountState");
      expect(parsedAccountData?.data.extensions[1].enumType).toBe("transferFeeConfig");
      expect(parsedAccountData?.data.accountType.enumType).toBe("mint");
    }
  });

  it("should be able to parse a mint account with more than 1 extensions and has 8 extensions", () => {
    if (token2022Parser) {
      const accountData =
        "AQAAAEWL8jQUbMmHNpVOADdvZA1z7a1jyDebZa3bW4Jv0uMVYHGwOIwEAAAGAQEAAAAXhTJh72q4Uypn8FOGWq0xKT/PB88SCrW5oVcGVI3AKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQMAIAAXhTJh72q4Uypn8FOGWq0xKT/PB88SCrW5oVcGVI3AKwwAIAAXhTJh72q4Uypn8FOGWq0xKT/PB88SCrW5oVcGVI3AKwEAbAAXhTJh72q4Uypn8FOGWq0xKT/PB88SCrW5oVcGVI3AKxeFMmHvarhTKmfwU4ZarTEpP88HzxIKtbmhVwZUjcArAAAAAAAAAABdAgAAAAAAAAAAAAAAAAAAAABdAgAAAAAAAAAAAAAAAAAAAAAEAEEAF4UyYe9quFMqZ/BThlqtMSk/zwfPEgq1uaFXBlSNwCsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAIEAF4UyYe9quFMqZ/BThlqtMSk/zwfPEgq1uaFXBlSNwCscN+ZDO3ME3YJzeuQNm4vzxJ9bDmxJqNUzKLPlBpAcVwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgBAABeFMmHvarhTKmfwU4ZarTEpP88HzxIKtbmhVwZUjcArAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAEAAgnQVMyO1m+9u94xUbiBsQYh7lCdtZO+gj0jz14I76NgXkkg7bIoqh7dHHYFPlZH5OVyECpzj2fTVun06S4p0nhMArgCCdBUzI7Wb7273jFRuIGxBiHuUJ21k76CPSPPXgjvo2BeSSDtsiiqHt0cdgU+Vkfk5XIQKnOPZ9NW6fTpLinSeCgAAAFBheVBhbCBVU0QFAAAAUFlVU0RPAAAAaHR0cHM6Ly90b2tlbi1tZXRhZGF0YS5wYXhvcy5jb20vcHl1c2RfbWV0YWRhdGEvcHJvZC9zb2xhbmEvcHl1c2RfbWV0YWRhdGEuanNvbgAAAAA=";
      const parsedAccountData = token2022Parser.parseAccount(accountData);
      expect(parsedAccountData?.name).toBe("mintAccount");
      expect(parsedAccountData?.data.decimals).toBe(6);
      expect(parsedAccountData?.data.extensions).toHaveLength(8);
      expect(parsedAccountData?.data.extensions[0].enumType).toBe("mintCloseAuthority");
      expect(parsedAccountData?.data.extensions[1].enumType).toBe("permanentDelegate");
      expect(parsedAccountData?.data.extensions[2].enumType).toBe("transferFeeConfig");
      expect(parsedAccountData?.data.extensions[3].enumType).toBe("confidentialTransferMint");
      expect(parsedAccountData?.data.extensions[4].enumType).toBe("confidentialTransferFeeConfig");
      expect(parsedAccountData?.data.extensions[5].enumType).toBe("transferHook");
      expect(parsedAccountData?.data.extensions[6].enumType).toBe("metadataPointer");
      expect(parsedAccountData?.data.extensions[7].enumType).toBe("tokenMetadata");
      expect(parsedAccountData?.data.accountType.enumType).toBe("mint");
    }
  });
});

describe("parse a basic token-2022 token account with immutable extension", () => {
  it("should be able to parse a token account with immutable owner extension", () => {
    if (token2022Parser) {
      const accountData =
        "eg1iPl8zSx7I8G0RVVRKQFTwC6NJ/0KMxqM0Nylr8hZasBkiOtlFiz4Mb9qUs/UpT6hWmoDPBKXB0fQWs9WbAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgcAAAA=";
      const parsedAccountData = token2022Parser.parseAccount(accountData);
      expect(parsedAccountData?.name).toBe("tokenAccount");
      expect(parsedAccountData?.data.amount).toBe("0");
      expect(parsedAccountData?.data.extensions).toHaveLength(1);
      expect(parsedAccountData?.data.extensions[0].enumType).toBe("immutableOwner");
      expect(parsedAccountData?.data.accountType.enumType).toBe("account");
    }
  });
});

describe("parse a basic token-2022 token account with immutable extension and nonTransferableAccount", () => {
  it("should be able to parse a token account with immutable extension and nonTransferableAccount", () => {
    if (token2022Parser) {
      const accountData =
        "iw8iidPvYupoegVLiIEk8sGPU7B5RY0+TI+IjT9QsjFasBkiOtlFiz4Mb9qUs/UpT6hWmoDPBKXB0fQWs9WbAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgcAAAANAAAA";
      const parsedAccountData = token2022Parser.parseAccount(accountData);
      expect(parsedAccountData?.name).toBe("tokenAccount");
      expect(parsedAccountData?.data.amount).toBe("0");
      expect(parsedAccountData?.data.extensions).toHaveLength(2);
      expect(parsedAccountData?.data.extensions[0].enumType).toBe("immutableOwner");
      expect(parsedAccountData?.data.extensions[1].enumType).toBe("nonTransferableAccount");
      expect(parsedAccountData?.data.accountType.enumType).toBe("account");
    }
  });
});

describe("parse a token-2022 multisig account without extensions", () => {
  it("should be able to parse a multisig account without extensions", () => {
    if (token2022Parser) {
      const accountData =
        "AQIB9kzhcdy9PBu/O/tTQp9XO00Q5D59cmdrSnuPjJCBwkjP4WTu4IibrSYuliguQAe+RC+B57eIXPW2LURX48gnDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
      const parsedAccountData = token2022Parser.parseAccount(accountData);
      expect(parsedAccountData?.name).toBe("multisigAccount");
      expect(parsedAccountData?.data.numOfSignersRequired).toBe(1);
      expect(parsedAccountData?.data.numOfValidSignersRequired).toBe(2);
      expect(parsedAccountData?.data.signers).toHaveLength(2);
      expect(parsedAccountData?.data.extensions).toBeUndefined();
      expect(parsedAccountData?.data.accountType).toBeUndefined();
    }
  });
});

describe("parse a token mint account", () => {
  it("should be able to parse a mint account", () => {
    if (tokenParser) {
      const accountData =
        "AQAAABzjWe1aAS4E+hQrnHUaHF6Hz9CgFhuchf/TG3jN/Nj288rIHEHjEQAGAQEAAAAqnl7btTwEZ5CY/3sSZRcUQ0/AjFYqmjuGEQXmctQicw==";
      const parsedAccountData = tokenParser.parseAccount(accountData);
      expect(parsedAccountData?.name).toBe("mintAccount");
      expect(parsedAccountData?.data.decimals).toBe(6);
      expect(parsedAccountData?.data.extensions).toBeUndefined();
      expect(parsedAccountData?.data.accountType).toBeUndefined();
    }
  });
});

describe("parse a token account", () => {
  it("should be able to parse a token account", () => {
    if (tokenParser) {
      const accountData =
        "xvp6877brTo9ZfNqq8l0MbG75MLS9uDkfKYCA0UvXWFl7w4ChvLlydQsW3oWOArbQcSjDdeq05bIjqWtJnsXrsW8Wp0cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      const parsedAccountData = tokenParser.parseAccount(accountData);
      expect(parsedAccountData?.name).toBe("tokenAccount");
      expect(parsedAccountData?.data.amount).toBe("122899053765");
      expect(parsedAccountData?.data.extensions).toBeUndefined();
      expect(parsedAccountData?.data.accountType).toBeUndefined();
    }
  });
});

describe("parse a multisig account", () => {
  it("should be able to parse a multisig account", () => {
    if (tokenParser) {
      const accountData =
        "AQIB9kzhcdy9PBu/O/tTQp9XO00Q5D59cmdrSnuPjJCBwkjP4WTu4IibrSYuliguQAe+RC+B57eIXPW2LURX48gnDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
      const parsedAccountData = tokenParser.parseAccount(accountData);
      expect(parsedAccountData?.name).toBe("multisigAccount");
      expect(parsedAccountData?.data.numOfSignersRequired).toBe(1);
      expect(parsedAccountData?.data.numOfValidSignersRequired).toBe(2);
      expect(parsedAccountData?.data.signers).toHaveLength(2);
      expect(parsedAccountData?.data.extensions).toBeUndefined();
      expect(parsedAccountData?.data.accountType).toBeUndefined();
    }
  });
});
