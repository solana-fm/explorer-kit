import {
  IdlInstructionAccount,
  IdlInstructionArg,
  IdlInstructionDiscriminant,
  IdlType as ShankIdlType,
  IdlTypeStructField,
} from "@solanafm/kinobi-lite";

import { IdlAccountItem, IdlField, IdlType as AnchorIdlType, isIdlAccounts } from "../types/AnchorTypes";
import { checkIfIdlDefinedFieldsNamed, IdlDefinedFields, IdlType as AnchorV1IdlType } from "../types/NewAnchorTypes";

export type DataWithMappedType = {
  type: ShankIdlType | AnchorIdlType | AnchorV1IdlType;
  data: any;
};

export type IdlAccountName = {
  name: string;
  optional?: boolean;
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
    const names: (IdlAccountName | IdlAccountName[])[] = [];

    idlIxAccounts.forEach((idlIxAccount) => {
      names.push(
        extractIdlIxAccountName(idlIxAccount) ?? {
          name: "Unknown",
        }
      );
    });
    const flattenedArray = names.flat(5);
    let nonOptionalAccountKeys = 0;
    let optionalAccountKeys = 0;

    flattenedArray.forEach((accountKey) => {
      if (accountKey.optional) optionalAccountKeys++;
      else nonOptionalAccountKeys++;
    });

    let optionalKeyCounter = 1;

    let translatedAccountKeysObj: {
      [name: string]: string;
    } = {};

    accountKeys.forEach((accountKey, index) => {
      const objectKey = flattenedArray[index] ?? {
        name: "Unknown",
      };

      // If the account is optional, we will check if the accountKeys length is more than the idlIxAccounts length without optional accounts
      if (objectKey.optional) {
        optionalKeyCounter++;
        // If the optional key counter is more than the optional account keys, we will return and not add the name
        if (optionalKeyCounter > optionalAccountKeys) return;
        if (accountKeys.length > nonOptionalAccountKeys + optionalKeyCounter) return;
      }

      const object: {
        [name: string]: string | DataWithMappedType;
      } = {
        [objectKey.name]: mapTypes ? { data: accountKey, type: "publicKey" } : accountKey,
      };

      translatedAccountKeysObj = Object.assign(translatedAccountKeysObj, object);
    });

    return translatedAccountKeysObj;
  }

  return {};
};

export const extractIdlIxAccountName: (IdlAccount?: IdlAccountItem) => IdlAccountName | IdlAccountName[] | undefined = (
  idlAccount
) => {
  if (idlAccount) {
    if (isIdlAccounts(idlAccount)) {
      const idlIxAccounts: IdlAccountName[] = [];

      idlAccount.accounts.forEach((account) => {
        let extractedName = extractIdlIxAccountName(account);
        if (extractedName) {
          if (Array.isArray(extractedName)) {
            extractedName = extractIdlIxAccountName(account);
          } else {
            idlIxAccounts.push({
              name: idlAccount.name + "." + extractedName.name,
              optional: extractedName.optional,
            });
          }
        }
      });

      return idlIxAccounts;
    } else {
      return {
        name: idlAccount.name,
        optional: idlAccount.isOptional,
      };
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

export const mapNewAnchorDataTypeToName = (data: Record<string, any>, idlFields?: IdlDefinedFields) => {
  const dataKeys = Object.keys(data);
  const mappedDataType: Record<string, DataWithMappedType> = {};
  dataKeys.forEach((keyName) => {
    // TODO: Still need to map the individual types to a "string"
    // TODO: Key names have to be standarized with camel case since I did not standarize the field naming in the IDL
    // TODO: All will be camel case like authorityAddress etc etc.
    if (idlFields && idlFields.length > 0) {
      if (checkIfIdlDefinedFieldsNamed(idlFields)) {
        const filteredIdlField = idlFields.find((idlField) => idlField.name === keyName);
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
            type: filteredIdlField.type as AnchorV1IdlType,
            data: data[keyName],
          };
        } else {
          mappedDataType[keyName] = {
            data: data[keyName],
            type: "Unknown Type" as AnchorV1IdlType,
          };
        }
      }
    }
  });

  return Object.keys(mappedDataType).length > 0 ? mappedDataType : data;
};
