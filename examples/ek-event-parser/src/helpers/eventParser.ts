import {
  PROGRAM_DATA,
  PROGRAM_DATA_START_INDEX,
  PROGRAM_LOG,
  PROGRAM_LOG_START_INDEX,
} from "../constants/programLogsConstant";
import { LogContextStack } from "../models/logContextStack";
import { LogExtractor } from "../models/logExtractor";

export function* parseLogs(
  logs: string[],
  errorOnDecodeFailed: boolean = false
) {
  const logsExtractor = new LogExtractor(logs);
  const logsContextStack = new LogContextStack();

  let log = logsExtractor.next();
  while (log !== null) {
    let [event, programHash, popped] = identifyLog(
      logsContextStack,
      log,
      errorOnDecodeFailed
    );

    if (event) {
      yield {
        event: event,
        programHash: logsContextStack.getProgram(),
      };
    }
    if (programHash) {
      logsContextStack.push(programHash);
    }
    if (popped) {
      logsContextStack.pop();
    }

    log = logsExtractor.next();
  }
}

const identifyLog = (
  context: LogContextStack,
  log: string,
  errorOnDecodeFailed: boolean
): [string | null, string | null, boolean] => {
  if (context.stack.length > 0) {
    return extractProgramLog(log, errorOnDecodeFailed);
  } else {
    return [null, ...extractSystemLog(log)];
  }
};

const extractProgramLog = (
  log: string,
  errorOnDecodeFailed: boolean
): [string | null, string | null, boolean] => {
  if (log.startsWith(PROGRAM_LOG) || log.startsWith(PROGRAM_DATA)) {
    const logStr = log.startsWith(PROGRAM_LOG)
      ? log.slice(PROGRAM_LOG_START_INDEX)
      : log.slice(PROGRAM_DATA_START_INDEX);
    const event = logStr;

    if (errorOnDecodeFailed && event === null) {
      throw new Error(`Unable to decode log ${logStr}`);
    }
    return [event, null, false];
  } else {
    return [null, ...extractSystemLog(log)];
  }
};

const extractSystemLog = (log: string): [string | null, boolean] => {
  const logStart = log.split(":")[0];
  if (logStart) {
    const cpiInvokationPattern = new RegExp("Program (.+?) invoke");
    const cpiMatch = logStart.match(cpiInvokationPattern);

    if (logStart.match(/^Program (.*) success/g) !== null) {
      return [null, true];
    } else if (cpiMatch) {
      if (cpiMatch[1]) {
        return [cpiMatch[1], false];
      }
      return [null, false];
    } else {
      return [null, false];
    }
  }

  return [null, false];
};

export const convertLogsToEventsMap = (logs: string[]) => {
  const eventMap = new Map<string, string[]>();
  for (const event of parseLogs(logs)) {
    // Regex String checker to only get base64 strings
    const base64RegexCheck = new RegExp(
      "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$"
    );

    if (base64RegexCheck.test(event.event)) {
      if (eventMap.has(event.programHash)) {
        eventMap.get(event.programHash)?.push(event.event);
      } else {
        eventMap.set(event.programHash, [event.event]);
      }
    }
  }

  return eventMap;
};
