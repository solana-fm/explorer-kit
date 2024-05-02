import { getProgramIdl } from "@solanafm/explorer-kit-idls";
import { describe, expect, it } from "vitest";

import { checkIfAccountParser, ParserType, SolanaFMParser } from "../../src";

describe("parseAnchorAccount", () => {
  it("should construct an anchor account parser for a given valid IDL", async () => {
    const programId = "Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);

      expect(accountParser).not.toBeNull();
    }
  });

  it("should construct an anchor account parser for a given valid IDL and parses the account data", async () => {
    const programId = "Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB";
    const accountData =
      "8ZptBBGxbbzsGaEn7mahbqIBGSfAmypYf+KbMqPQZKvxp9X/sakBfNq9w5N2MZjqC/QyVjTVFUCCq684fDbZrdfQNKdAdBgPBpuIV/6rgYT7aH9jRhjANdrEOdwa6ztVmKDwAAAAAAHje4hksTV2XCEwDIfG75GqZZgN5xfuTAi0v6Uu1eY1f9N0IXa4nF4UyWt0iZhCHzgQHgnlxZMxsWi2Jc0nFbsmJhWzQ8d0pAyZM1X7Jx3lRhsMWiI8WK6A3PmdE8gIQMNJO2/15W8BDb4dvOujEWbmw3UflYlqIeoBVNrG1JC/nPsBZRC0PV/WmkCFnCrYBPmNOte49yVo/y7e4PH40cNjNjLlMGlmJ5SimJswcBeJ322HlQ2VKP0O5JZXNHKIZ3yXxkj0Weo18CFGxFjKyXY/SxEFclXL7jxORa3uw9uLKhs3+gAAAAAAAACghgEAAAAAADIAAAAAAAAAoIYBAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("Pool");
      }
    }
  });

  it("should construct an anchor account parser for a given valid IDL, parses the account data and map the data that's being returned with the valid idl", async () => {
    const programId = "Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB";
    const accountData =
      "8ZptBBGxbbzsGaEn7mahbqIBGSfAmypYf+KbMqPQZKvxp9X/sakBfNq9w5N2MZjqC/QyVjTVFUCCq684fDbZrdfQNKdAdBgPBpuIV/6rgYT7aH9jRhjANdrEOdwa6ztVmKDwAAAAAAHje4hksTV2XCEwDIfG75GqZZgN5xfuTAi0v6Uu1eY1f9N0IXa4nF4UyWt0iZhCHzgQHgnlxZMxsWi2Jc0nFbsmJhWzQ8d0pAyZM1X7Jx3lRhsMWiI8WK6A3PmdE8gIQMNJO2/15W8BDb4dvOujEWbmw3UflYlqIeoBVNrG1JC/nPsBZRC0PV/WmkCFnCrYBPmNOte49yVo/y7e4PH40cNjNjLlMGlmJ5SimJswcBeJ322HlQ2VKP0O5JZXNHKIZ3yXxkj0Weo18CFGxFjKyXY/SxEFclXL7jxORa3uw9uLKhs3+gAAAAAAAACghgEAAAAAADIAAAAAAAAAoIYBAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData, true);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("Pool");
        expect(decodedData?.data["admin"].type).toBe("publicKey");
      }
    }
  });
});

describe("parseShankBorsh", () => {
  it("should construct an shank account parser for a given valid IDL", async () => {
    const programId = "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);

      expect(accountParser).not.toBeNull();
    }
  });

  it("should construct an shank account parser for a given valid IDL and parses the account data", async () => {
    const programId = "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy";
    const accountData =
      "AWq1iyr99ATwNekhxZcljopQjeBixmWt+p/5CTXBmRbd3Noj1MlCDU6CVh08awajdvCUB/G3tPyo/emrHFdD8Wfh4Pippvxf8kLk81F78B7Wst0ZUaC6ttlDVyWShgT3cP/LqkIDCUdVLBkThURwDuYX1RR+JyWBHNvgnIkDCm914o2jckW1NrCzDbv9Jn/RWcT0cAMYKm8U4SfG/F878wV0XwxEYxirEMlfQJSVhXDNBXRlpU2rFNnd40gahv7V/Mvj/aPav/vdTOwRdFALTRZQlijB9G5myz+0QWe7U7EGIQbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpE2P1ZIWKAQDUAp5GdmQBAMkBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQJwAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECcAAAAAAAAAAAAAAAAAAABWHWK1dGQBAAgnQqFYigEAv0rw1gHIAQAPfXpGLPQBABAnAAAAAAAAAAAAAAAAAAAAicd7jscBANVMdCNW7gEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("stakePool");
      }
    }
  });

  it("should construct an shank account parser for a given valid IDL, parses the account data and map the data that's being returned with the valid idl", async () => {
    const programId = "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy";
    const accountData =
      "AWq1iyr99ATwNekhxZcljopQjeBixmWt+p/5CTXBmRbd3Noj1MlCDU6CVh08awajdvCUB/G3tPyo/emrHFdD8Wfh4Pippvxf8kLk81F78B7Wst0ZUaC6ttlDVyWShgT3cP/LqkIDCUdVLBkThURwDuYX1RR+JyWBHNvgnIkDCm914o2jckW1NrCzDbv9Jn/RWcT0cAMYKm8U4SfG/F878wV0XwxEYxirEMlfQJSVhXDNBXRlpU2rFNnd40gahv7V/Mvj/aPav/vdTOwRdFALTRZQlijB9G5myz+0QWe7U7EGIQbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpE2P1ZIWKAQDUAp5GdmQBAMkBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQJwAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECcAAAAAAAAAAAAAAAAAAABWHWK1dGQBAAgnQqFYigEAv0rw1gHIAQAPfXpGLPQBABAnAAAAAAAAAAAAAAAAAAAAicd7jscBANVMdCNW7gEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData, true);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("stakePool");
        expect(decodedData?.data["manager"].type).toBe("publicKey");
      }
    }
  });
});

