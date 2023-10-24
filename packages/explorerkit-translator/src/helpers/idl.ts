import {
  IdlInstructionAccount,
  IdlInstructionArg,
  IdlInstructionDiscriminant,
  IdlType as ShankIdlType,
  IdlTypeStructField,
} from "@solanafm/kinobi-lite";

import { IdlAccountItem, IdlField, IdlType as AnchorIdlType, isIdlAccounts } from "../types/AnchorTypes";

export type DataWithMappedType = {
  type: ShankIdlType | AnchorIdlType;
  data: any;
};

export const isDataWithMappedType = (data: any): data is DataWithMappedType => {
  return data.type && data.data;
};

export const mapAccountKeysToName = (
  accountKeys?: string[],
  idlIxAccounts?: IdlAccountItem[] | IdlInstructionAccount[],
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

export const mapAccountKeysToNameV2 = (
  accountKeys?: string[],
  idlIxAccounts?: IdlAccountItem[] | IdlInstructionAccount[],
  mapTypes?: boolean
): {
  [name: string]: string | DataWithMappedType | (string | DataWithMappedType)[];
} => {
  if (!idlIxAccounts || !accountKeys) return {};

  const names: string[] = idlIxAccounts
    .map((idlIxAccount) => extractIdlIxAccountName(idlIxAccount) ?? "Unknown")
    .flat();
  let translatedAccountKeysObj: {
    [name: string]: string | DataWithMappedType | (string | DataWithMappedType)[];
  } = {};

  accountKeys.forEach((accountKey, index) => {
    const objectKey = names[index] ?? "Unknown";
    const newEntry = mapTypes ? ({ data: accountKey, type: "publicKey" } as DataWithMappedType) : accountKey;

    // If objectKey already exists, we append the new accountKey to the existing array or object
    if (objectKey in translatedAccountKeysObj) {
      const existingEntry = translatedAccountKeysObj[objectKey];

      if (Array.isArray(existingEntry)) {
        (existingEntry as (string | DataWithMappedType)[]).push(newEntry);
      } else {
        translatedAccountKeysObj[objectKey] = [existingEntry ?? "", newEntry];
      }
    }
    // If the objectKey doesn't exist in translatedAccountKeysObj, we just assign it like before
    else {
      translatedAccountKeysObj[objectKey] = newEntry;
    }
  });

  return translatedAccountKeysObj;
};

export const extractIdlIxAccountName: (IdlAccount?: IdlAccountItem) => string | string[] | undefined = (idlAccount) => {
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

export const mapDataTypeToName = (
  data: Record<string, any>,
  idlFields?: (IdlField | IdlInstructionArg | IdlTypeStructField)[],
  shankDiscriminant?: IdlInstructionDiscriminant
) => {
  const dataKeys = Object.keys(data);
  const mappedDataType: Record<string, DataWithMappedType> = {};
  dataKeys.forEach((keyName) => {
    // TODO: Still need to map the individual types to a "string"
    // TODO: Key names have to be standarized with camel case since I did not standarize the field naming in the IDL
    // TODO: All will be camel case like authorityAddress etc etc.
    if (idlFields && idlFields.length > 0) {
      const filteredIdlField = idlFields?.find((idlField) => idlField.name === keyName);
      if (filteredIdlField) {
        // defined type mapper
        // TODO: Finish Defined Type Mapper in the future xD
        // if (typeof filteredIdlField === "object") {
        //   // Since we already know filteredIdlField is a object type, we can safely cast it to Omit<IdlType, IdlTypeLeaf>
        //   const idlType: Omit<IdlType, IdlTypeLeaf> = filteredIdlField.type as Omit<IdlType, IdlTypeLeaf>;
        //   if ("defined" in idlType && idlTypes && idlTypes.length > 0) {
        //     const idlDefinedType = idlTypes.find((type) => type.name === idlType.defined);
        //   }
        // }
        mappedDataType[keyName] = {
          type: filteredIdlField.type as AnchorIdlType | ShankIdlType,
          data: data[keyName],
        };
      } else if (shankDiscriminant) {
        mappedDataType[keyName] = {
          type: shankDiscriminant.type as ShankIdlType,
          data: data[keyName],
        };
      } else {
        mappedDataType[keyName] = {
          data: data[keyName],
          type: "Unknown Type" as AnchorIdlType | ShankIdlType,
        };
      }
    }
  });

  return Object.keys(mappedDataType).length > 0 ? mappedDataType : data;
};
