import { Idl as ShankIdl } from "@solanafm/kinobi-lite";
import { convertBNToNumberInObject } from "@solanafm/utils";
import { FMShankSerializer, KinobiTreeGeneratorType } from "../../../types/KinobiTreeGenerator";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { AccountParserInterface } from "../../../interfaces";
import { ParserOutput, ParserType } from "../../../types/Parsers";
import { mapDataTypeToName } from "../../../helpers/idl";
import { IdlItem } from "../../../types/IdlItem";

export const createShankConfigAccount: (idlItem: IdlItem, accountHash: string) => AccountParserInterface = (
  idlItem: IdlItem,
  accountHash: string
) => {
  const idl = idlItem.idl as ShankIdl;
  const accountLayouts = new KinobiTreeGenerator(idl).constructLayout(KinobiTreeGeneratorType.ACCOUNTS);

  const parseAccount = (accountData: string, mapTypes?: boolean): ParserOutput => {
    try {
      const dataBuffer: Buffer = Buffer.from(accountData, "base64");

      let accountSerializer: FMShankSerializer | undefined = undefined;

      if (accountHash === "StakeConfig11111111111111111111111111111111") {
        accountSerializer = accountLayouts.get(0);
      } else {
        accountSerializer = accountLayouts.get(1);
      }

      if (accountSerializer && dataBuffer.byteLength > 0) {
        const decodedAccountData = accountSerializer.serializer?.deserialize(dataBuffer);

        if (decodedAccountData && decodedAccountData[0]) {
          const filteredIdlAccount =
            idl.accounts?.filter(
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
    return "config";
  };

  return {
    accountLayouts,
    parseAccount,
    getProgramName,
  };
};
