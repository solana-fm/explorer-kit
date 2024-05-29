import { Idl } from "@solanafm/kinobi-lite";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { extractIdlIxAccountName, IdlAccountName, mapDataTypeToName } from "../../../../helpers/idl";
import { KinobiTreeGenerator } from "../../../../helpers/KinobiTreeGenerator";
import { DataWithMappedType, mapMultisigAccountKeysToName } from "../../../../helpers/multisig-checker";
import { ExtensionTypes } from "../token-v2";

/**
 * Serializes Token 2022 Transfer Fee Extension
 *
 * @param {Idl} extensionIDL - The IDL of the transfer fee extension
 * @param {Uint8Array} dataBuffer - The data buffer containing the extension instruction data.
 * @param {boolean} [mapTypes=false] - Whether to map the data types to their names.
 * @param {string[]} [accountKeys=[]] - The account keys associated with the instruction.
 * @returns {ExtensionTypes | null} The serialized transfer fee extension instruction data.
 */
export const serializeTransferFeeExt = (
  extensionIDL: Idl,
  dataBuffer: Uint8Array,
  mapTypes?: boolean,
  accountKeys?: IdlAccountName[]
): ExtensionTypes | null => {
  const extensionSerializerLayout = new KinobiTreeGenerator(extensionIDL).constructLayout();
  const extensionIxDiscriminant = Buffer.from(dataBuffer).readUint8(1);
  const extensionSerializer = extensionSerializerLayout.get(extensionIxDiscriminant);

  // This is to slice the initial discriminant from the parent token instruction data
  const dataToSerialize = dataBuffer.slice(1);

  if (extensionSerializer) {
    const decodedShankData = extensionSerializer.serializer?.deserialize(dataToSerialize);

    if (decodedShankData && decodedShankData[0]) {
      const filteredIdlInstruction = extensionIDL.instructions?.filter(
        (instruction) => instruction.discriminant?.value === extensionIxDiscriminant
      );

      if (mapTypes) {
        decodedShankData[0] = mapDataTypeToName(
          decodedShankData[0],
          filteredIdlInstruction[0]?.args,
          filteredIdlInstruction[0]?.discriminant
        );
      }

      if (filteredIdlInstruction.length > 0) {
        const instructionAccounts = filteredIdlInstruction[0]?.accounts;
        let mappedAccountKeys: DataWithMappedType;
        switch (extensionIxDiscriminant) {
          //   Source: https://github.com/solana-labs/solana-program-library/commit/54938423994e7f4acfb7d7eacfef965a4409214b
          //   Enum 3 is WithdrawWithheldTokensFromAccounts with the following account structure:
          //   M has to be given to the function to account for the number of items in the double array
          /// Accounts expected by this instruction:
          ///
          ///   * Single owner/delegate
          ///   0. `[]` The token mint. Must include the `TransferFeeConfig` extension.
          ///   1. `[writable]` The fee receiver account. Must include the `TransferFeeAmount`
          ///      extension and be associated with the provided mint.
          ///   2. `[signer]` The mint's `withdraw_withheld_authority`.
          ///   3. ..3+N `[writable]` The source accounts to withdraw from.
          ///
          ///   * Multisignature owner/delegate
          ///   0. `[]` The token mint.
          ///   1. `[writable]` The destination account.
          ///   2. `[]` The mint's multisig `withdraw_withheld_authority`.
          ///   3. ..3+M `[signer]` M signer accounts.
          ///   3+M+1. ..3+M+N `[writable]` The source accounts to withdraw from.
          case 3:
            if (accountKeys && accountKeys.length > 3 && instructionAccounts) {
              const numberOfTokenAccounts = decodedShankData[0].numTokenAccounts.data;
              const [tokenMint, destination, authority] = [accountKeys[0], accountKeys[1], accountKeys[2]];
              const sources = accountKeys.splice(-1 * numberOfTokenAccounts);
              const names: (IdlAccountName | IdlAccountName[])[] = [];
              let signers: IdlAccountName[] = [];

              //   So if account keys still has more than 3 keys, this means that there's more than
              //   1 signers since token account sources has been spliced
              if (accountKeys.length > 3) {
                signers = accountKeys.splice(3);
              }

              // Populate the names array with the account names
              instructionAccounts.forEach((idlIxAccount) => {
                names.push(extractIdlIxAccountName(idlIxAccount) ?? { name: "Unknown" });
              });

              // Flatten the names array and create an empty object to store the translated account keys
              // This is flatten due to the fact that there's a possibility of nested arrays such as Zeta Program
              const flattenNames = names.flat(5);
              let toCopy: DataWithMappedType = {
                [flattenNames[0]?.name as string]: { data: tokenMint ?? accountKeys[0]!, type: "publicKey" },
                [flattenNames[1]?.name as string]: { data: destination ?? accountKeys[1]!, type: "publicKey" },
                [flattenNames[2]?.name as string]: { data: authority ?? accountKeys[2]!, type: "publicKey" },
              };

              signers.forEach((signerAccountKey, index) => {
                const object: DataWithMappedType = {
                  [`signer` + (index + 1)]: { data: signerAccountKey, type: "publicKey" },
                };

                toCopy = Object.assign(toCopy, object);
              });
              sources.forEach((sourceAccountKey, index) => {
                const object: DataWithMappedType = {
                  [`sourceAccount` + (index + 1)]: { data: sourceAccountKey, type: "publicKey" },
                };

                toCopy = Object.assign(toCopy, object);
              });

              mappedAccountKeys = toCopy;
            } else {
              mappedAccountKeys = mapMultisigAccountKeysToName(accountKeys, instructionAccounts);
            }
            break;

          case 4:
            mappedAccountKeys = mapMultisigAccountKeysToName(accountKeys, instructionAccounts, "source");
            break;

          default:
            mappedAccountKeys = mapMultisigAccountKeysToName(accountKeys, instructionAccounts);
            break;
        }

        return {
          extensionInstructionName: extensionSerializer.instructionName,
          extensionInstructionData: { ...convertBNToNumberInObject(decodedShankData[0]), ...mappedAccountKeys },
        };
      }

      return {
        extensionInstructionName: extensionSerializer.instructionName,
        extensionInstructionData: convertBNToNumberInObject(decodedShankData[0]),
      };
    }
  }

  return null;
};
