import { BorshInstructionCoder, Idl as AnchorIdl } from "@coral-xyz/anchor";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { EventParserInterface, ParserOutput, ParserType } from "../../../..";
import { mapDataTypeToName } from "../../../../helpers/idl";
import { IdlItem } from "../../../../types/IdlItem";

export const createTCompEventParser: (idlItem: IdlItem) => EventParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as AnchorIdl;
  const instructionsLayout = new BorshInstructionCoder(idl);

  const parseEvents = (eventData: string, mapTypes?: boolean): ParserOutput => {
    try {
      if (instructionsLayout) {
        const dataBuffer = Buffer.from(eventData, "base64");
        const decodedEventData = instructionsLayout.decode(dataBuffer);

        if (decodedEventData) {
          const filteredIdlEvent = idl.events?.filter((event) => event.name === decodedEventData.name) ?? [];

          if (mapTypes) {
            decodedEventData.data = mapDataTypeToName(decodedEventData.data, filteredIdlEvent[0]?.fields);
          }

          decodedEventData.data = convertBNToNumberInObject(decodedEventData.data);

          return {
            name: decodedEventData.name,
            data: convertBNToNumberInObject(decodedEventData.data),
            type: ParserType.EVENT,
          };
        }
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    eventsLayout: instructionsLayout,
    parseEvents,
  };
};
