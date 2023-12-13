import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { SolanaFMParser, checkIfAccountParser, checkIfInstructionParser, ParserType } from "@solanafm/explorer-kit";
import { getProgramIdl } from "@solanafm/explorer-kit-idls";
import { VersionedTransaction, Message, MessageV0, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

interface Account {
  ownerProgram: string;
  data: string;
}

interface DecodeAccountsRequestBody {
  accounts: Account[];
}

interface DecodedAccount {
  error: string | null;
  decodedData: any | null;
}

interface DecodeTransactionsRequestBody {
  transactions: string[];
}

interface DecodedTransactions {
  error: string | null;
  decodedInstructions: any[] | null;
}

interface GenericInstruction {
  programId: string;
  data: Uint8Array;
}

const app = express();
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
      decodedAccounts.push({ error: null, decodedData });
      continue;
    } else {
      decodedAccounts.push({ error: "Failed to parse account", decodedData: null });
      continue;
    }
  }

  return res.status(200).json({ decodedAccounts });
});

// // Endpoint to decode transactions
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
          instructions.push({
            programId: tx.message.accountKeys[ix.programIdIndex]?.toString() as string, // TODO(fabio): Fix me
            data: bs58.decode(ix.data),
          });
        }
      } else if (tx.message instanceof MessageV0) {
        for (var inst of tx.message.compiledInstructions) {
          instructions.push({
            programId: (tx.message.staticAccountKeys[inst.programIdIndex] as PublicKey).toString(), // TODO(fabio): Fix me
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
            decodedInstructions.push(decodedInstruction);
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

// Function to validate base58 string
function isValidBase58(str: string): boolean {
  const base58Regex = /^[A-HJ-NP-Za-km-z1-9]+$/;
  return base58Regex.test(str);
}

function isValidBase64(str: string): boolean {
  try {
    // Decode the string from Base64 and then re-encode it
    const base64Encoded = Buffer.from(str, "base64").toString("base64");

    // Check if the re-encoded string matches the original
    // This ensures that the input was valid Base64
    return str === base64Encoded;
  } catch (e) {
    // If an error occurs during decoding, the string was not valid Base64
    return false;
  }
}

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
