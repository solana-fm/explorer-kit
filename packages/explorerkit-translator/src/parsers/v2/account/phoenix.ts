import { convertBNToNumberInObject } from "@solanafm/utils";
import { KinobiTreeGeneratorType } from "../../../types/KinobiTreeGenerator";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { AccountParserInterface } from "../../../interfaces";
import { ParserOutput, ParserType } from "../../../types/Parsers";
import { mapDataTypeToName } from "../../../helpers/idl";
import { IdlItem } from "../../../types/IdlItem";
import { PhoenixIDL } from "../../../idls/phoenix";

export const createShankPhoenixAccount: (idlItem: IdlItem) => AccountParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as string;
  const accountLayouts = new KinobiTreeGenerator(
    {
      version: "",
      name: "",
      instructions: [],
      metadata: {
        address: "",
      },
    },
    KinobiTreeGeneratorType.ACCOUNTS,
    idl
  ).constructLayout(KinobiTreeGeneratorType.ACCOUNTS);

  const parseAccount = (accountData: string, mapTypes?: boolean): ParserOutput => {
    try {
      const dataBuffer: Buffer = Buffer.from(accountData, "base64");
      const discriminant = dataBuffer.subarray(0, 8).toString("base64");

      const accountSerializer = accountLayouts.get(discriminant);

      if (accountSerializer && dataBuffer.byteLength > 0) {
        const decodedAccountData = accountSerializer.serializer?.deserialize(dataBuffer);

        if (decodedAccountData && decodedAccountData[0]) {
          const filteredIdlAccount =
            PhoenixIDL.accounts?.filter(
              (account) => account.name.toLowerCase() === accountSerializer?.instructionName.toLowerCase()
            ) ?? [];

          if (mapTypes) {
            decodedAccountData[0] = mapDataTypeToName(decodedAccountData[0], filteredIdlAccount[0]?.type.fields);
          }

          return {
            name: accountSerializer.instructionName,
            data: convertBNToNumberInObject(decodedAccountData[0]),
            type: ParserType.ACCOUNT,
          };
        }
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getProgramName = () => {
    return "phoenix";
  };

  return {
    accountLayouts,
    parseAccount,
    getProgramName,
  };
};
