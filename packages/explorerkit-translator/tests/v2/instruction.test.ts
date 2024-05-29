import { getProgramIdl } from "@solanafm/explorer-kit-idls";
import { describe, expect, it } from "vitest";

import { checkIfInstructionParser, ParserType, SolanaFMParser } from "../../src";

describe("createAnchorParser", () => {
  it("should construct an anchor instruction parser for a given valid IDL", async () => {
    const programId = "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);

      expect(instructionParser).not.toBeNull();
      expect(checkIfInstructionParser(instructionParser)).toBe(true);
    }
  });

  it("should construct an anchor instruction parser for a given valid IDL and parses the instruction data", async () => {
    const programId = "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB";
    const instructionData = "ataeiVXfFLiWHPpsXYoZ7QtjS84TZATEc1EhYBCadzF3EiQH7uou";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);
      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(instructionData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("instruction");
        expect(decodedData?.name).toBe("route");
      }
    }
  });
});

describe("createShankParser", () => {
  it("should construct a kinobi instruction parser for a given valid IDL", async () => {
    const programId = "11111111111111111111111111111111";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);
      expect(instructionParser).not.toBeNull();
      expect(checkIfInstructionParser(instructionParser)).toBe(true);
    }
  });

  it("should construct an shank instruction parser for a given valid IDL and parses the instruction data", async () => {
    const programId = "11111111111111111111111111111111";
    const idlItem = await getProgramIdl(programId);
    const instructionData = "3Bxs46DKpgFK9RAw";

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);

      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(instructionData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("instruction");
        expect(decodedData?.name).toBe("transfer");
      }
    }
  });

  it("should construct an shank instruction parser for a given valid IDL and parses a createAccountWithSeed instruction", async () => {
    const programId = "11111111111111111111111111111111";
    const idlItem = await getProgramIdl(programId);
    const instructionData =
      "2Xryq2Rm8AVqNzd2gDapkK7mqHKfz5Pu6XYXP4wRtDaYaPaSgoViaxxNzRpvkj2p91YVCJq1He1pGHENJ3RfofrAxuxeYfo96X2kRyxGLGDLjcwZxZGRHJ7NDE6RExSMrK8M85D";

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);

      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(instructionData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("instruction");
        expect(decodedData?.name).toBe("createAccountWithSeed");
        expect(decodedData?.data["seed"]).toBe("stake:2");
        expect(decodedData?.data["lamports"]).toBe("12000000000");
      }
    }
  });
});

describe("createCustomKinobiParser", () => {
  it("should construct a custom shank instruction parser for a given valid IDL", async () => {
    const programId = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);
      expect(instructionParser).not.toBeNull();
      expect(checkIfInstructionParser(instructionParser)).toBe(true);
    }
  });

  it("should construct a custom shank instruction parser for a given valid IDL and parses the instruction data", async () => {
    const programId = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";
    const idlItem = await getProgramIdl(programId);
    const instructionData =
      "48BmzWZuN8Pq18ENzo4F3wDkgCYQpd8dFZQWgnP3Kfwz1B3FLx44s46n1vmZwMtPJNshATyJXoqzJQGguy2i6Y2FLaNw";

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);

      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(instructionData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("instruction");
        expect(decodedData?.name).toBe("createMemo");
      }
    }
  });
});

describe("createCustomShankParser", () => {
  it("should construct a custom shank instruction parser for a given valid IDL", async () => {
    const programId = "Config1111111111111111111111111111111111111";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);
      expect(instructionParser).not.toBeNull();
      expect(checkIfInstructionParser(instructionParser)).toBe(true);
    }
  });

  it("should construct a custom shank instruction parser for a given valid IDL and parses the instruction data", async () => {
    const programId = "Config1111111111111111111111111111111111111";
    const idlItem = await getProgramIdl(programId);
    const instructionData =
      "DMAsqnmC6KrwT1cnpyrgenPAEuiFduz8sX7yjEPLT8nY4Sxbo5Rfvxhm1C9PTC6JuUEPSUcKPAzRktPHErxNg5EKffBGZmdVAxWqmAFP9TBa7K13zeCQ7CwDKFjmtna8gQW9qPCTB4KwGJLtdVaSBouSG7uqCFor67YPCjd3C7ZMf8aFrjMXgJCBHVvu3tMDJyc2b17Fwjh8Uq7zvogz5XDZ7qY9BcAPzAiRzxC9f9C6opV6qQrjMPm9rpkWu9oG3jxdadwtK9qBwBxvC8SB8Q2LqRitnWkc7NEu1aAQDNVe4";

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);

      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(instructionData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("instruction");
        expect(decodedData?.name).toBe("store");
      }
    }
  });
});

