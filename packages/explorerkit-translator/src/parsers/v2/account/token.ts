import { Idl as ShankIdl } from "@solanafm/kinobi-lite";
import { convertBNToNumberInObject } from "@solanafm/utils";

import { mapDataTypeToName } from "../../../helpers/idl";
import { KinobiTreeGenerator } from "../../../helpers/KinobiTreeGenerator";
import { AccountParserInterface } from "../../../interfaces";
import { IdlItem } from "../../../types/IdlItem";
import { FMShankSerializer, KinobiTreeGeneratorType } from "../../../types/KinobiTreeGenerator";
import { ParserOutput, ParserType } from "../../../types/Parsers";

export const createShankTokenAccount: (idlItem: IdlItem) => AccountParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as ShankIdl;
  const accountLayouts = new KinobiTreeGenerator(idl).constructLayout(KinobiTreeGeneratorType.ACCOUNTS);
  // token account size to check with
  const ACCOUNT_MAX_SIZE = 165;
  // mint account size to check with
  const MINT_MAX_SIZE = 82;
  // multisig token account size to check with
  const MULTISIG_MAX_SIZE = 355;

  const parseAccount = (accountData: string, mapTypes?: boolean): ParserOutput => {
    try {
      const dataBuffer: Buffer = Buffer.from(accountData, "base64");
      let accountSerializer: FMShankSerializer | undefined = undefined;

      if (dataBuffer.byteLength < MINT_MAX_SIZE && dataBuffer.byteLength > MULTISIG_MAX_SIZE) {
        // account data is not within the range of the account we are trying to deserialize
        throw new Error(`Account data length is less than the minimum size required for this account`);
      }

      // checks if the account data length is within the length of the account we are trying to deserialize
      if (dataBuffer.byteLength < ACCOUNT_MAX_SIZE && dataBuffer.byteLength === MINT_MAX_SIZE) {
        // Mint Account has index 0 in the layout
        accountSerializer = accountLayouts.get(0);
      } else if (dataBuffer.byteLength < MULTISIG_MAX_SIZE && dataBuffer.byteLength === ACCOUNT_MAX_SIZE) {
        // Token Account has index 1 in the layout
        accountSerializer = accountLayouts.get(1);
      } else if (dataBuffer.byteLength > ACCOUNT_MAX_SIZE && dataBuffer.byteLength === MULTISIG_MAX_SIZE) {
        // Multisig Token Account has index 2 in the layout
        accountSerializer = accountLayouts.get(2);
        if (accountSerializer) {
          const decodedAccountData = accountSerializer.serializer?.deserialize(dataBuffer);

          if (decodedAccountData && decodedAccountData[0]) {
            decodedAccountData[0].signers = decodedAccountData[0].signers.filter(
              (signer: string) => signer !== "11111111111111111111111111111111"
            );

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
