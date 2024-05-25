import { getProgramIdl } from "@solanafm/explorer-kit-idls";
import { describe, expect, it } from "vitest";

import { checkIfEventParser, checkIfInstructionParser, ParserType, SolanaFMParser } from "../../src";

describe("createAnchorEventParser", () => {
  it("should construct an anchor event parser for a given valid IDL", async () => {
    const programId = "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const eventParser = parser.createParser(ParserType.EVENT);

      expect(eventParser).not.toBeNull();
      expect(checkIfInstructionParser(eventParser)).toBe(false);
      expect(checkIfEventParser(eventParser)).toBe(true);
    }
  });

  it("should construct an anchor event parser for a given valid IDL and parses the event data", async () => {
    const programId = "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB";
    const instructionData =
      "UWzjvs3QCsTK4JG4rMDoQTFs3+aKZ2iVocDNV3WrI/6ICjX+qUE0Hcb6evO+2606PWXzaqvJdDGxu+TC0vbg5HymAgNFL11hZygFAAAAAABm5RiKEwih25C20x8/vcqMPfJnjIES3909GSxaPMRXqLFJAAAAAAAA";

    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const eventParser = parser.createParser(ParserType.EVENT);

      if (eventParser && checkIfEventParser(eventParser)) {
        const decodedData = eventParser.parseEvents(instructionData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("event");
        expect(decodedData?.name).toBe("Swap");
      }
    }
  });

  it("should construct an anchor event parser for a given valid IDL and parses the event data and properly map the data type with the given IDL", async () => {
    const programId = "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB";
    const instructionData =
      "UWzjvs3QCsTK4JG4rMDoQTFs3+aKZ2iVocDNV3WrI/6ICjX+qUE0Hcb6evO+2606PWXzaqvJdDGxu+TC0vbg5HymAgNFL11hZygFAAAAAABm5RiKEwih25C20x8/vcqMPfJnjIES3909GSxaPMRXqLFJAAAAAAAA";

    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const eventParser = parser.createParser(ParserType.EVENT);

      if (eventParser && checkIfEventParser(eventParser)) {
        const decodedData = eventParser.parseEvents(instructionData, true);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("event");
        expect(decodedData?.name).toBe("Swap");
        expect(decodedData?.data["inputMint"].type).toBe("publicKey");
      }
    }
  });
});

describe("createShankEventParser", () => {
  it("should construct an shank event parser for a given valid IDL", async () => {
    const programId = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const eventParser = parser.createParser(ParserType.EVENT);

      expect(eventParser).not.toBeNull();
      expect(checkIfInstructionParser(eventParser)).toBe(false);
      expect(checkIfEventParser(eventParser)).toBe(true);
    }
  });

  it("should construct an anchor event parser for a given valid IDL and parses the event data", async () => {
    const programId = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8";
    const eventData = "A8Ce5gUAAAAAnhJhfQsAAAACAAAAAAAAAMCe5gUAAAAAeU9gpSYAAAD7ESaLIGIAAJn+yu8OAAAA";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const eventParser = parser.createParser(ParserType.EVENT);

      if (eventParser && checkIfEventParser(eventParser)) {
        const decodedData = eventParser.parseEvents(eventData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("event");
        expect(decodedData?.name).toBe("swapBaseIn");
      }
    }
  });

  it("should construct an anchor event parser for a given valid IDL and parses the event data and properly map the data type with the given IDL", async () => {
    const programId = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8";
    const eventData = "A8Ce5gUAAAAAnhJhfQsAAAACAAAAAAAAAMCe5gUAAAAAeU9gpSYAAAD7ESaLIGIAAJn+yu8OAAAA";

    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const eventParser = parser.createParser(ParserType.EVENT);

      if (eventParser && checkIfEventParser(eventParser)) {
        const decodedData = eventParser.parseEvents(eventData, true);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("event");
        expect(decodedData?.name).toBe("swapBaseIn");
        expect(decodedData?.data["minimumAmountOut"].type).toBe("u64");
      }
    }
  });
});