describe("parseShankSysvar", () => {
  it("should construct an shank account parser for a given valid IDL for a sysvar hash", async () => {
    const programId = "SysvarC1ock11111111111111111111111111111111";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);

      expect(accountParser).not.toBeNull();
    }
  });

  it("should construct an shank account parser for a given valid IDL and parse an account with a sysvar type serialization", async () => {
    const programId = "SysvarC1ock11111111111111111111111111111111";
    const accountData = "qPTKCwAAAAA5XnpkAAAAAMkBAAAAAAAAygEAAAAAAAC6an1kAAAAAA==";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("sysvarClock");
      }
    }
  });

  it("should construct an shank account parser for a given valid IDL, parse an account with a sysvar type serialization and map the proper types with a valid idl", async () => {
    const programId = "SysvarC1ock11111111111111111111111111111111";
    const accountData = "qPTKCwAAAAA5XnpkAAAAAMkBAAAAAAAAygEAAAAAAAC6an1kAAAAAA==";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData, true);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("sysvarClock");
        expect(decodedData?.data["clock"].type).not.toBeNull();
      }
    }
  });
});

describe("parseShankBincode", () => {
  it("should construct an shank account parser for a given valid IDL with the bincode deserialization strategy", async () => {
    const programId = "BPFLoaderUpgradeab1e11111111111111111111111";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);

      expect(accountParser).not.toBeNull();
    }
  });

  it("should construct an shank account parser for a given valid IDL and parse an account with a bincode type serialization", async () => {
    const programId = "BPFLoaderUpgradeab1e11111111111111111111111";
    const accountData = "AgAAAJSrCltrazv54ayMs6rRGWzA2P4at+6O8Lr2v2ru7E+u";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("program");
      }
    }
  });

  it("should construct an shank account parser for a given valid IDL, parse an account with a bincode type serialization and map the proper types with a valid idl", async () => {
    const programId = "BPFLoaderUpgradeab1e11111111111111111111111";
    const accountData = "AgAAAJSrCltrazv54ayMs6rRGWzA2P4at+6O8Lr2v2ru7E+u";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData, true);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("program");
        expect(decodedData?.data["programDataAddress"].type).not.toBeNull();
      }
    }
  });
});

describe("parseKinobiSerializer", () => {
  it("should construct an kinobi (shank) account parser for a given valid IDL", async () => {
    const programId = "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);

      expect(accountParser).not.toBeNull();
    }
  });

  it("should construct an kinobi (shank) account parser for a given valid IDL and parse the account", async () => {
    const programId = "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY";
    const accountData =
      "iLdCH0etyhvhhqFU2imL4+oUeXsa9qIOikZVi7WAbGYfSS+IiPOSaQw4mhn7EJ4DC4+bNC7hMxwWSTcRihSi/BF+UjKIi+rhAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=+6O8Lr2v2ru7E+u";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("seat");
      }
    }
  });

  it("should construct an kinobi (shank) account parser for a given valid IDL, parses an account and map the proper types with a valid idl", async () => {
    const programId = "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY";
    const accountData =
      "iLdCH0etyhvhhqFU2imL4+oUeXsa9qIOikZVi7WAbGYfSS+IiPOSaQw4mhn7EJ4DC4+bNC7hMxwWSTcRihSi/BF+UjKIi+rhAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=+6O8Lr2v2ru7E+u";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData, true);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("seat");
        expect(decodedData?.data["market"].type).not.toBeNull();
      }
    }
  });

  it("should construct an kinobi (shank) account parser for a given IDL with 0 accounts layout and initialize an empty layout", async () => {
    const programId = "11111111111111111111111111111111";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);

      expect(accountParser).not.toBeNull();
    }
  });

  it("should construct an kinobi (shank) account parser for a given IDL with 0 accounts layout and attempts to parse an empty data", async () => {
    const programId = "11111111111111111111111111111111";
    const accountData = "";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);

      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData);
        expect(decodedData).toBeNull();
      }
    }
  });
});

