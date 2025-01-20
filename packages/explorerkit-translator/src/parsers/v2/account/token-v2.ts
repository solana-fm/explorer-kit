import { array } from "@metaplex-foundation/umi-serializers";
import { Idl as ShankIdl } from "@solanafm/kinobi-lite";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { mapDataTypeToName } from "../../../helpers/idl";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { tryToSerializeCOptionPubkey } from "../../../helpers/rust-option";
import { AccountParserInterface } from "../../../interfaces";
import { AccParserSerializationType } from "../../../types/BaseAccountTypes";
import { IdlItem } from "../../../types/IdlItem";
import { FMShankSerializer, KinobiTreeGeneratorType } from "../../../types/KinobiTreeGenerator";
import { ParserOutput, ParserType } from "../../../types/Parsers";

export const createShankTokenV2Account: (idlItem: IdlItem) => AccountParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as ShankIdl;
  const accountLayouts = new KinobiTreeGenerator(idl).constructLayout(KinobiTreeGeneratorType.ACCOUNTS);
  const typesLayouts = new KinobiTreeGenerator(idl).constructLayout(KinobiTreeGeneratorType.TYPES);

  const MINT_MAX_SIZE = 82;

  // NEW: In Token 2022 Program, they will be padding Mint Accounts to a size of 165. So extensions are usually after the 165th byte (offset 165).
  // We can use COption as a way to check if the account is a Token Account or a Mint Account.
  // token account size to check with
  const ACCOUNT_MAX_SIZE = 165;
  // multisig token account size to check with
  const MULTISIG_MAX_SIZE = 355;

  const parseAccount = (accountData: string, mapTypes: boolean): ParserOutput => {
    try {
      const dataBuffer: Buffer = Buffer.from(accountData, "base64");
      let accountSerializer: FMShankSerializer | undefined = undefined;

      // Default Account Serialization without Extensions
      // checks if the account data length is within the length of the account we are trying to deserialize
      if (dataBuffer.byteLength < ACCOUNT_MAX_SIZE && dataBuffer.byteLength === MINT_MAX_SIZE) {
        // Mint Account has index 0 in the layout
        accountSerializer = accountLayouts.get(0);
        if (accountSerializer) {
          const parsedAccountData = parseAccountWithoutExtensions(accountSerializer, dataBuffer, idl, mapTypes);
          return {
            name: accountSerializer.instructionName,
            data: convertBNToNumberInObject(parsedAccountData),
            type: ParserType.ACCOUNT,
          };
        }
      } else if (dataBuffer.byteLength < MULTISIG_MAX_SIZE && dataBuffer.byteLength === ACCOUNT_MAX_SIZE) {
        // Token Account has index 1 in the layout
        accountSerializer = accountLayouts.get(1);
        if (accountSerializer) {
          const parsedAccountData = parseAccountWithoutExtensions(accountSerializer, dataBuffer, idl, mapTypes);
          return {
            name: accountSerializer.instructionName,
            data: convertBNToNumberInObject(parsedAccountData),
            type: ParserType.ACCOUNT,
          };
        }
      }

      if (dataBuffer.byteLength > ACCOUNT_MAX_SIZE && dataBuffer.byteLength === MULTISIG_MAX_SIZE) {
        // Multisig Token Account has index 2 in the layout
        accountSerializer = accountLayouts.get(2);

        if (accountSerializer) {
          const parsedAccountData = parseAccountWithoutExtensions(accountSerializer, dataBuffer, idl, mapTypes);
          // To filter out all the empty accounts
          parsedAccountData.signers = parsedAccountData.signers.filter(
            (signer: string) => signer !== "11111111111111111111111111111111"
          );
          return {
            name: accountSerializer.instructionName,
            data: convertBNToNumberInObject(parsedAccountData),
            type: ParserType.ACCOUNT,
          };
        }
      }
      // If the byte length is 165, we can try serializing it as a mint or token account
      // TODO: There can also be instances where if there's no extensions that's created, the byte length will default back to the original sizes
      // If byte length is equal the MultiSig Max Size, we will assume it's a multisig account. As of 240723, there's no extensions support for multisig accounts
      else if (dataBuffer.byteLength >= ACCOUNT_MAX_SIZE) {
        // Checks if it's a Mint Account
        // If it's not a mint account, we can assume it's a Token Account (ATA)
        // We will only check the fields that's suppose to be COption<Pubkey> to try to differentiate between the two accounts
        // I would think MintAccount is more strict when it comes to checking so we will use MintAccount as the base check
        let isMintAccount = false;

        // Checks if the data buffer is a Mint Account or not
        try {
          // Why 36 is because COption takes up 4 bytes and Pubkey takes up 32 bytes
          const hasMintAuthorityCOption = tryToSerializeCOptionPubkey(
            dataBuffer.subarray(0, 36),
            AccParserSerializationType.BORSH
          );

          const hasFreezeAuthorityCOption = tryToSerializeCOptionPubkey(
            dataBuffer.subarray(46, 82),
            AccParserSerializationType.BORSH
          );

          if (hasMintAuthorityCOption && hasFreezeAuthorityCOption) {
            isMintAccount = true;
          }
        } catch (_) {}

        // Starts the serialization for Mint Account
        if (isMintAccount) {
          // Mint Account has index 1 in the layout
          accountSerializer = accountLayouts.get(0);

          if (accountSerializer) {
            const decodedAccountData = accountSerializer.serializer?.deserialize(dataBuffer);

            // Checks if it's a mint account
            if (decodedAccountData && decodedAccountData[1] === MINT_MAX_SIZE) {
              // Offset is always 165 as extensions start after the 165th byte
              const { accountType, extensions } = parseExtensions(dataBuffer, typesLayouts);

              const combinedAccountData = {
                ...decodedAccountData[0],
                extensions: extensions,
                accountType: accountType,
              };

              return {
                name: accountSerializer.instructionName,
                data: convertBNToNumberInObject(combinedAccountData),
                type: ParserType.ACCOUNT,
              };
            }
          }
        } else {
          // Starts serialization for Token Account
          // Token Account has index 0 in the layout
          accountSerializer = accountLayouts.get(1);
          if (accountSerializer) {
            const decodedAccountData = accountSerializer.serializer?.deserialize(dataBuffer);

            // Checks if it's a token account
            if (decodedAccountData && decodedAccountData[1] === ACCOUNT_MAX_SIZE) {
              const { accountType, extensions } = parseExtensions(dataBuffer, typesLayouts);

              const combinedAccountData = {
                ...decodedAccountData[0],
                extensions: extensions,
                accountType: accountType,
              };

              return {
                name: accountSerializer.instructionName,
                data: convertBNToNumberInObject(combinedAccountData),
                type: ParserType.ACCOUNT,
              };
            }
          }
        }
      }

      return null;
    } catch (error) {
      throw new Error(`Error parsing account data - ${accountData}`, {
        cause: {
          decoderError: error,
          programId: idlItem.programId,
        },
      });
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

/**
 * Parses extensions data from a buffer and returns an object containing the extensions and account type.
 * @param {Buffer} dataBuffer - The buffer containing the extensions data.
 * @param {Map<string | number, FMShankSerializer>} typesLayouts - A map of types and their corresponding serializers.
 * @returns {{extensions: any[], accountType: any}} - An object containing the extensions and account type.
 */
// TODO: Have to add support for mapping the types for the extensions
export const parseExtensions = (
  dataBuffer: Buffer,
  typesLayouts: Map<string | number, FMShankSerializer>
): { extensions?: any[]; accountType?: any } => {
  const extensionsDataBuffer = dataBuffer.subarray(165);
  const extensionAccountTypeSerializer = typesLayouts.get("AccountType");
  const extensionTypeSerializer = typesLayouts.get("ExtensionTypeWithFields");

  let extensions;
  let accountType;

  // Try to calculate the TLV Array Length
  let numberOfExtensions = 0;
  // Offset to move to the next extension
  let offset = 1;
  // Calculate how many extensions are present in the "array" with the TLV (Type Length Value) Format
  while (offset < extensionsDataBuffer.subarray(1).byteLength) {
    const extensionBuffer = extensionsDataBuffer.subarray(offset);
    const extensionLength = extensionBuffer.readUint16LE(2);
    offset = offset + 2 + 2 + extensionLength;
    numberOfExtensions++;
  }

  // Try to serialize the account type
  if (extensionAccountTypeSerializer && extensionAccountTypeSerializer.serializer) {
    const decodedAccountType = extensionAccountTypeSerializer.serializer.deserialize(extensionsDataBuffer);
    accountType = decodedAccountType[0];
  }

  // Try to serialize the extensions array
  if (extensionTypeSerializer && extensionTypeSerializer.serializer) {
    const extensionSerializerArray = array(extensionTypeSerializer.serializer, {
      size: numberOfExtensions,
    });
    const decodedExtensionData = extensionSerializerArray.deserialize(extensionsDataBuffer.subarray(1));
    extensions = decodedExtensionData[0];
  }

  return {
    extensions,
    accountType,
  };
};

export const parseAccountWithoutExtensions = (
  accountSerializer: FMShankSerializer | undefined,
  dataBuffer: Buffer,
  idl: ShankIdl,
  mapTypes?: boolean
) => {
  if (accountSerializer) {
    try {
      const decodedAccountData = accountSerializer.serializer?.deserialize(dataBuffer);

      if (decodedAccountData && decodedAccountData[0]) {
        const filteredIdlAccount =
          idl.accounts?.filter(
            (account) => account.name.toLowerCase() === accountSerializer?.instructionName.toLowerCase()
          ) ?? [];

        if (mapTypes) {
          decodedAccountData[0] = mapDataTypeToName(decodedAccountData[0], filteredIdlAccount[0]?.type.fields);
        }

        return decodedAccountData[0];
      }
    } catch (error) {
      throw new Error(`Error parsing account data - ${dataBuffer.toString("base64")}`, {
        cause: {
          decoderError: error,
          programId: idl.metadata.address ?? "",
        },
      });
    }
  }

  return null;
};
