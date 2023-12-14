import { Message, MessageV0, VersionedTransaction } from "@solana/web3.js";
import { checkIfAccountParser, checkIfInstructionParser, ParserType, SolanaFMParser } from "@solanafm/explorer-kit";
import { getProgramIdl } from "@solanafm/explorer-kit-idls";
import bodyParser from "body-parser";
import bs58 from "bs58";
import express, { Express, Request, Response } from "express";

interface Account {
  ownerProgram: string;
  data: string;
}

interface DecodeAccountsRequestBody {
  accounts: Account[];
}

interface DecodedAccount {
  error: string | null;
  decodedData: DecodedAccountData | null;
}

interface DecodedAccountData {
  owner: string;
  name: string;
  data: any;
}

interface DecodeTransactionsRequestBody {
  transactions: string[];
}

interface DecodedTransactions {
  error: string | null;
  decodedInstructions: DecodedInstruction[] | null;
}

interface DecodedInstruction {
  programId: string;
  name: string;
  data: any;
}

interface GenericInstruction {
  programId: string;
  data: Uint8Array;
}

const app: Express = express();
app.use(bodyParser.json());

// Endpoint to decode accounts data
app.post("/decode/accounts", async (req: Request, res: Response) => {
  const { accounts } = req.body as DecodeAccountsRequestBody;

  let decodedAccounts: DecodedAccount[] = [];
  for (var account of accounts) {
    if (!isValidBase58(account.ownerProgram)) {
      decodedAccounts.push({ error: "'account.ownerProgram' is not a valid base58 string.", decodedData: null });
      continue;
    }
    if (!isValidBase64(account.data)) {
      decodedAccounts.push({ error: "'account.data' is not a valid base64 string.", decodedData: null });
      continue;
    }

    const SFMIdlItem = await getProgramIdl(account.ownerProgram);
    if (SFMIdlItem === null) {
      decodedAccounts.push({ error: "Failed to find program IDL", decodedData: null });
      continue;
    }

    const parser = new SolanaFMParser(SFMIdlItem, account.ownerProgram);
    const eventParser = parser.createParser(ParserType.ACCOUNT);

    if (eventParser && checkIfAccountParser(eventParser)) {
      // Parse the transaction
      const decodedData = eventParser.parseAccount(account.data);
      decodedAccounts.push({
        error: null,
        decodedData: decodedData
          ? { owner: account.ownerProgram, name: decodedData?.name, data: decodedData?.data }
          : null,
      });
      continue;
    } else {
      decodedAccounts.push({ error: "Failed to parse account", decodedData: null });
      continue;
    }
  }

  return res.status(200).json({ decodedAccounts });
});

// Endpoint to decode transactions
app.post("/decode/transactions", async (req: Request, res: Response) => {
  const { transactions } = req.body as DecodeTransactionsRequestBody;

  let decodedAccounts: DecodedTransactions[] = [];
  for (var encodedTx of transactions) {
    let txBuffer = null;
    if (isValidBase64(encodedTx)) {
      txBuffer = Buffer.from(encodedTx, "base64");
    } else if (isValidBase58(encodedTx)) {
      txBuffer = Buffer.from(bs58.decode(encodedTx));
    } else {
      decodedAccounts.push({ error: "'transaction' is not a valid base64 string.", decodedInstructions: null });
      continue;
    }

    try {
      const tx = VersionedTransaction.deserialize(txBuffer);
      let instructions: GenericInstruction[] = [];
      if (tx.message instanceof Message) {
        for (var ix of tx.message.instructions) {
          let programId = tx.message.accountKeys[ix.programIdIndex];
          if (programId === undefined) {
            decodedAccounts.push({ error: "programId not found in accounts", decodedInstructions: null });
            continue;
          }
          instructions.push({
            programId: programId.toString(), // We know programId will exist
            data: bs58.decode(ix.data),
          });
        }
      } else if (tx.message instanceof MessageV0) {
        for (var inst of tx.message.compiledInstructions) {
          let programId = tx.message.staticAccountKeys[inst.programIdIndex];
          if (programId === undefined) {
            decodedAccounts.push({ error: "programId not found in staticAccountKeys", decodedInstructions: null });
            continue;
          }
          instructions.push({
            programId: programId.toString(),
            data: inst.data,
          });
        }
      } else {
        throw new Error("Unsupported message version");
      }

      let decodedInstructions: any[] = [];
      for (var instruction of instructions) {
        const programId = instruction.programId.toString();

        const SFMIdlItem = await getProgramIdl(programId);
        if (SFMIdlItem) {
          const parser = new SolanaFMParser(SFMIdlItem, programId);
          const instructionParser = parser.createParser(ParserType.INSTRUCTION);

          if (instructionParser && checkIfInstructionParser(instructionParser)) {
            // Parse the transaction
            const decodedInstruction = instructionParser.parseInstructions(bs58.encode(instruction.data));
            decodedInstructions.push({ name: decodedInstruction?.name, data: decodedInstruction?.data, programId });
          }
        } else {
          decodedAccounts.push({ error: "Failed to find program IDL", decodedInstructions: null });
        }
      }

      decodedAccounts.push({ error: null, decodedInstructions });
    } catch (e: any) {
      decodedAccounts.push({ error: e.message, decodedInstructions: null });
    }
  }

  return res.status(200).json({ decodedAccounts });
});

function isValidBase58(str: string): boolean {
  const base58Regex = /^[A-HJ-NP-Za-km-z1-9]+$/;
  return base58Regex.test(str);
}

function isValidBase64(str: string): boolean {
  try {
    const base64Encoded = Buffer.from(str, "base64").toString("base64");
    return str === base64Encoded;
  } catch (e) {
    return false;
  }
}

export { app };
