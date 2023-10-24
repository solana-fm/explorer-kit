import { IdlDefinedType,IdlTypeDefinedLink } from "@solanafm/kinobi-lite";
import { capitalizeFirstLetter, convertBNToNumberInObject } from "@solanafm/utils";

import { mapDataTypeToName } from "../../../../helpers/idl";
import { KinobiTreeGenerator } from "../../../../helpers/KinobiTreeGenerator";
import { PhoenixIDL } from "../../../../idls/phoenix";
import { EventParserInterface } from "../../../../interfaces";
import { IdlItem } from "../../../../types/IdlItem";
import { KinobiTreeGeneratorType } from "../../../../types/KinobiTreeGenerator";
import { ParserOutput, ParserType } from "../../../../types/Parsers";

export const createPhoenixEventParser: (idlItem: IdlItem) => EventParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as string;
  const typesLayout = new KinobiTreeGenerator(
    {
      version: "",
      name: "",
      instructions: [],
      metadata: {
        address: "",
      },
    },
    KinobiTreeGeneratorType.TYPES,
    idl
  ).constructLayout(KinobiTreeGeneratorType.TYPES);

  const parseEvents = (eventData: string, mapTypes?: boolean): ParserOutput => {
    try {
      if (typesLayout) {
        const dataBuffer = Buffer.from(eventData, "base64");
        // Uses PhoenixMarketEvent struct to deserialize the header of the log event
        const phoenixEventDeserializer = typesLayout.get("PhoenixMarketEvent");
        const decodedShankData = phoenixEventDeserializer?.serializer?.deserialize(dataBuffer);

        if (decodedShankData) {
          // Get the total number of events in the event log, we will then use this to loop through the events
          const numberOfEvents = decodedShankData[0]["0"].totalEvents;
          let offset = decodedShankData[1] ?? 0;

          const phoenixEvent: UIPhoenixEvent = {
            header: decodedShankData[0],
            events: [],
          };

          if (dataBuffer.byteLength > offset && numberOfEvents > 0) {
            for (let index = 0; index < numberOfEvents; index++) {
              // We can use the struct to deserialize the rest of the events since we the log events are using the same struct as the enum
              const decodedEventData = phoenixEventDeserializer?.serializer?.deserialize(dataBuffer, offset);
              if (decodedEventData) {
                // Mutate the offset value to the next event
                offset = decodedEventData[1];
                phoenixEvent.events.push(decodedEventData[0]);
              }
            }
          }

          if (mapTypes) {
            const phoenixMarketEventTypes = PhoenixIDL.types?.find((type) => type.name === "PhoenixMarketEvent");
            const eventHeaderName = capitalizeFirstLetter(phoenixEvent.header["__kind"]);

            if (phoenixMarketEventTypes) {
              // Map the type for the header first.
              const fields = getPhoenixTypeFields(phoenixMarketEventTypes, eventHeaderName);
              // Rename the key "0" given from Umi Serializer to "eventData"
              phoenixEvent.header["eventData"] = mapDataTypeToName(phoenixEvent.header["0"], fields);
              delete phoenixEvent.header["0"];

              // Map the remaining events
              phoenixEvent.events.forEach((event) => {
                const innerEventHeaderName = capitalizeFirstLetter(event["__kind"]);
                const eventFields = getPhoenixTypeFields(phoenixMarketEventTypes, innerEventHeaderName);
                // Rename the key "0" given from Umi Serializer to "eventData"
                event["eventData"] = mapDataTypeToName(event["0"], eventFields);
                delete event["0"];
              });
            }
          }

          const convertedEvent = convertBNToNumberInObject(phoenixEvent);

          return {
            name: "PhoenixMarketEvent",
            data: convertedEvent,
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
    eventsLayout: typesLayout,
    parseEvents,
  };
};

type UIPhoenixEvent = {
  header: any;
  events: any[];
};

const getPhoenixTypeFields = (eventEnum: IdlDefinedType, eventHeaderName: string) => {
  if (eventEnum && eventEnum.type.kind === "enum") {
    // This is to find the type of the event header in PhoenixMarketEvent Idl Type
    // Something like
    // {
    //     name: "Header",
    //     fields: [
    //       {
    //         defined: "AuditLogHeader",
    //       },
    //     ],
    // },
    const eventHeaderType = eventEnum.type.variants.find((variant) => variant.name === eventHeaderName);
    if (eventHeaderType && eventHeaderType.fields && eventHeaderType.fields.length > 0 && eventHeaderType.fields[0]) {
      // Try to obtain the defined type of the event enum
      const filteredIdlType = PhoenixIDL.types?.find((type) => {
        return type.name === (eventHeaderType.fields![0] as IdlTypeDefinedLink).defined;
      });

      // Try to obtain the fields from the defined type struct
      if (filteredIdlType?.type && filteredIdlType.type.kind === "struct") {
        const filteredIdlTypeFields = filteredIdlType.type.fields;

        return filteredIdlTypeFields;
      }
    }
  }

  return [];
};
