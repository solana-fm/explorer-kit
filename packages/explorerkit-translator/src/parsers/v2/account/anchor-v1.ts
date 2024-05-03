import { BorshAccountsCoder, Idl as AnchorIdl } from "@coral-xyz/anchor-new";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { mapNewAnchorDataTypeToName } from "../../../helpers/idl";
import { AccountParserInterface } from "../../../interfaces";
import { IdlItem } from "../../../types/IdlItem";
import { ParserOutput, ParserType } from "../../../types/Parsers";

export const createAnchorV1AccountParser: (idlItem: IdlItem) => AccountParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as AnchorIdl;
  const accountLayouts = new BorshAccountsCoder(idl);

  const parseAccount = (accountData: string, maptypes?: boolean): ParserOutput => {
    const bufferData = Buffer.from(accountData, "base64");
    const accountDiscriminator = bufferData.subarray(0, 8);
    const accountName = Array.from(idl.accounts ?? []).find((key) =>
      accountLayouts.accountDiscriminator(key.name).equals(accountDiscriminator)
    );

    let decodedAccountData = accountLayouts.decodeAny(bufferData);

    if (decodedAccountData) {
      const filteredIdlType = idl.types?.filter((type) => type.name === accountName?.name) ?? [];

      if (maptypes) {
        if (filteredIdlType[0]?.type.kind === "struct" && filteredIdlType[0]?.type.fields)
          decodedAccountData = mapNewAnchorDataTypeToName(decodedAccountData, filteredIdlType[0]?.type.fields);
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
    return idl.metadata.name;
  };

  return {
    accountLayouts,
    parseAccount,
    getProgramName,
  };
};
