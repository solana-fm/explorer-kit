import { Idl as ShankIdl } from "@solanafm/kinobi-lite";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { mapDataTypeToName } from "../../../helpers/idl";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { AccountParserInterface } from "../../../interfaces";
import { AccParserSerializationType } from "../../../types/BaseAccountTypes";
import { IdlItem } from "../../../types/IdlItem";
import { FMShankSerializer, KinobiTreeGeneratorType } from "../../../types/KinobiTreeGenerator";
import { ParserOutput, ParserType } from "../../../types/Parsers";

export const createShankAccountParser: (
  idlItem: IdlItem,
  serializationType?: AccParserSerializationType
) => AccountParserInterface = (idlItem: IdlItem, serializationType?: AccParserSerializationType) => {
  const idl = idlItem.idl as ShankIdl;
  const accountSerializationType = serializationType ?? AccParserSerializationType.BORSH;
  const accountLayouts = new KinobiTreeGenerator(idl).constructLayout(KinobiTreeGeneratorType.ACCOUNTS);

  const parseAccount = (accountData: string, mapTypes?: boolean): ParserOutput => {
    try {
      let dataBuffer: Buffer = Buffer.from(accountData, "base64");
      let accountSerializer: FMShankSerializer | undefined = undefined;
      if (dataBuffer.byteLength > 0) {
        switch (accountSerializationType) {
          case AccParserSerializationType.BINCODE:
            // bincode all has enums as u32 from what I have gathered so we will take discriminant as u32 until
            // we support discriminant referencing in kinobi
            const bincodeDiscriminant = Buffer.from(dataBuffer).readUint32LE(0);
            dataBuffer = dataBuffer.subarray(4);
            accountSerializer = accountLayouts.get(bincodeDiscriminant);
            break;

          case AccParserSerializationType.BORSH:
            // bincode all has enums as u32 from what I have gathered so we will take discriminant as u32 until
            // we support discriminant referencing in kinobi
            const borshDiscriminant = Buffer.from(dataBuffer).readUint8(0);
            // !Don't slice buffer for borsh for now since we are only using metadata programs as a poc and they have the enums located in the account data
            // dataBuffer = dataBuffer.subarray(1);
            accountSerializer = accountLayouts.get(borshDiscriminant);
            break;

          case AccParserSerializationType.SYSVAR:
            accountSerializer = accountLayouts.get(0);
            break;
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
