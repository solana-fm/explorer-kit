import { bool, option, publicKey, u8 } from "@metaplex-foundation/umi-serializers";
import { Idl as ShankIdl } from "@solanafm/kinobi-lite";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { mapDataTypeToName } from "../../../helpers/idl";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { AccountParserInterface } from "../../../interfaces";
import { AccParserSerializationType } from "../../../types/BaseAccountTypes";
import { FMShankSerializer, KinobiTreeGeneratorType, ShankSerializer } from "../../../types/KinobiTreeGenerator";
import { ParserOutput, ParserType } from "../../../types/Parsers";
import { IdlItem } from "../../../types/IdlItem";

export const createShankMetaplexAccountParser: (
  idlItem: IdlItem,
  serializationType?: AccParserSerializationType
) => AccountParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as ShankIdl;
  const accountLayouts = new KinobiTreeGenerator(idl).constructLayout(KinobiTreeGeneratorType.ACCOUNTS);

  const parseAccount = (accountData: string, mapTypes?: boolean): ParserOutput => {
    try {
      let dataBuffer: Buffer = Buffer.from(accountData, "base64");

      if (dataBuffer.byteLength > 0) {
        const borshDiscriminant = Buffer.from(dataBuffer).readUint8(0);
        const accountSerializer: FMShankSerializer | undefined = accountLayouts.get(borshDiscriminant);

        // If account is a metadata account, run through a special deserializer to check for corrupted metadata account
        if (accountSerializer && borshDiscriminant === 4) {
          let sanitisedMetaAccount = sanitySerializeMetadataAccount(dataBuffer, accountSerializer, idl);

          if (sanitisedMetaAccount && Object.keys(sanitisedMetaAccount).length > 0) {
            const filteredIdlAccount = (idl.accounts ?? [])[3];

            if (mapTypes) {
              sanitisedMetaAccount = mapDataTypeToName(sanitisedMetaAccount, filteredIdlAccount?.type.fields);
            }

            return {
              name: accountSerializer.instructionName,
              data: convertBNToNumberInObject(sanitisedMetaAccount),
              type: ParserType.ACCOUNT,
            };
          }
        }

        if (accountSerializer) {
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

// Source: https://github.com/metaplex-foundation/metaplex-program-library/blob/master/token-metadata/js/src/custom/metadata-deserializer.ts
// Most of the code is copied from the source above but uses Kinobi Layout to custom deserialize the account struct
const sanitySerializeMetadataAccount = (
  accountDataBuffer: Buffer,
  accountSerializer: FMShankSerializer,
  idl: ShankIdl
) => {
  try {
    // Tries to Deserialize the account
    const decodedAccountData = accountSerializer.serializer?.deserialize(accountDataBuffer);

    if (decodedAccountData && decodedAccountData[0]) {
      return decodedAccountData[0];
    }

    return null;
  } catch (error) {
    if (error) {
      const typeLayouts = new KinobiTreeGenerator(idl).constructLayout(KinobiTreeGeneratorType.TYPES);

      // Initialize all the serializer for each specific type
      const keySerializer = typeLayouts.get("Key")?.serializer;
      const dataSerializer = typeLayouts.get("Data")?.serializer;
      const tokenStandardSerializer = typeLayouts.get("TokenStandard")?.serializer;
      const collectionSerializer = typeLayouts.get("Collection")?.serializer;
      const usesSerializer = typeLayouts.get("Uses")?.serializer;
      const collectionDetailsSerializer = typeLayouts.get("CollectionDetails")?.serializer;
      const programmableConfigSerializer = typeLayouts.get("ProgrammableConfig")?.serializer;

      if (
        keySerializer &&
        dataSerializer &&
        tokenStandardSerializer &&
        collectionSerializer &&
        usesSerializer &&
        collectionDetailsSerializer &&
        programmableConfigSerializer
      ) {
        let cursor = 0;
        let customStruct: { [typeName: string]: any } = {};

        // Slowly Deserialize the account till editionNonce
        // key
        const [key, _] = keySerializer.deserialize(accountDataBuffer, cursor);
        cursor += keySerializer.maxSize ?? 1;
        customStruct[typeLayouts.get("Key")!.instructionName] = key;

        // updateAuthority
        const [updateAuthority] = publicKey().deserialize(accountDataBuffer, cursor);
        cursor += 32;
        customStruct["updateAuthority"] = updateAuthority;

        // mint
        const [mint] = publicKey().deserialize(accountDataBuffer, cursor);
        cursor += 32;
        customStruct["mint"] = mint;

        // data
        // dataDelta is the final offset of the data so we have to minus to get the proper bytes read from buffer
        const [data, dataDelta] = dataSerializer.deserialize(accountDataBuffer, cursor);
        cursor += dataDelta - cursor;
        customStruct[typeLayouts.get("Data")!.instructionName] = data;

        // primarySaleHappened
        const [primarySaleHappened] = bool().deserialize(accountDataBuffer, cursor);
        cursor += 1;
        customStruct["primarySaleHappened"] = primarySaleHappened;

        // isMutable
        const [isMutable] = bool().deserialize(accountDataBuffer, cursor);
        cursor += 1;
        customStruct["isMutable"] = isMutable;

        // editionNonce
        const [editionNonce, editionNonceDelta] = option(u8()).deserialize(accountDataBuffer, cursor);
        cursor += editionNonceDelta - cursor;
        customStruct["editionNonce"] = editionNonce;

        // -----------------
        // Possibly corrupted section
        // -----------------

        // NOTE: that we avoid trying to deserialize any subsequent fields if a
        // previous one was found to be corrupted just to save work

        // tokenStandard
        const [tokenStandard, tokenDelta, tokenCorrupted] = tryReadType(
          tokenStandardSerializer,
          accountDataBuffer,
          cursor
        );
        cursor += tokenDelta;
        customStruct[typeLayouts.get("TokenStandard")!.instructionName] = tokenStandard;

        // collection
        const [collection, collectionDelta, collectionCorrupted] = tokenCorrupted
          ? [null, 1, true]
          : tryReadType(collectionSerializer, accountDataBuffer, cursor);
        cursor += collectionDelta;
        customStruct[typeLayouts.get("Collection")!.instructionName] = collection;

        // uses
        const [uses, usesDelta, usesCorrupted] =
          tokenCorrupted || collectionCorrupted
            ? [null, 1, true]
            : tryReadType(usesSerializer, accountDataBuffer, cursor);
        cursor += usesDelta;
        customStruct[typeLayouts.get("Uses")!.instructionName] = uses;

        // collection_details
        const [collectionDetails, collectionDetailsDelta] =
          tokenCorrupted || collectionCorrupted || usesCorrupted
            ? [null, 1, true]
            : tryReadType(collectionDetailsSerializer, accountDataBuffer, cursor);
        cursor += collectionDetailsDelta;
        customStruct[typeLayouts.get("CollectionDetails")!.instructionName] = collectionDetails;

        // programmable_config
        const [programmableConfig, programmableConfigDelta] =
          tokenCorrupted || collectionCorrupted || usesCorrupted
            ? [null, 1, true]
            : tryReadType(programmableConfigSerializer, accountDataBuffer, cursor);
        cursor += programmableConfigDelta;
        customStruct[typeLayouts.get("ProgrammableConfig")!.instructionName] = programmableConfig;

        return customStruct;
      }
    }

    return null;
  }
};

function tryReadType(
  serializer: ShankSerializer,
  accountBuffer: Buffer,
  offset: number
): [any | null, number, boolean] {
  try {
    if (serializer) {
      const [parsedData, parsedDataDelta] = option(serializer).deserialize(accountBuffer, offset);
      return [parsedData, parsedDataDelta - offset, false];
    }
    return [null, 1, true];
  } catch (e) {
    return [null, 1, true];
  }
}
