import { IdlItem, getProgramIdl } from "@solanafm/explorer-kit-idls";
import { getEnvironmentVariables } from "./helpers/loadEnvironmentVariables";
import {
  InstructionParserInterface,
  ParserType,
  SolanaFMParser,
  checkIfInstructionParser,
} from "@solanafm/explorer-kit";
import fs from "fs";
import axios from "axios";

const environment = getEnvironmentVariables();

const app = async () => {
  const instructionParser = await setupParser();
  const transactionResponse = await axios.post(environment.rpc_url, {
    jsonrpc: "2.0",
    id: 1,
    method: "getTransaction",
    params: [
      environment.transactionHash,
      {
        encoding: "jsonParsed",
        maxSupportedTransactionVersion: 0,
      },
    ],
  });

  if (!transactionResponse.data.result) {
    throw new Error("Transaction not found");
  }

  const transaction = transactionResponse.data.result;

  // Try to parse the program's instructions with ek parser
  const instructions = transaction.transaction.message.instructions;
  for (const instruction of instructions) {
    if (instruction.programId === environment.programHash) {
      const parsedInstruction = instructionParser.parseInstructions(
        instruction.data,
        instruction.accounts
      );
      console.log("Parsed instruction, ", parsedInstruction);
    }
  }

  // Try to parse the program's inner instructions with ek parser
  const innerInstructions = transaction.meta.innerInstructions;
  for (const innerInstruction of innerInstructions) {
    for (const innerObj of innerInstruction.instructions) {
      if (!innerObj.parsed && innerObj.programId === environment.programHash) {
        const parsedInnerInstruction = instructionParser.parseInstructions(
          innerInstruction.data,
          innerInstruction.accounts
        );
        console.log("Parsed inner instruction, ", parsedInnerInstruction);
      }
    }
  }
};

const setupParser = async () => {
  const idlItemFromLibrary = await getProgramIdl(environment.programHash);
  let instructionParser: InstructionParserInterface | undefined;
  if (idlItemFromLibrary === null) {
    instructionParser = setupParserFromLocalIdl();
    console.log("Successfully laoded parser from local idl file");
  } else {
    const parser = new SolanaFMParser(
      idlItemFromLibrary,
      environment.programHash
    );
    const registryParser = parser.createParser(ParserType.INSTRUCTION);
    if (registryParser && checkIfInstructionParser(registryParser)) {
      instructionParser = registryParser;
      console.log("Successfully loaded parser from registry");
    }
  }

  if (!instructionParser) {
    throw new Error("Failed to load parser");
  }
  return instructionParser;
};

const setupParserFromLocalIdl = () => {
  const jsonString = fs.readFileSync("./idl.json", "utf8");
  const idlFile = JSON.parse(jsonString);
  let idlType: "anchor" | "shank" | "kinobi" | string = "";
  if (!process.env.IDL_TYPE) {
    throw new Error("IDL_TYPE environment variable is not defined");
  }
  idlType = process.env.IDL_TYPE;
  if (idlType !== "anchor" && idlType !== "shank" && idlType !== "kinobi") {
    throw new Error(`IDL_TYPE ${idlType} is not valid`);
  }

  const idlItem: IdlItem = {
    programId: environment.programHash,
    idl: idlFile,
    idlType: idlType,
  };

  const parser = new SolanaFMParser(idlItem, environment.programHash);
  const instructionsParser = parser.createParser(ParserType.INSTRUCTION);
  if (instructionsParser && checkIfInstructionParser(instructionsParser)) {
    return instructionsParser;
  }
};

app();
