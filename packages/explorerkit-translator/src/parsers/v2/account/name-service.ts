import { Idl as ShankIdl } from "@solanafm/kinobi-lite";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { FMShankSerializer, KinobiTreeGeneratorType } from "../../../types/KinobiTreeGenerator";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { AccountParserInterface } from "../../../interfaces";
import { ParserOutput, ParserType } from "../../../types/Parsers";
import { mapDataTypeToName } from "../../../helpers/idl";
import { IdlItem } from "../../../types/IdlItem";

export const createShankNameServiceAccount: (idlItem: IdlItem) => AccountParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as ShankIdl;
  const accountLayouts = new KinobiTreeGenerator(idl).constructLayout(KinobiTreeGeneratorType.ACCOUNTS);
  // account size to check with
  const ACCOUNT_MIN_SIZE = 96;

  const parseAccount = (accountData: string, mapTypes?: boolean): ParserOutput => {
    try {
      const dataBuffer: Buffer = Buffer.from(accountData, "base64");
      let accountSerializer: FMShankSerializer | undefined = undefined;
      console.log(dataBuffer.byteLength);
      if (dataBuffer.byteLength < ACCOUNT_MIN_SIZE) {
        // account data is not within the range of the account we are trying to deserialize
        return null;
      }

      // TODO: PLEASE ABSTRACT THIS IN THE FUTURE!!!!
      // checks if the account data length is within the length of the account we are trying to deserialize
      if (dataBuffer.byteLength >= ACCOUNT_MIN_SIZE) {
        // Mint Account has index 1 in the layout
        accountSerializer = accountLayouts.get(0);
      }

      if (accountSerializer && dataBuffer.length > 0) {
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
    return idl.name;
  };

  return {
    accountLayouts,
    parseAccount,
    getProgramName,
  };
};
