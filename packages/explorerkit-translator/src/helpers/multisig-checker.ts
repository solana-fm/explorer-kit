import { IdlInstructionAccount, IdlType } from "@solanafm/kinobi-lite";

import { extractIdlIxAccountName, IdlAccountName } from "./idl";

export type DataWithMappedType = {
  [name: string]: {
    type: IdlType;
    data: any;
  };
};

/**
 * Maps the given account keys to their corresponding names based on the provided IdlInstructionAccount array.
 * If the account is a multisig account, it will also map the multisig account keys to their corresponding names.
 * @param accountKeys - An array of account keys to map to their corresponding names.
 * @param idlIxAccounts - An array of IdlInstructionAccount objects that contain the names of the accounts to map to.
 * @param accountName - An optional name for the "multiple account names".
 * @returns An object containing the mapped account keys and their corresponding names.
 */
export const mapMultisigAccountKeysToName = (
  accountKeys?: IdlAccountName[],
  idlIxAccounts?: IdlInstructionAccount[],
  accountName?: string
): DataWithMappedType => {
  if (idlIxAccounts && accountKeys) {
    const names: (IdlAccountName | IdlAccountName[])[] = [];

    // Populate the names array with the account names
    idlIxAccounts.forEach((idlIxAccount) => {
      names.push(
        extractIdlIxAccountName(idlIxAccount) ?? {
          name: "Unknown",
        }
      );
    });

    // Flatten the names array and create an empty object to store the translated account keys
    // This is flatten due to the fact that there's a possibility of nested arrays such as Zeta Program
    const flattenNames = names.flat(5);
    let translatedAccountKeysObj: DataWithMappedType = {};

    // This is most probably a "probable" multisig account keys mapper, so we will account for both scenarios
    // This means that there's no multisig and it's most probably a Single owner/delegate scenario
    if (flattenNames.length === accountKeys.length) {
      accountKeys.forEach((accountKey, index) => {
        const objectKey = flattenNames[index] ?? {
          name: "Unknown",
        };
        const object: DataWithMappedType = {
          [objectKey.name]: { data: accountKey, type: "publicKey" },
        };

        translatedAccountKeysObj = Object.assign(translatedAccountKeysObj, object);
      });

      return translatedAccountKeysObj;
    }
    // This means that there's a multisig account and we need to account for the multisig account keys
    // An example on how the multisig account keys are structured can be found here:
    ///   * Multisignature owner/delegate
    ///   0. `[writable]` The token mint.
    ///   1. `[writable]` The destination account.
    ///   2. `[]` The mint's multisig `withdraw_withheld_authority`.
    ///   3. ..3+M `[signer]` M signer accounts.
    else {
      const signers = accountKeys.splice(names.length - 1);
      accountKeys.forEach((accountKey, index) => {
        const objectKey = flattenNames[index] ?? { name: "Unknown" };
        const object: DataWithMappedType = {
          [objectKey.name]: { data: accountKey, type: "publicKey" },
        };

        translatedAccountKeysObj = Object.assign(translatedAccountKeysObj, object);
      });

      signers.forEach((signerAccountKey, index) => {
        const object: DataWithMappedType = {
          [(accountName ?? `signer`) + (index + 1)]: { data: signerAccountKey, type: "publicKey" },
        };

        translatedAccountKeysObj = Object.assign(translatedAccountKeysObj, object);
      });

      return translatedAccountKeysObj;
    }
  }

  return {};
};
