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

describe("Parse Initialize Mint Instruction", () => {
  it("should parse initialize mint instruction", () => {
    if (token2022Parser) {
      const accounts = ["1", "3"];
      // m93epba32wQbGGRXkrqnG2x54aAjj1BowpWqcigqX2kjT6tm1nwZ9LMzn3BQ9gec75b3mhczumJTXDd6m9qKgAs
      const data = "14aDYE7crygrEUDWLZ4jV2TCezhWFfKjjWMAtq2MvFy7nfywhuGSJu7kUhQeiXCNrwswgT6vpPeaWREMuCbzxWkt8gk";

      const decodedData = token2022Parser.parseInstructions(data, accounts);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData).toHaveProperty("name", "initializeMint");
      expect(decodedData).toEqual({
        name: "initializeMint",
        data: {
          discriminator: 0,
          decimals: 9,
          mintAuthority: "3yRAAmHLw5nUWsXsa95VmDXo2ZNkh3aLwAyfJVPdZ7xx",
          freezeAuthority: "3yRAAmHLw5nUWsXsa95VmDXo2ZNkh3aLwAyfJVPdZ7xx",
          mint: { data: "1", type: "publicKey" },
          rent: { data: "3", type: "publicKey" },
        },
        type: "instruction",
      });
    }
  });
});

describe("Parse Initialize Account Instruction", () => {
  it("should parse initialize account instruction", () => {
    if (token2022Parser) {
      const accounts = ["1", "5", "0", "3"];
      // 32L1iEJ7iBK7cPPp2FaoUGqU5wStHb19dcFbKRWTXnb9XzTQJocTvK1gbh1448ZZLY7GnjgVxPjSkc7roQTQdwW
      const data = "2";

      const decodedData = token2022Parser.parseInstructions(data, accounts);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData).toHaveProperty("name", "initializeAccount");
      expect(decodedData).toEqual({
        name: "initializeAccount",
        data: {
          discriminator: 1,
          accountToInitialize: {
            data: "1",
            type: "publicKey",
          },
          mint: {
            data: "5",
            type: "publicKey",
          },
          owner: {
            data: "0",
            type: "publicKey",
          },
          rent: {
            data: "3",
            type: "publicKey",
          },
        },
        type: "instruction",
      });
    }
  });
});

describe("Parse Initialize Multisig Instruction", () => {
  it("should parse initialize multisig instruction with just 1 signers", () => {
    if (token2022Parser) {
      const accounts = ["1", "3", "6"];
      // 2vznZogLqs5Tg78C3vGWLEAJDreVgUcEu3iSiBQCDmZw62hRq8q7xC6NzEKUx6ugTcMXNF5ymbsM8TzyXaJynAQn
      const data = "9r";

      const decodedData = token2022Parser.parseInstructions(data, accounts);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData).toHaveProperty("name", "initializeMultisig");
      expect(decodedData).toEqual({
        name: "initializeMultisig",
        data: {
          discriminator: 2,
          noOfSignersRequired: 1,
          multisig: {
            data: "1",
            type: "publicKey",
          },
          rent: {
            data: "3",
            type: "publicKey",
          },
          signer1: {
            data: "6",
            type: "publicKey",
          },
        },
        type: "instruction",
      });
    }
  });

  it("should parse initialize multisig instruction with more than 1 signers", () => {
    if (token2022Parser) {
      const accounts = ["1", "3", "6", "5"];
      // 2vznZogLqs5Tg78C3vGWLEAJDreVgUcEu3iSiBQCDmZw62hRq8q7xC6NzEKUx6ugTcMXNF5ymbsM8TzyXaJynAQn
      const data = "9r";

      const decodedData = token2022Parser.parseInstructions(data, accounts);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData).toHaveProperty("name", "initializeMultisig");
      expect(decodedData).toEqual({
        name: "initializeMultisig",
        data: {
          discriminator: 2,
          noOfSignersRequired: 1,
          multisig: {
            data: "1",
            type: "publicKey",
          },
          rent: {
            data: "3",
            type: "publicKey",
          },
          signer1: {
            data: "6",
            type: "publicKey",
          },
          signer2: {
            data: "5",
            type: "publicKey",
          },
        },
        type: "instruction",
      });
    }
  });
});