describe("parseMetadataAccSerializer", () => {
  it("should construct an metadata account parser for a given valid IDL", async () => {
    const programId = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);

      expect(accountParser).not.toBeNull();
    }
  });

  it("should construct an metadata account parser for a given valid IDL and parse a corrupted metadata account", async () => {
    const programId = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
    const accountData =
      "BM7tnd55f/4+URYiNbD5WBRIzNGHlCCWjf6hFyuklj/tAEJM6q5HL0v+/X3SI4t1WE1+DoZWg0+KUOj8E0vBgIIgAAAAQ2hlZiAjMzMxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAQ1QAAAAAAAAAAMgAAABodHRwczovL2Fyd2VhdmUubmV0L0NjV1VWT0FSX3ZMLTMxWnZBeFdmcTBaQU1Hc3otbTg5S2ZYRmxWaHc4cDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACADAQIAAADZXoszYXWpqulvzRR+fX34l6TYTlUaS+1fAPLtN8zyNwEArofHD4pxPZTx30FL8iXNd4nL7cMiMJj6a7dDfK7GPTcAZAEBAf0AAABZhnOlKI0RAU2AF7EMFzuZnzVbB/hGdqPnABkBAQH9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("metadata");
      }
    }
  });

  it("should construct an metadata account parser for a given valid IDL and parse a non corrupted metadata account", async () => {
    const programId = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
    const accountData =
      "BAjbviH7qXLse1din0bm6Y35OnlWvbJRJZ2RKnTu64Jq59Op9t0cR02n7mUwQDj9zA/MDmRiiNmNbrev2ZSH/P8gAAAATmVra3JvIFJ1bmUgPz8/AAAAAAAAAAAAAAAAAAAAAAAKAAAATkVLS1JPAAAAAMgAAABodHRwczovL2Fyd2VhdmUubmV0L2pqZnBaZjlHaU1jSlcxRVlNRzNzQ1hyalFlVlBYYUdCS2dTb2NPRUJZLWsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPQBAQUAAAA/yJgFNBTT36Zt8wNNCTzrygTVL45cGamVbr06IYYHIgEAXpS/n6AO/RrK93jneubpi0FKkXHaEpaFI2cnNLFDHLQABfeeZenqgnTDLedVLiE9Vm150GCEfcphxkC+I0P7Y7RpAAXbqpuY8yCkJ9PRKRbrRtYwqG6/nZIE1UQbLmiPClZEBgAFCP/tvTI2E/a7nLcbCeZ7Eb7AC/t280sZwv9rW/s3wCIAVQEBAf4BBAEBEIxDXPVZysbkVkgawQ43CElD5Rl7jSvEOEcmVAcWwbkAAAEAAQmGIoXjcQqQ1R2eRwLemp3V6f3IrIHS0qzR4d3IJP7EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("metadata");
      }
    }
  });
});

describe("parseAnchorNewAccount", () => {
  it("should construct an anchor 0.3.0 and above account parser for a given valid IDL", async () => {
    const programId = "wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM";
    const idlItem = await getProgramIdl(programId);
    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);

      expect(accountParser).not.toBeNull();
    }
  });

  it("should construct an anchor 0.3.0 account parser for a given valid IDL and parses the account data", async () => {
    const programId = "wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM";
    const accountData =
      "EdAyrR5/9V6m/C2k1mM8GIzYQBK00KUbfbT0m8ZLMx5rl1gIaBAJ7mEJARTO19QY9j6iHHhYBvD1stUbOdk6m9gJOh9S+6WObBMAAA==";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData, false);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("TokenGroupMember");
      }
    }
  });

  it("should construct an anchor 0.3.0 account parser for a given valid IDL, parses the account data and map the data that's being returned with the valid idl", async () => {
    const programId = "wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM";
    const accountData =
      "EdAyrR5/9V6m/C2k1mM8GIzYQBK00KUbfbT0m8ZLMx5rl1gIaBAJ7mEJARTO19QY9j6iHHhYBvD1stUbOdk6m9gJOh9S+6WObBMAAA==";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const accountParser = parser.createParser(ParserType.ACCOUNT);
      if (accountParser && checkIfAccountParser(accountParser)) {
        const decodedData = accountParser.parseAccount(accountData, true);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("account");
        expect(decodedData?.name).toBe("TokenGroupMember");
        expect(decodedData?.data["member_number"].type).toBe("u32");
      }
    }
  });
});
