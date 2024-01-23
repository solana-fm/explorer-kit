import { Keypair } from "@solana/web3.js";
import { getProgramIdl } from "@solanafm/explorer-kit-idls";
import { beforeAll, describe, expect, it } from "vitest";

import { checkIfInstructionParser, InstructionParserInterface, ParserType, SolanaFMParser } from "../../src";

// To store the parser for the test cases to use
let token2022Parser: InstructionParserInterface | null = null;

beforeAll(async () => {
  const programId = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
  const idlItem = await getProgramIdl(programId);

  if (idlItem) {
    const parser = new SolanaFMParser(idlItem, programId);
    const instructionParser = parser.createParser(ParserType.INSTRUCTION);
    if (instructionParser && checkIfInstructionParser(instructionParser)) {
      token2022Parser = instructionParser;
    }
  }
});

describe("Parse Transfer Fee Extensions Instructions", () => {
  //   Discriminator 0
  it("should parse initialize transfer fee config instruction", () => {
    if (token2022Parser) {
      const accounts = ["5ZVTBr1pVKgibFA1J7JMZoBUXqiL2zZqSfm9YEKN8yWg"];
      // 41wvUxYkfikiyw7XwqYeQKik6LXyTxUdMR6jnaUff1Cew6ZfWP7xfR2pEbyr2Tfk3iL7dDsfwvavx76urWpPsCPn
      const data =
        "qvXRyS3xL9YaUdTgsa4oiYYCNHhsXZVE6TdUDjdbkPuPxLDUPfDBvFRvgxMVBErjKX69A9vaGcDQ33YS77KG8L7XwE8io3fAWsiJC7A8tF";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "initializeTransferFeeConfig");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: {
          type: "u8",
          data: 0,
        },
        transferFeeConfigAuthority: {
          type: {
            coption: "publicKey",
            prefix: "u8",
          },
          data: "3yRAAmHLw5nUWsXsa95VmDXo2ZNkh3aLwAyfJVPdZ7xx",
        },
        withdrawWithheldAuthority: {
          type: {
            coption: "publicKey",
            prefix: "u8",
          },
          data: "3yRAAmHLw5nUWsXsa95VmDXo2ZNkh3aLwAyfJVPdZ7xx",
        },
        transferFeeBasisPoints: {
          type: "u16",
          data: 50,
        },
        maximumFee: {
          type: "u64",
          data: "5000",
        },
        mint: {
          data: "5ZVTBr1pVKgibFA1J7JMZoBUXqiL2zZqSfm9YEKN8yWg",
          type: "publicKey",
        },
      });
    }
  });

  //   Discriminator 1
  it("should parse initialize transfer checked with fee instruction", () => {
    if (token2022Parser) {
      const accounts = [
        "A2CZcdAQrtHEyaE4VWvBEph5GGU7cpDNfhKBc71uTMeW",
        "5ZVTBr1pVKgibFA1J7JMZoBUXqiL2zZqSfm9YEKN8yWg",
        "6RipMhojjK4Wvk7pB2wGkEzhgTb8VNE8fbwi7jdXPFji",
        "3yRAAmHLw5nUWsXsa95VmDXo2ZNkh3aLwAyfJVPdZ7xx",
      ];
      // 4c2tBpJtwoDxjAKjNr6YfqeCEesRHjN8GZEwwvEd6Wmeup6FRLaeWXV73ZDJPa5EtGNB3xgGWB3WXq1Wtbwfs4WK
      const data = "5m7XqeJDRCAMkDwq5edNkJSVcB";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "transferCheckedWithFee");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: {
          type: "u8",
          data: 1,
        },
        amount: {
          type: "u64",
          data: "1000000000000000",
        },
        decimals: {
          type: "u8",
          data: 9,
        },
        fee: {
          type: "u64",
          data: "5000",
        },
        source: {
          data: "A2CZcdAQrtHEyaE4VWvBEph5GGU7cpDNfhKBc71uTMeW",
          type: "publicKey",
        },
        tokenMint: {
          data: "5ZVTBr1pVKgibFA1J7JMZoBUXqiL2zZqSfm9YEKN8yWg",
          type: "publicKey",
        },
        destination: {
          data: "6RipMhojjK4Wvk7pB2wGkEzhgTb8VNE8fbwi7jdXPFji",
          type: "publicKey",
        },
        owner: {
          data: "3yRAAmHLw5nUWsXsa95VmDXo2ZNkh3aLwAyfJVPdZ7xx",
          type: "publicKey",
        },
      });
    }
  });

  it("should parse initialize transfer checked with fee instruction with more than 1 signers", () => {
    if (token2022Parser) {
      const signer1 = Keypair.generate();
      const signer2 = Keypair.generate();

      const accounts = [
        "A2CZcdAQrtHEyaE4VWvBEph5GGU7cpDNfhKBc71uTMeW",
        "5ZVTBr1pVKgibFA1J7JMZoBUXqiL2zZqSfm9YEKN8yWg",
        "6RipMhojjK4Wvk7pB2wGkEzhgTb8VNE8fbwi7jdXPFji",
        "3yRAAmHLw5nUWsXsa95VmDXo2ZNkh3aLwAyfJVPdZ7xx",
        signer1.publicKey.toBase58(),
        signer2.publicKey.toBase58(),
      ];
      // 4c2tBpJtwoDxjAKjNr6YfqeCEesRHjN8GZEwwvEd6Wmeup6FRLaeWXV73ZDJPa5EtGNB3xgGWB3WXq1Wtbwfs4WK
      const data = "5m7XqeJDRCAMkDwq5edNkJSVcB";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "transferCheckedWithFee");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: {
          type: "u8",
          data: 1,
        },
        amount: {
          type: "u64",
          data: "1000000000000000",
        },
        decimals: {
          type: "u8",
          data: 9,
        },
        fee: {
          type: "u64",
          data: "5000",
        },
        source: {
          data: "A2CZcdAQrtHEyaE4VWvBEph5GGU7cpDNfhKBc71uTMeW",
          type: "publicKey",
        },
        tokenMint: {
          data: "5ZVTBr1pVKgibFA1J7JMZoBUXqiL2zZqSfm9YEKN8yWg",
          type: "publicKey",
        },
        destination: {
          data: "6RipMhojjK4Wvk7pB2wGkEzhgTb8VNE8fbwi7jdXPFji",
          type: "publicKey",
        },
        owner: {
          data: "3yRAAmHLw5nUWsXsa95VmDXo2ZNkh3aLwAyfJVPdZ7xx",
          type: "publicKey",
        },
        signer1: {
          data: signer1.publicKey.toBase58(),
          type: "publicKey",
        },
        signer2: {
          data: signer2.publicKey.toBase58(),
          type: "publicKey",
        },
      });
    }
  });

  //   Discriminator 2
  it("should parse withdraw withheld tokens from mint instruction", () => {
    if (token2022Parser) {
      const accounts = [
        "GWvdnehRBfHFu2oXMJ2h8tWBZRuQJ4pqRk5g7uTXMv4F",
        "3siALeRgPTosASjxBSp3eh43dwYBs449BPVUtAaKijNE",
        "7QggzVeuCwRDXVhZxXRJKxFBFZjUMKiTj84cuuYos1bH",
      ];
      // 5Wxew4FHKcD2x7BdYgJuoRAdDyYxjiLNYcHxWQNkXxBwfV5oMec8ztXgjub1g8H2MoFVzMu6hCekET8UDjkrTTg3
      const data = "2yo";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "withdrawWithheldTokensFromMint");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: 2,
        mint: {
          data: "GWvdnehRBfHFu2oXMJ2h8tWBZRuQJ4pqRk5g7uTXMv4F",
          type: "publicKey",
        },
        destination: {
          data: "3siALeRgPTosASjxBSp3eh43dwYBs449BPVUtAaKijNE",
          type: "publicKey",
        },
        withdrawWithheldAuthority: {
          data: "7QggzVeuCwRDXVhZxXRJKxFBFZjUMKiTj84cuuYos1bH",
          type: "publicKey",
        },
      });
    }
  });

  it("should parse withdraw withheld tokens from mint instruction with more than 1 signers", () => {
    if (token2022Parser) {
      const signer1 = Keypair.generate().publicKey.toBase58();
      const signer2 = Keypair.generate().publicKey.toBase58();
      const accounts = [
        "GWvdnehRBfHFu2oXMJ2h8tWBZRuQJ4pqRk5g7uTXMv4F",
        "3siALeRgPTosASjxBSp3eh43dwYBs449BPVUtAaKijNE",
        "7QggzVeuCwRDXVhZxXRJKxFBFZjUMKiTj84cuuYos1bH",
        signer1,
        signer2,
      ];
      // 5Wxew4FHKcD2x7BdYgJuoRAdDyYxjiLNYcHxWQNkXxBwfV5oMec8ztXgjub1g8H2MoFVzMu6hCekET8UDjkrTTg3
      const data = "2yo";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "withdrawWithheldTokensFromMint");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: 2,
        mint: {
          data: "GWvdnehRBfHFu2oXMJ2h8tWBZRuQJ4pqRk5g7uTXMv4F",
          type: "publicKey",
        },
        destination: {
          data: "3siALeRgPTosASjxBSp3eh43dwYBs449BPVUtAaKijNE",
          type: "publicKey",
        },
        withdrawWithheldAuthority: {
          data: "7QggzVeuCwRDXVhZxXRJKxFBFZjUMKiTj84cuuYos1bH",
          type: "publicKey",
        },
        signer1: {
          data: signer1,
          type: "publicKey",
        },
        signer2: {
          data: signer2,
          type: "publicKey",
        },
      });
    }
  });

  //   Discriminator 3
  it("should parse withdraw withheld tokens from accounts instruction with 1 signer and 0 source accounts", () => {
    if (token2022Parser) {
      const accounts = [
        "G5vhNd6uwKaCqVzW6F7gJjb2QCHRmzPV1mhmyLSeCtu8",
        "5vrMobCN3QUmiHf5HkE1jUm2FYYBWiJBZrd4b6Ps9ekT",
        "2PwVrtWqgYotS1fzQZrBpu2y7xyNBfrWAq9Y46XR4K1J",
      ];
      // 66QsXwzJZVvPaxLfSRrmhJQjEVtHEURhXuVKPoBkC8NQmA7UW1H24uaLxdsZ7JB3ZXZ9TZRUeW4pj3p5PLdeg9vx
      const data = "9jkT";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "withdrawWithheldTokensFromAccounts");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: {
          type: "u8",
          data: 3,
        },
        numTokenAccounts: {
          type: "u8",
          data: 0,
        },
        mint: {
          data: "G5vhNd6uwKaCqVzW6F7gJjb2QCHRmzPV1mhmyLSeCtu8",
          type: "publicKey",
        },
        destination: {
          data: "5vrMobCN3QUmiHf5HkE1jUm2FYYBWiJBZrd4b6Ps9ekT",
          type: "publicKey",
        },
        withdrawWithheldAuthority: {
          data: "2PwVrtWqgYotS1fzQZrBpu2y7xyNBfrWAq9Y46XR4K1J",
          type: "publicKey",
        },
      });
    }
  });

  it("should parse withdraw withheld tokens from accounts instruction", () => {
    if (token2022Parser) {
      const accounts = [
        "F79LGNokV1U3keArUggouRWyxEt6CxS6FTh63YQ7MmGS",
        "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
        "8ZzWhKjuc8PLgboKcjrwASyTnpxnvxGbvrCBZUW2bvJp",
        "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
      ];
      // 66QsXwzJZVvPaxLfSRrmhJQjEVtHEURhXuVKPoBkC8NQmA7UW1H24uaLxdsZ7JB3ZXZ9TZRUeW4pj3p5PLdeg9vx
      const data = "9jkU";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "withdrawWithheldTokensFromAccounts");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: {
          type: "u8",
          data: 3,
        },
        numTokenAccounts: {
          type: "u8",
          data: 1,
        },
        mint: {
          data: "F79LGNokV1U3keArUggouRWyxEt6CxS6FTh63YQ7MmGS",
          type: "publicKey",
        },
        destination: {
          data: "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
          type: "publicKey",
        },
        withdrawWithheldAuthority: {
          data: "8ZzWhKjuc8PLgboKcjrwASyTnpxnvxGbvrCBZUW2bvJp",
          type: "publicKey",
        },
        sourceAccount1: {
          data: "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
          type: "publicKey",
        },
      });
    }
  });

  it("should parse withdraw withheld tokens from accounts instruction with more than 1 source accounts", () => {
    if (token2022Parser) {
      const mockSourceAccount = Keypair.generate().publicKey.toBase58();
      const accounts = [
        "F79LGNokV1U3keArUggouRWyxEt6CxS6FTh63YQ7MmGS",
        "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
        "8ZzWhKjuc8PLgboKcjrwASyTnpxnvxGbvrCBZUW2bvJp",
        "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
        mockSourceAccount,
      ];
      // 66QsXwzJZVvPaxLfSRrmhJQjEVtHEURhXuVKPoBkC8NQmA7UW1H24uaLxdsZ7JB3ZXZ9TZRUeW4pj3p5PLdeg9vx
      const data = "9jkV";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "withdrawWithheldTokensFromAccounts");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: {
          type: "u8",
          data: 3,
        },
        numTokenAccounts: {
          type: "u8",
          data: 2,
        },
        mint: {
          data: "F79LGNokV1U3keArUggouRWyxEt6CxS6FTh63YQ7MmGS",
          type: "publicKey",
        },
        destination: {
          data: "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
          type: "publicKey",
        },
        withdrawWithheldAuthority: {
          data: "8ZzWhKjuc8PLgboKcjrwASyTnpxnvxGbvrCBZUW2bvJp",
          type: "publicKey",
        },
        sourceAccount1: {
          data: "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
          type: "publicKey",
        },
        sourceAccount2: {
          data: mockSourceAccount,
          type: "publicKey",
        },
      });
    }
  });

  it("should parse withdraw withheld tokens from accounts instruction with only 1 source accounts but more than 1 signers", () => {
    if (token2022Parser) {
      const mockSigner1 = Keypair.generate().publicKey.toBase58();
      const mockSigner2 = Keypair.generate().publicKey.toBase58();
      const accounts = [
        "F79LGNokV1U3keArUggouRWyxEt6CxS6FTh63YQ7MmGS",
        "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
        "8ZzWhKjuc8PLgboKcjrwASyTnpxnvxGbvrCBZUW2bvJp",
        mockSigner1,
        mockSigner2,
        "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
      ];
      // 66QsXwzJZVvPaxLfSRrmhJQjEVtHEURhXuVKPoBkC8NQmA7UW1H24uaLxdsZ7JB3ZXZ9TZRUeW4pj3p5PLdeg9vx
      const data = "9jkU";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "withdrawWithheldTokensFromAccounts");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: {
          type: "u8",
          data: 3,
        },
        numTokenAccounts: {
          type: "u8",
          data: 1,
        },
        mint: {
          data: "F79LGNokV1U3keArUggouRWyxEt6CxS6FTh63YQ7MmGS",
          type: "publicKey",
        },
        destination: {
          data: "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
          type: "publicKey",
        },
        withdrawWithheldAuthority: {
          data: "8ZzWhKjuc8PLgboKcjrwASyTnpxnvxGbvrCBZUW2bvJp",
          type: "publicKey",
        },
        signer1: {
          data: mockSigner1,
          type: "publicKey",
        },
        signer2: {
          data: mockSigner2,
          type: "publicKey",
        },
        sourceAccount1: {
          data: "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
          type: "publicKey",
        },
      });
    }
  });

  it("should parse withdraw withheld tokens from accounts instruction with more than 1 source accounts and more than 1 signers", () => {
    if (token2022Parser) {
      const mockSigner1 = Keypair.generate().publicKey.toBase58();
      const mockSigner2 = Keypair.generate().publicKey.toBase58();
      const sourceAccount1 = Keypair.generate().publicKey.toBase58();
      const sourceAccount2 = Keypair.generate().publicKey.toBase58();
      const accounts = [
        "F79LGNokV1U3keArUggouRWyxEt6CxS6FTh63YQ7MmGS",
        "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
        "8ZzWhKjuc8PLgboKcjrwASyTnpxnvxGbvrCBZUW2bvJp",
        mockSigner1,
        mockSigner2,
        "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
        sourceAccount1,
        sourceAccount2,
      ];
      // 66QsXwzJZVvPaxLfSRrmhJQjEVtHEURhXuVKPoBkC8NQmA7UW1H24uaLxdsZ7JB3ZXZ9TZRUeW4pj3p5PLdeg9vx
      const data = "9jkW";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "withdrawWithheldTokensFromAccounts");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: {
          type: "u8",
          data: 3,
        },
        numTokenAccounts: {
          type: "u8",
          data: 3,
        },
        mint: {
          data: "F79LGNokV1U3keArUggouRWyxEt6CxS6FTh63YQ7MmGS",
          type: "publicKey",
        },
        destination: {
          data: "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
          type: "publicKey",
        },
        withdrawWithheldAuthority: {
          data: "8ZzWhKjuc8PLgboKcjrwASyTnpxnvxGbvrCBZUW2bvJp",
          type: "publicKey",
        },
        signer1: {
          data: mockSigner1,
          type: "publicKey",
        },
        signer2: {
          data: mockSigner2,
          type: "publicKey",
        },
        sourceAccount1: {
          data: "F2BnR4GXrmjJDXKsAzco4qDpUUQbJ36yKwAYiZwcseBB",
          type: "publicKey",
        },
        sourceAccount2: {
          data: sourceAccount1,
          type: "publicKey",
        },
        sourceAccount3: {
          data: sourceAccount2,
          type: "publicKey",
        },
      });
    }
  });

  //   Discriminator 4
  it("should parse harvest withheld tokens to mint instruction", () => {
    if (token2022Parser) {
      const accounts = ["GWvdnehRBfHFu2oXMJ2h8tWBZRuQJ4pqRk5g7uTXMv4F", "8MyFR5mgLw5tVshBT5ccCBQM45XjVqFYTtC9XBTiLdgK"];
      // 3VRhCqyGaDtstqpynhXPytZkBWycBMZdNSy6mNgbsxSz5RMHX4fp8P1crnRuXWWzfCGkJTwCQZ25198DLrJZrpBe
      const data = "2yq";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "harvestWithheldTokensToMint");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: 4,
        mint: {
          data: "GWvdnehRBfHFu2oXMJ2h8tWBZRuQJ4pqRk5g7uTXMv4F",
          type: "publicKey",
        },
        source: {
          data: "8MyFR5mgLw5tVshBT5ccCBQM45XjVqFYTtC9XBTiLdgK",
          type: "publicKey",
        },
      });
    }
  });

  it("should parse harvest withheld tokens to mint instruction with more than 1 source accounts", () => {
    if (token2022Parser) {
      const sourceAccount1 = Keypair.generate().publicKey.toBase58();
      const sourceAccount2 = Keypair.generate().publicKey.toBase58();
      const accounts = [
        "GWvdnehRBfHFu2oXMJ2h8tWBZRuQJ4pqRk5g7uTXMv4F",
        "8MyFR5mgLw5tVshBT5ccCBQM45XjVqFYTtC9XBTiLdgK",
        sourceAccount1,
        sourceAccount2,
      ];
      // 3VRhCqyGaDtstqpynhXPytZkBWycBMZdNSy6mNgbsxSz5RMHX4fp8P1crnRuXWWzfCGkJTwCQZ25198DLrJZrpBe
      const data = "2yq";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "harvestWithheldTokensToMint");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: 4,
        mint: {
          data: "GWvdnehRBfHFu2oXMJ2h8tWBZRuQJ4pqRk5g7uTXMv4F",
          type: "publicKey",
        },
        source1: {
          data: "8MyFR5mgLw5tVshBT5ccCBQM45XjVqFYTtC9XBTiLdgK",
          type: "publicKey",
        },
        source2: {
          data: sourceAccount1,
          type: "publicKey",
        },
        source3: {
          data: sourceAccount2,
          type: "publicKey",
        },
      });
    }
  });

  //   Discriminator 5
  it("should parse set transfer fee instruction", () => {
    if (token2022Parser) {
      const accounts = [
        "BWisgvndyS6LHWT7jmtCxUxf9KfiBYX14mnSFJGgbFy2",
        "44LZ5pUPJTc3TyrEu6qUgmwxS4HGkmxuTjpxj7iNeaRt",
        "44LZ5pUPJTc3TyrEu6qUgmwxS4HGkmxuTjpxj7iNeaRt",
      ];
      // 3ugXaHtKRBzD1GivptUuiTmWMMwUYjuJPJedv9mW8Y3MGp8LMJAfj4v6aWDKZwHf3K3SZ6oN5Ppn5d5MuHDVfi1F
      const data = "VUzAdaNReycGXUF9";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "setTransferFee");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: {
          type: "u8",
          data: 5,
        },
        transferFeeBasisPoints: {
          type: "u16",
          data: 1000,
        },
        maximumFee: {
          type: "u64",
          data: "5000000000",
        },
        mint: {
          data: "BWisgvndyS6LHWT7jmtCxUxf9KfiBYX14mnSFJGgbFy2",
          type: "publicKey",
        },
        owner: {
          data: "44LZ5pUPJTc3TyrEu6qUgmwxS4HGkmxuTjpxj7iNeaRt",
          type: "publicKey",
        },
        signers: {
          data: "44LZ5pUPJTc3TyrEu6qUgmwxS4HGkmxuTjpxj7iNeaRt",
          type: "publicKey",
        },
      });
    }
  });

  it("should parse set transfer fee instruction with more than 1 signers", () => {
    if (token2022Parser) {
      const signer1 = Keypair.generate().publicKey.toBase58();
      const accounts = [
        "BWisgvndyS6LHWT7jmtCxUxf9KfiBYX14mnSFJGgbFy2",
        "44LZ5pUPJTc3TyrEu6qUgmwxS4HGkmxuTjpxj7iNeaRt",
        "44LZ5pUPJTc3TyrEu6qUgmwxS4HGkmxuTjpxj7iNeaRt",
        signer1,
      ];
      // 3ugXaHtKRBzD1GivptUuiTmWMMwUYjuJPJedv9mW8Y3MGp8LMJAfj4v6aWDKZwHf3K3SZ6oN5Ppn5d5MuHDVfi1F
      const data = "VUzAdaNReycGXUF9";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData?.data).toHaveProperty("extensionInstructionName", "setTransferFee");
      expect(decodedData?.data.extensionInstructionData).toEqual({
        discriminator: {
          type: "u8",
          data: 5,
        },
        transferFeeBasisPoints: {
          type: "u16",
          data: 1000,
        },
        maximumFee: {
          type: "u64",
          data: "5000000000",
        },
        mint: {
          data: "BWisgvndyS6LHWT7jmtCxUxf9KfiBYX14mnSFJGgbFy2",
          type: "publicKey",
        },
        owner: {
          data: "44LZ5pUPJTc3TyrEu6qUgmwxS4HGkmxuTjpxj7iNeaRt",
          type: "publicKey",
        },
        signer1: {
          data: "44LZ5pUPJTc3TyrEu6qUgmwxS4HGkmxuTjpxj7iNeaRt",
          type: "publicKey",
        },
        signer2: {
          data: signer1,
          type: "publicKey",
        },
      });
    }
  });
});