describe("createHistoricalParser", () => {
  it("should construct a historical instruction parser for a given valid IDL", async () => {
    const programId = "ComputeBudget111111111111111111111111111111";
    const idlItem = await getProgramIdl(programId, {
      slotContext: 132322893,
    });

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);
      expect(instructionParser).not.toBeNull();
      expect(checkIfInstructionParser(instructionParser)).toBe(true);
    }
  });

  it("should construct a historical instruction parser for a given valid IDL and parses the instruction data", async () => {
    const programId = "ComputeBudget111111111111111111111111111111";
    const idlItem = await getProgramIdl(programId, {
      slotContext: 132322893,
    });
    const instructionData = "16jwcDm";
    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);

      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(instructionData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("instruction");
        expect(decodedData?.name).toBe("requestUnitsDeprecated");
      }
    }
  });
});

describe("createAnchorParserWithMappingSupport", () => {
  it("should construct an anchor instruction parser for a given valid IDL and parse the instruction data with types properly mapped according to the idl", async () => {
    const programId = "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB";
    const instructionData = "ataeiVXfFLiWHPpsXYoZ7QtjS84TZATEc1EhYBCadzF3EiQH7uou";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);
      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(instructionData, undefined, true);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("instruction");
        expect(decodedData?.name).toBe("route");
        expect(decodedData?.data["inAmount"].type).toBe("u64");
      }
    }
  });
});

describe("createShankParserWithMappingSupport", () => {
  it("should construct an shank instruction parser for a given valid IDL and parse the instruction data with types properly mapped according to the idl", async () => {
    const programId = "11111111111111111111111111111111";
    const idlItem = await getProgramIdl(programId);
    const instructionData = "3Bxs46DKpgFK9RAw";

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);

      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(instructionData, undefined, true);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("instruction");
        expect(decodedData?.name).toBe("transfer");
        expect(decodedData?.data["lamports"].type).toBe("u64");
      }
    }
  });
});

describe("createShankParserWithOptionalAccountKeysSupport", () => {
  it("should construct an shank instruction parser for a given valid IDL and map the correct number of account keys with 1 optional account keys", async () => {
    const programId = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8";
    const idlItem = await getProgramIdl(programId);
    const instructionData = "5xcHHuFELpsnhDZW9QA7Vjm";

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);

      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(instructionData, [
          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          "DSUvc5qf5LJHHV5e2tD184ixotSnCnwj7i4jJa4Xsrmt",
          "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
          "38p42yoKFWgxw2LCbB96wAKa2LwAxiBArY3fc3eA9yWv",
          "FBba2XsQVhkoQDMfbNLVmo7dsvssdT39BMzVc2eFfE21",
          "GuXKCb9ibwSeRSdSYqaCL3dcxBZ7jJcj6Y7rDwzmUBu9",
          "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX",
          "58sHobBa2KmyE3EKxCpgxn5KGuzudmGHsgqYgrfciyzd",
          "EhboNaGqMiw2rqvh7uN6qEsfxpNoCJQBzPbiiSBNCXmW",
          "CnsZUH9AUNFqkEE6oExCevcHkMamPJhPFvND6mLT4ikb",
          "33L8Zi2bnkUX99NJeFmSEwYF6DaNknPXTB5EdsVBfb6e",
          "Cr278bTbmgyvTbnt1jqCTsPdqUaB9WN3hbGMjRFontmM",
          "EYXT9U31MHRsRSBJ8zafg9paUwYLmWZfJHbSwrJ8mNVb",
          "B7af1ADihMVF1xE2243G2ggBkLRFTFgHT8hHbjWzqj1F",
          "CTyFguG69kwYrzk24P3UuBvY1rR5atu9kf2S6XEwAU8X",
          "F8K1h7dk5UGCv4u6w1b6u6WqtjyJfqHcQvN4DT8eYpM8",
          "MfDuWeqSHEqTFVYZ7LoexgAK9dxk7cy4DFJWjWMGVWa",
        ]);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.name).toBe("swapBaseIn");
        expect(decodedData?.data.ammTargetOrders).toBeUndefined();
        expect(decodedData?.data.poolCoinTokenAccount).toBe("FBba2XsQVhkoQDMfbNLVmo7dsvssdT39BMzVc2eFfE21");
      }
    }
  });
});

describe("createShankPhoenixParserWithMappingSupport", () => {
  it("should construct an shank phoenix instruction parser for a given valid IDL and parse the instruction data with types properly mapped according to the idl", async () => {
    const programId = "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY";
    const idlItem = await getProgramIdl(programId);
    const instructionData = "1ANWfDiU5NJmb8HmcxwHt4hASw4AuXuVyVKRKwSuhZ24jw59bHcie6nP5a8ss9gbdf5idsq6XZ";

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);

      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(instructionData, undefined, true);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("instruction");
        expect(decodedData?.name).toBe("swap");
        expect(decodedData?.data["discriminator"].type).toBe("u8");
      }
    }
  });
});