describe("Parse Transfer Instruction", () => {
  it("should parse transfer instruction with only 1 signer", () => {
    if (token2022Parser) {
      const accounts = ["1", "2", "0", "0"];
      // 3HXHyeHNQHMWkAKKmK8H4DdTSfCHFizJ6y71eazEJt1BSbdTJ1j98kjRCGrJfZZNTHk2wBpeokYGPRyZvYvFCXNP
      const data = "3DcjYYihw5WF";

      const decodedData = token2022Parser.parseInstructions(data, accounts);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData).toHaveProperty("name", "transfer");
      expect(decodedData).toEqual({
        name: "transfer",
        data: {
          discriminator: 3,
          amount: "5000000000",
          source: {
            data: "1",
            type: "publicKey",
          },
          destination: {
            data: "2",
            type: "publicKey",
          },
          authority: {
            data: "0",
            type: "publicKey",
          },
          signers: {
            data: "0",
            type: "publicKey",
          },
        },
        type: "instruction",
      });
    }
  });

  it("should parse transfer instruction with more than 1 signers", () => {
    if (token2022Parser) {
      const accounts = ["1", "2", "0", "0", "13", "14"];
      // 3HXHyeHNQHMWkAKKmK8H4DdTSfCHFizJ6y71eazEJt1BSbdTJ1j98kjRCGrJfZZNTHk2wBpeokYGPRyZvYvFCXNP
      const data = "3DcjYYihw5WF";

      const decodedData = token2022Parser.parseInstructions(data, accounts);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData).toHaveProperty("name", "transfer");
      expect(decodedData).toEqual({
        name: "transfer",
        data: {
          discriminator: 3,
          amount: "5000000000",
          source: {
            data: "1",
            type: "publicKey",
          },
          destination: {
            data: "2",
            type: "publicKey",
          },
          authority: {
            data: "0",
            type: "publicKey",
          },
          signer1: {
            data: "0",
            type: "publicKey",
          },
          signer2: {
            data: "13",
            type: "publicKey",
          },
          signer3: {
            data: "14",
            type: "publicKey",
          },
        },
        type: "instruction",
      });
    }
  });
});

describe("Parse Approve Instruction", () => {
  it("should parse approve instruction with only 1 signer", () => {
    if (token2022Parser) {
      const accounts = ["1", "2", "0"];
      // VToEqbDJBN7Sn9SQczUW2EMZ9npPZ5LLWkgaXUi7tteHnEsUjCsUyZgUdsUPwdyQkoRCqzEDsS4TVg9ja7VBaEW
      const data = "4gvuKoSJriBY";

      const decodedData = token2022Parser.parseInstructions(data, accounts);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData).toHaveProperty("name", "approve");
      expect(decodedData).toEqual({
        name: "approve",
        data: {
          discriminator: 4,
          amount: "18446744073709551614",
          source: {
            data: "1",
            type: "publicKey",
          },
          delegate: {
            data: "2",
            type: "publicKey",
          },
          owner: {
            data: "0",
            type: "publicKey",
          },
        },
        type: "instruction",
      });
    }
  });

  it("should parse approve instruction with more than 1 signer", () => {
    if (token2022Parser) {
      const accounts = ["1", "2", "0", "0", "13", "14"];
      // 2GFKbZW8w3sbjpnjHAcD7V62F36tZC27sXmyrUx2SWsqWy4Vpp38kHpx2jXNRwaHaHd9TVCkik4kMLT5YiXu6hq5
      const data = "4gvuKoSJriBY";

      const decodedData = token2022Parser.parseInstructions(data, accounts);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData).toHaveProperty("name", "approve");
      expect(decodedData).toEqual({
        name: "approve",
        data: {
          discriminator: 4,
          amount: "18446744073709551614",
          source: {
            data: "1",
            type: "publicKey",
          },
          delegate: {
            data: "2",
            type: "publicKey",
          },
          owner: {
            data: "0",
            type: "publicKey",
          },
          signer1: {
            data: "0",
            type: "publicKey",
          },
          signer2: {
            data: "13",
            type: "publicKey",
          },
          signer3: {
            data: "14",
            type: "publicKey",
          },
        },
        type: "instruction",
      });
    }
  });
});

describe("Parse Revoke Instruction", () => {
  it("should parse revoke instruction with only 1 signer", () => {
    if (token2022Parser) {
      const accounts = ["1", "0"];
      // XYaXkbckPTAj2Yq8AHvDBcAwb48BvG4ZjSx1DPU2VRCypSHToTsKfrZR9GaLR4MsPwCupZ3gbmLJoybRbuQuXnB
      const data = "6";

      const decodedData = token2022Parser.parseInstructions(data, accounts);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData).toHaveProperty("name", "revoke");
      expect(decodedData).toEqual({
        name: "revoke",
        data: {
          discriminator: 5,
          source: {
            data: "1",
            type: "publicKey",
          },
          owner: {
            data: "0",
            type: "publicKey",
          },
        },
        type: "instruction",
      });
    }
  });

  it("should parse revoke instruction with more than 1 signer", () => {
    if (token2022Parser) {
      const accounts = ["1", "0", "0", "13"];
      // 2GFKbZW8w3sbjpnjHAcD7V62F36tZC27sXmyrUx2SWsqWy4Vpp38kHpx2jXNRwaHaHd9TVCkik4kMLT5YiXu6hq5
      const data = "6";

      const decodedData = token2022Parser.parseInstructions(data, accounts);
      expect(decodedData).not.toBeNull();
      expect(decodedData).not.toBeUndefined();
      expect(decodedData).toHaveProperty("name", "revoke");
      expect(decodedData).toEqual({
        name: "revoke",
        data: {
          discriminator: 5,
          source: {
            data: "1",
            type: "publicKey",
          },
          owner: {
            data: "0",
            type: "publicKey",
          },
          signer1: {
            data: "0",
            type: "publicKey",
          },
          signer2: {
            data: "13",
            type: "publicKey",
          },
        },
        type: "instruction",
      });
    }
  });
});
