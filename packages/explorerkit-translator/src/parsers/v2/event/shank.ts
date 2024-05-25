import { Idl } from "@solanafm/kinobi-lite";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { EventParserInterface, ParserOutput, ParserType } from "../../..";
import { mapDataTypeToName } from "../../../helpers/idl";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { IdlItem } from "../../../types/IdlItem";
import { FMShankSerializer, KinobiTreeGeneratorType } from "../../../types/KinobiTreeGenerator";

export const createShankEventParser: (idlItem: IdlItem) => EventParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as Idl;
  const eventsLayout = new KinobiTreeGenerator(idl).constructLayout(KinobiTreeGeneratorType.EVENTS);

  const parseEvents = (eventData: string, mapTypes?: boolean): ParserOutput => {
    try {
      if (eventsLayout) {
        let dataBuffer: Buffer = Buffer.from(eventData, "base64");
        let eventSerializer: FMShankSerializer | undefined = undefined;
        if (dataBuffer.byteLength > 0) {
          // Let's assume all the events have enums as u8 for now, if we need to support other discriminants we will need to add them from Kinobi
          const borshDiscriminant = Buffer.from(dataBuffer).readUint8(0);
          eventSerializer = eventsLayout.get(borshDiscriminant);
        }

        if (eventSerializer) {
          const decodedEventData = eventSerializer.serializer?.deserialize(dataBuffer);

          if (decodedEventData && decodedEventData[0]) {
            const filteredIdlEvent =
              idl.events?.filter(
                (event) => event.name.toLowerCase() === eventSerializer.instructionName.toLowerCase()
              ) ?? [];

            if (mapTypes) {
              decodedEventData[0] = mapDataTypeToName(decodedEventData[0], filteredIdlEvent[0]?.fields);
            }

            decodedEventData[0] = convertBNToNumberInObject(decodedEventData[0]);

            return {
              name: eventSerializer.instructionName,
              data: convertBNToNumberInObject(decodedEventData[0]),
              type: ParserType.EVENT,
            };
          }
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
