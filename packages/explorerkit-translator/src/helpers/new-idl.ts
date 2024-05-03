import { IdlInstructionAccountItem, isIdlAccounts } from "../types/NewAnchorTypes";
import { DataWithMappedType } from "./idl";

export const extractIdlIxAccountName: (IdlAccount?: IdlInstructionAccountItem) => string | string[] | undefined = (
  idlAccount
) => {
  if (idlAccount) {
    if (isIdlAccounts(idlAccount)) {
      const idlIxAccounts: string[] = [];

      idlAccount.accounts.forEach((account) => {
        let extractedName = extractIdlIxAccountName(account);
        if (extractedName) {
          if (Array.isArray(extractedName)) {
            extractedName = extractIdlIxAccountName(account);
          } else {
            idlIxAccounts.push(idlAccount.name + "." + extractedName);
          }
        }
      });

      return idlIxAccounts;
    } else {
      return idlAccount.name;
    }
  }

  return undefined;
};

export const mapNewAnchorAccountKeysToName = (
  accountKeys?: string[],
  idlIxAccounts?: IdlInstructionAccountItem[],
  mapTypes?: boolean
): {
  [name: string]: string | DataWithMappedType;
} => {
  if (idlIxAccounts && accountKeys) {
    const names: (string | string[])[] = [];

    idlIxAccounts.forEach((idlIxAccount) => {
      names.push(extractIdlIxAccountName(idlIxAccount) ?? "Unknown");
    });

    const flattenedArray = names.flat(5);
    let translatedAccountKeysObj: {
      [name: string]: string;
    } = {};

    accountKeys.forEach((accountKey, index) => {
      const objectKey = flattenedArray[index] ?? ("Unknown" as string);
      const object: {
        [name: string]: string | DataWithMappedType;
      } = {
        [objectKey]: mapTypes ? { data: accountKey, type: "publicKey" } : accountKey,
      };

      translatedAccountKeysObj = Object.assign(translatedAccountKeysObj, object);
    });

    return translatedAccountKeysObj;
  }

  return {};
};
