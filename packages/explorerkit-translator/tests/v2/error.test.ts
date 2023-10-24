import { getProgramIdl } from "@solanafm/explorer-kit-idls";
import { describe, expect, it } from "vitest";

import { checkIfErrorsParser, ParserType, SolanaFMParser } from "../../src";

describe("createErrorParser", () => {
  it("should construct an anchor error parser for a given valid IDL", async () => {
    const programId = "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const errorParser = parser.createParser(ParserType.ERROR);

      expect(errorParser).not.toBeNull();
      expect(checkIfErrorsParser(errorParser)).toBe(true);
    }
  });

  it("should construct an anchor error parser for a given valid IDL and parses the error code", async () => {
    const programId = "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB";
    const errorCode = "0x1771";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const errorParser = parser.createParser(ParserType.ERROR);
      if (errorParser && checkIfErrorsParser(errorParser)) {
        const decodedData = errorParser.parseError(errorCode);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("error");
        expect(decodedData?.name).toBe("SlippageToleranceExceeded");
      }
    }
  });
});

describe("createShankErrorParser", () => {
  it("should construct a shank error parser for a given valid IDL", async () => {
    const programId = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const errorParser = parser.createParser(ParserType.ERROR);

      expect(errorParser).not.toBeNull();
      expect(checkIfErrorsParser(errorParser)).toBe(true);
    }
  });

  it("should construct a shank error parser for a given valid IDL and parses the instruction data", async () => {
    const programId = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
    const errorCode = "0x02";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const errorParser = parser.createParser(ParserType.ERROR);
      if (errorParser && checkIfErrorsParser(errorParser)) {
        const decodedData = errorParser.parseError(errorCode);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("error");
        expect(decodedData?.name).toBe("NotRentExempt");
      }
    }
  });

  it("should return null when the error code can not be parsed by the parser", async () => {
    const programId = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
    const errorCode = "0x1771";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const errorParser = parser.createParser(ParserType.ERROR);
      if (errorParser && checkIfErrorsParser(errorParser)) {
        const decodedData = errorParser.parseError(errorCode);
        expect(decodedData).toBeNull();
      }
    }
  });
});
