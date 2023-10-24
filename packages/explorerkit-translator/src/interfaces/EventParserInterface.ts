import { BorshEventCoder, BorshInstructionCoder } from "@coral-xyz/anchor";
import { createAnchorEventParser } from "../parsers/v2/event";
import { ParserOutput } from "../types/Parsers";
import { IdlItem } from "../types/IdlItem";
import { createPhoenixEventParser } from "../parsers/v2/event/shank/phoenix";
import { FMShankSerializer } from "../types/KinobiTreeGenerator";
import { createBubblegumEventParser } from "../parsers/v2/event/anchor/bubblegum";
import { createSPLCompEventParser } from "../parsers/v2/event/anchor/spl-compression";
import { createTCompEventParser } from "../parsers/v2/event/anchor/tcomp";

export type EventParsers = BorshInstructionCoder | BorshEventCoder | Map<number | string, FMShankSerializer>;

export interface EventParserInterface {
  eventsLayout: EventParsers;
  parseEvents(eventData: string, mapTypes?: boolean): ParserOutput;
}

export const createEventParser = (idlItem: IdlItem, programHash: string) => {
  switch (idlItem.idlType) {
    case "anchor":
      switch (programHash) {
        case "cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK":
          return createSPLCompEventParser(idlItem);

        case "BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY":
          return createBubblegumEventParser(idlItem);

        case "TCMPhJdwDryooaGtiocG1u3xcYbRpiJzb283XfCZsDp":
          return createTCompEventParser(idlItem);

        default:
          return createAnchorEventParser(idlItem);
      }

    case "kinobi":
      switch (programHash) {
        case "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY":
          return createPhoenixEventParser(idlItem);

        default:
          return null;
      }

    default:
      return null;
  }
};
