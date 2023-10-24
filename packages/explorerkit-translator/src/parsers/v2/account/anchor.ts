import { BorshAccountsCoder, Idl as AnchorIdl } from "@coral-xyz/anchor";
import { AccountParserInterface } from "../../../interfaces";
import { ParserOutput, ParserType } from "../../../types/Parsers";
import { convertBNToNumberInObject } from "@solanafm/utils";
import { mapDataTypeToName } from "../../../helpers/idl";
import { IdlItem } from "../../../types/IdlItem";

export const createAnchorAccountParser: (idlItem: IdlItem) => AccountParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as AnchorIdl;
  const accountLayouts = new BorshAccountsCoder(idl);

  const parseAccount = (accountData: string, maptypes?: boolean): ParserOutput => {
    const bufferData = Buffer.from(accountData, "base64");
    const accountDiscriminator = bufferData.subarray(0, 8);
    const accountName = Array.from(idl.accounts ?? []).find((key) =>
      BorshAccountsCoder.accountDiscriminator(key.name).equals(accountDiscriminator)
    );
    let decodedAccountData = accountLayouts.decodeAny(bufferData);

    if (decodedAccountData) {
      const filteredIdlAccount = idl.accounts?.filter((account) => account.name === accountName?.name) ?? [];

      if (maptypes) {
        decodedAccountData = mapDataTypeToName(decodedAccountData, filteredIdlAccount[0]?.type.fields);
      }

      return {
        name: accountName?.name as string,
        data: convertBNToNumberInObject(decodedAccountData),
        type: ParserType.ACCOUNT,
      };
    }

    return null;
  };

  const getProgramName = (): string => {
    return idl.name;
  };

  return {
    accountLayouts,
    parseAccount,
    getProgramName,
  };
};