describe("createAnchorParserWithSelfCPILogSupport", () => {
  it("should construct an anchor instruction parser for a given valid IDL", async () => {
    const programId = "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);

      expect(instructionParser).not.toBeNull();
      expect(checkIfInstructionParser(instructionParser)).toBe(true);
    }
  });

  it("should construct an anchor instruction parser for a given valid IDL and parses the Anchor Self-CPI log instruction", async () => {
    const programId = "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4";
    const instructionData =
      "QMqFu4fYGGeUEysFnenhAvqN6w9n3A28YStPLfH9Rz9Ak2KWiKnYskS7xVokXrYXKgUepEwzD55sME9SDzTXK14VWihVaadk3XTrGUB3BanrEJkRJJWwYnwc3MuVLERVzM1bN9TykYHxcvEbRvTGrpBU7hpneBU9FGTfhdP6WfjUBdR";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);
      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(instructionData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("instruction");
        expect(decodedData?.name).toBe("Anchor Self-CPI Log");
        expect(decodedData?.data).toBeNull();
      }
    }
  });

  it("should construct an anchor instruction parser for a given valid IDL, parses the Anchor Self-CPI log instruction and ensure that the account keys are properly mapped", async () => {
    const programId = "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4";
    const instructionData =
      "QMqFu4fYGGeUEysFnenhAvqN6w9n3A28YStPLfH9Rz9Ak2KWiKnYskS7xVokXrYXKgUepEwzD55sME9SDzTXK14VWihVaadk3XTrGUB3BanrEJkRJJWwYnwc3MuVLERVzM1bN9TykYHxcvEbRvTGrpBU7hpneBU9FGTfhdP6WfjUBdR";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);
      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(instructionData, [
          "D8cy77BBepLMngZx6ZukaTff5hCt1HrWyKk3Hnd9oitf",
        ]);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("instruction");
        expect(decodedData?.name).toBe("Anchor Self-CPI Log");
        expect(decodedData?.data).toBeDefined();
        expect(decodedData?.data?.logAuthority).toBeDefined();
        expect(decodedData?.data?.logAuthority?.data).toBe("D8cy77BBepLMngZx6ZukaTff5hCt1HrWyKk3Hnd9oitf");
      }
    }
  });
});

describe("createNewAnchorParser", () => {
  it("should construct an anchor 0.3.0 instruction parser for a given valid IDL", async () => {
    const programId = "wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);

      expect(instructionParser).not.toBeNull();
      expect(checkIfInstructionParser(instructionParser)).toBe(true);
    }
  });

  it("should construct an anchor 0.3.0 instruction parser for a given valid IDL and parses the instruction data", async () => {
    const programId = "wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM";
    const instructionData =
      "MfvwdoBpZ9LzVC6o3abmYEERuURKfjxUvHv3jZzywDMcr7mMdfdzaXwVZz4cn6wvM3yrQqiFqoFza5Eb1hFEkB8GABGePf3siPiKqifZVQ9SgDBX17rkjpphCXJZW9ExhW2nj41ve8jAq4y59Mftn8SXdRNqhjSPXNG7BXjirdwQFm6inDmyd5pTU7rwvsZNjNPj7qVAthwehw3dUwirS";
    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);
      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(instructionData);
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("instruction");
        expect(decodedData?.name).toBe("create_mint_account");
      }
    }
  });
});

describe("createAnchorNewParserWithMappingSupport", () => {
  it("should construct an anchor 0.3.0 instruction parser for a given valid IDL and parse the instruction data with types properly mapped according to the idl", async () => {
    const programId = "wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM";
    const instructionData =
      "MfvwdoBpZ9LzVC6o3abmYEERuURKfjxUvHv3jZzywDMcr7mMdfdzaXwVZz4cn6wvM3yrQqiFqoFza5Eb1hFEkB8GABGePf3siPiKqifZVQ9SgDBX17rkjpphCXJZW9ExhW2nj41ve8jAq4y59Mftn8SXdRNqhjSPXNG7BXjirdwQFm6inDmyd5pTU7rwvsZNjNPj7qVAthwehw3dUwirS";

    const idlItem = await getProgramIdl(programId);

    if (idlItem) {
      const parser = new SolanaFMParser(idlItem, programId);
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);
      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        const decodedData = instructionParser.parseInstructions(
          instructionData,
          [
            "MA1NqUiWSgJz4VDXjPFfNoDWqBBRpMDnT4vxEnt9qbv",
            "GUPNsgXoWBpJko1GLvCRL8PUdgNPGjEqN682FpJ9wCTx",
            "MA1NqUiWSgJz4VDXjPFfNoDWqBBRpMDnT4vxEnt9qbv",
            "CEqhvcVmvLoGyPkP63BfA3fLZ4DZSe4yzgFxzQrBj6ms",
            "6gQF7GbwhXBC78NveE7JrqcKzbY1WMrkJ6S9gs3dsamz",
            "9SUrE3EPBoXVjNywEDHSJKJdxebs8H8sLgEWdueEvnKX",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
            "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
          ],
          true
        );
        expect(decodedData).not.toBeNull();
        expect(decodedData?.type).toBe("instruction");
        expect(decodedData?.name).toBe("create_mint_account");
        expect(decodedData?.data.args.data.name).toBe("Burger #4971");
      }
    }
  });
});
