import { IdlItem, getProgramIdl } from "@solanafm/explorer-kit-idls";
import { convertLogsToEventsMap } from "./helpers/eventParser";
import { getEnvironmentVariables } from "./helpers/loadEnvironmentVariables";
import fs from "fs";
import {
  EventParserInterface,
  Parser,
  ParserType,
  SolanaFMParser,
  checkIfEventParser,
} from "@solanafm/explorer-kit";

const environment = getEnvironmentVariables();

const app = async () => {
  const logs: string[] = [
    "Program ComputeBudget111111111111111111111111111111 invoke [1]",
    "Program ComputeBudget111111111111111111111111111111 success",
    "Program JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB invoke [1]",
    "Program log: Instruction: Route",
    "Program whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc invoke [2]",
    "Program log: Instruction: Swap",
    "Program log: fee_growth: 1093994082951",
    "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
    "Program log: Instruction: Transfer",
    "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 1339463 compute units",
    "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
    "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
    "Program log: Instruction: Transfer",
    "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4736 of 1331898 compute units",
    "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
    "Program whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc consumed 55954 of 1379575 compute units",
    "Program whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc success",
    "Program data: UWzjvs3QCsQOA2hfjpCQU+RYEhxm9adq7cdwaqEcgviqlSqPK3h5qcb6evO+2606PWXzaqvJdDGxu+TC0vbg5HymAgNFL11hQEIPAAAAAAAGm4hX/quBhPtof2NGGMA12sQ53BrrO1WYoPAAAAAAARgu5AEAAAAA",
    "Program whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc invoke [2]",
    "Program log: Instruction: Swap",
    "Program log: fee_growth: 94074010856",
    "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
    "Program log: Instruction: Transfer",
    "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4736 of 1267773 compute units",
    "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
    "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
    "Program log: Instruction: Transfer",
    "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 1260120 compute units",
    "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
    "Program whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc consumed 54865 of 1306828 compute units",
    "Program whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc success",
    "Program data: UWzjvs3QCsQOA2hfjpCQU+RYEhxm9adq7cdwaqEcgviqlSqPK3h5qQabiFf+q4GE+2h/Y0YYwDXaxDncGus7VZig8AAAAAABGC7kAQAAAADG+nrzvtutOj1l82qryXQxsbvkwtL24OR8pgIDRS9dYfRFDwAAAAAA",
    "Program JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB consumed 150851 of 1400000 compute units",
    "Program JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB success",
  ];
  const eventMap = convertLogsToEventsMap(logs);
  const parser = await setupParser();
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
    const parser = new SolanaFMParser(
      idlItemFromLibrary,
      environment.programHash
    );
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
