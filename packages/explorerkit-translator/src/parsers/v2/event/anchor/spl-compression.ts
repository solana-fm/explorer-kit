import { convertBNToNumberInObject } from "@solanafm/utils";
import { EventParserInterface } from "../../../../interfaces";
import { ParserOutput, ParserType } from "../../../../types/Parsers";
import { mapDataTypeToName } from "../../../../helpers/idl";
import { IdlItem } from "../../../../types/IdlItem";
import { KinobiTreeGenerator } from "../../../../helpers/KinobiTreeGenerator";
import { KinobiTreeGeneratorType } from "../../../../types/KinobiTreeGenerator";
import { CompressionEventIdl } from "../../../../idls/spl-compression";

// This is because bubblegum programs are wrapping application_data to a spl-compression no-op program
export const createSPLCompEventParser: (_: IdlItem) => EventParserInterface = (_: IdlItem) => {
  const compressionTypesLayout = new KinobiTreeGenerator(
    CompressionEventIdl,
    KinobiTreeGeneratorType.TYPES
  ).constructLayout(KinobiTreeGeneratorType.TYPES);

  const parseEvents = (eventData: string, mapTypes?: boolean): ParserOutput => {
    const dataBuffer = Buffer.from(eventData, "base64");
    try {
      if (compressionTypesLayout) {
        const splCompEventStructSerializer = compressionTypesLayout.get("AccountCompressionEvent");
        const decodedSplCompData = splCompEventStructSerializer?.serializer?.deserialize(dataBuffer);

        if (decodedSplCompData) {
          if (mapTypes) {
            const compressionFields = CompressionEventIdl.types?.find(
              (type) => type.name === "AccountCompressionEvent"
            );

            if (compressionFields && compressionFields.type.kind === "struct") {
              // Defined Type Mapping is not supported ATM
              // Especially for the recursive enum types and etc ...
              decodedSplCompData[0] = mapDataTypeToName(decodedSplCompData[0], compressionFields.type.fields);
            }
          }

          return {
            data: convertBNToNumberInObject(decodedSplCompData[0]),
            name: "AccountCompressionEvent",
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
    eventsLayout: compressionTypesLayout,
    parseEvents,
  };
};
