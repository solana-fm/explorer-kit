import { convertBNToNumberInObject } from "@solanafm/utils";

import { mapDataTypeToName } from "../../../../helpers/idl";
import { KinobiTreeGenerator } from "../../../../helpers/KinobiTreeGenerator";
import { BubblegumEventIdl } from "../../../../idls/bubblegum";
import { CompressionEventIdl } from "../../../../idls/spl-compression";
import { EventParserInterface } from "../../../../interfaces";
import { IdlItem } from "../../../../types/IdlItem";
import { KinobiTreeGeneratorType } from "../../../../types/KinobiTreeGenerator";
import { ParserOutput, ParserType } from "../../../../types/Parsers";

// This is because bubblegum programs are wrapping application_data to a spl-compression no-op program
export const createBubblegumEventParser: (_: IdlItem) => EventParserInterface = (_: IdlItem) => {
  const bubblegumTypesLayout = new KinobiTreeGenerator(
    BubblegumEventIdl,
    KinobiTreeGeneratorType.TYPES
  ).constructLayout(KinobiTreeGeneratorType.TYPES);
  const compressionTypesLayout = new KinobiTreeGenerator(
    CompressionEventIdl,
    KinobiTreeGeneratorType.TYPES
  ).constructLayout(KinobiTreeGeneratorType.TYPES);

  const parseEvents = (eventData: string, mapTypes?: boolean): ParserOutput => {
    const dataBuffer = Buffer.from(eventData, "base64");
    try {
      if (bubblegumTypesLayout && compressionTypesLayout) {
        const splCompEventStructSerializer = compressionTypesLayout.get("AccountCompressionEvent");
        const bGumEventStructSerializer = bubblegumTypesLayout.get("BubblegumEvent");

        // We will serialize the "wrapper" of SPL Account Compression first as Bubblegum is using SPL Compression
        // to wrap and compress the "application data"
        const decodedSplCompData = splCompEventStructSerializer?.serializer?.deserialize(dataBuffer);
        if (decodedSplCompData) {
          const offset = decodedSplCompData[1];
          const applicationDataLen = decodedSplCompData[0][0][0].applicationDataLen;

          // Check if databuffer after offset has the same bytelength as the serialized vec length due to Vec<u8>
          if (dataBuffer.byteLength - offset === applicationDataLen) {
            const decodedBGumData = bGumEventStructSerializer?.serializer?.deserialize(dataBuffer, offset);
            if (decodedBGumData) {
              const bgumEvent: UIBubblegumEvent = {
                splCompressionEvent: decodedSplCompData[0],
                compressionEvent: decodedBGumData[0],
              };

              if (mapTypes) {
                const bGumFields = BubblegumEventIdl.types?.find((type) => type.name === "BubblegumEvent");
                const compressionFields = CompressionEventIdl.types?.find(
                  (type) => type.name === "AccountCompressionEvent"
                );

                if (compressionFields && compressionFields.type.kind === "struct") {
                  // Defined Type Mapping is not supported ATM
                  // Especially for the recursive enum types and etc ...
                  bgumEvent.splCompressionEvent = mapDataTypeToName(
                    bgumEvent.splCompressionEvent,
                    compressionFields.type.fields
                  );
                }

                if (bGumFields && bGumFields.type.kind === "struct") {
                  // Defined Type Mapping is not supported ATM
                  // Especially for the recursive enum types and etc ...
                  bgumEvent.compressionEvent = mapDataTypeToName(bgumEvent.compressionEvent, bGumFields.type.fields);
                }
              }

              const convertedEvent = convertBNToNumberInObject(bgumEvent);
              return {
                name: "BubblegumEvent",
                data: convertedEvent,
                type: ParserType.EVENT,
              };
            }
          }
        }
      }

      return null;
    } catch (error) {
      throw new Error(`Error parsing event data - ${eventData}`, {
        cause: {
          decoderError: error,
        },
      });
    }
  };

  return {
    eventsLayout: compressionTypesLayout,
    parseEvents,
  };
};

type UIBubblegumEvent = {
  splCompressionEvent: any;
  compressionEvent: any;
};
