import { IdlItem, getProgramIdl } from "@solanafm/explorer-kit-idls";
import { convertLogsToEventsMap } from "./helpers/eventParser";
import { getEnvironmentVariables } from "./helpers/loadEnvironmentVariables";
import fs from "fs";
import { EventParserInterface, Parser, ParserType, SolanaFMParser, checkIfEventParser } from "@solanafm/explorer-kit";
import axios from "axios";

const environment = getEnvironmentVariables();

const app = async () => {
  const parser = await setupParser();

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

  const logs: string[] = transaction.meta.logMessages;
  const eventMap = convertLogsToEventsMap(logs);
  const parsedEvents: { [key: string]: any[] } = {};

  for (const [prorgamId, eventMapLogs] of eventMap.entries()) {
    if (prorgamId !== environment.programHash) {
      continue;
    }

    try {
      const events = [];
      for (const log of eventMapLogs) {
        const decodedEvent = parser.parseEvents(log);
        events.push(decodedEvent);
      }

      parsedEvents[prorgamId] = events;
    } catch (err) {
      console.log("Parser extraction error, due to: ", err);
    }
  }

  console.log("Parsed events: ", parsedEvents);
};

const setupParser = async () => {
  const idlItemFromLibrary = await getProgramIdl(environment.programHash);
  let eventParser: EventParserInterface | undefined;
  if (idlItemFromLibrary === null) {
    eventParser = setupParserFromLocalIdl();
    console.log("Successfully loaded parser from local idl file");
  } else {
    const parser = new SolanaFMParser(idlItemFromLibrary, environment.programHash);
    const registryParser = parser.createParser(ParserType.EVENT);
    if (registryParser && checkIfEventParser(registryParser)) {
      eventParser = registryParser;
      console.log("Successfully loaded parser from registry");
    }
  }
  if (!eventParser) {
    throw new Error("Failed to load parser");
  }
  return eventParser;
};

const setupParserFromLocalIdl = () => {
  const jsonString = fs.readFileSync("./idl.json", "utf8");
  const idlFile = JSON.parse(jsonString);
  let idlType: "anchor" | "shank" | "kinobi" | string = "";
  if (!process.env.IDL_TYPE) {
    throw new Error("IDL_TYPE environment variable is not set");
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
  const eventsParser = parser.createParser(ParserType.EVENT);
  if (eventsParser && checkIfEventParser(eventsParser)) {
    return eventsParser;
  }
};

app();