describe("Parse Token Metadata Interface Instructions", () => {
  it("should parse Initialize Token Metadata Instruction", () => {
    if (token2022Parser) {
      const accounts = [
        "Wy6KMLpjScEkh7TqvXiU9n56RU7YY5x9xnCPSnoMTUP",
        "GY2JkeezT1j9B8Uh2YGPMXvFzgc4anNyEb9f2yR6xXeB",
        "Wy6KMLpjScEkh7TqvXiU9n56RU7YY5x9xnCPSnoMTUP",
        "GY2JkeezT1j9B8Uh2YGPMXvFzgc4anNyEb9f2yR6xXeB",
      ];
      // 5FuE1VPjbPztLWeMbtNkcpgTEgmiuoLWYqJQK5UawUXLTFGM1ihtD79gnghdFVg6yr2BL5Ey88rLWMBZtRHRrtKT
      const data =
        "qzvJyWvsgjuZzV5s48dRpbdEPXzqG85j8rXTjEkXZXY5YT7YJyfs7oEp726uTT4nraxYxGZRX39NCBXRwzTRQPUokcgNt11Etf1N4J256cCaHkTZ66xz2MwvS6WneVj";

      const decodedData = token2022Parser.parseInstructions(data, accounts, true);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData).toEqual({
        name: "initializeAccount",
        data: {
          name: "doodoo1",
          symbol: "DOO",
          uri: "https://prod-sujiko.s3.eu-north-1.amazonaws.com/assets/978.json",
        },
        type: "instruction",
      });
    }
  });
});
