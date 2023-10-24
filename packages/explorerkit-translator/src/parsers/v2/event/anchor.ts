import { Idl as AnchorIdl, BorshEventCoder } from "@coral-xyz/anchor";
import { convertBNToNumberInObject } from "@solanafm/utils";
import { EventParserInterface } from "../../../interfaces";
import { ParserOutput, ParserType } from "../../../types/Parsers";
import { mapDataTypeToName } from "../../../helpers/idl";
import { IdlItem } from "../../../types/IdlItem";

export const createAnchorEventParser: (idlItem: IdlItem) => EventParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as AnchorIdl;
  const eventsLayout = new BorshEventCoder(idl);

  const parseEvents = (eventData: string, mapTypes?: boolean): ParserOutput => {
    try {
      if (eventsLayout) {
        const decodedEventData = eventsLayout.decode(eventData);

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
    eventsLayout,
    parseEvents,
  };
};
