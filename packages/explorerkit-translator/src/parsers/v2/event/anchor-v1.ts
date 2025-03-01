import { BorshEventCoder, Idl as AnchorIdl } from "@coral-xyz/anchor-new";
import { IdlTypeDefTyStruct } from "@coral-xyz/anchor-new/dist/cjs/idl";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { mapNewAnchorDataTypeToName } from "../../../helpers/idl";
import { EventParserInterface } from "../../../interfaces";
import { IdlItem } from "../../../types/IdlItem";
import { ParserOutput, ParserType } from "../../../types/Parsers";

export const createAnchorV1EventParser: (idlItem: IdlItem) => EventParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as AnchorIdl;
  const eventsLayout = new BorshEventCoder(idl);

  const parseEvents = (eventData: string, mapTypes?: boolean): ParserOutput => {
    try {
      if (eventsLayout) {
        const decodedEventData = eventsLayout.decode(eventData);

        if (decodedEventData) {
          const filteredIdlEvent = idl.events?.filter((event) => event.name === decodedEventData.name) ?? [];

          if (mapTypes) {
            if (filteredIdlEvent && filteredIdlEvent[0]) {
              const eventName = filteredIdlEvent[0].name;
              const dataFields = (idl.types?.filter((type) => type.name === eventName)[0]?.type as IdlTypeDefTyStruct)
                .fields;
              decodedEventData.data = mapNewAnchorDataTypeToName(decodedEventData.data, dataFields);
            }
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
      throw new Error(`Error parsing event data - ${eventData}`, {
        cause: {
          decoderError: error,
          programId: idlItem.programId,
        },
      });
    }
  };

  return {
    eventsLayout,
    parseEvents,
  };
};
