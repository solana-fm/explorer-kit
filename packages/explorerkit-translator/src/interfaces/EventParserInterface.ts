import { BorshEventCoder, BorshInstructionCoder } from "@coral-xyz/anchor";

import { createAnchorEventParser, createShankEventParser } from "../parsers/v2/event";
import { createBubblegumEventParser } from "../parsers/v2/event/anchor/bubblegum";
import { createSPLCompEventParser } from "../parsers/v2/event/anchor/spl-compression";
import { createTCompEventParser } from "../parsers/v2/event/anchor/tcomp";
import { createPhoenixEventParser } from "../parsers/v2/event/shank/phoenix";
import { IdlItem } from "../types/IdlItem";
import { FMShankSerializer } from "../types/KinobiTreeGenerator";
import { ParserOutput } from "../types/Parsers";

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

    case "shank":
      switch (programHash) {
        default:
          return createShankEventParser(idlItem);
      }

    default:
      return null;
  }
};
