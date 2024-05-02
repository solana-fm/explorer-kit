import { Idl as AnchorIdl } from "@coral-xyz/anchor";
import { Idl as AnchorV1Idl } from "@coral-xyz/anchor-new";
import { Idl as ShankIdl } from "@solanafm/kinobi-lite";

import {
  AddressLookupTableIDL,
  AssociatedTokenIDL,
  AuthRulesIDL,
  BPFLoaderUpgradeableIDL,
  ClockIDL,
  ComputeBudget_134784000_IDL,
  ComputeBudgetIDL,
  ConfigIDL,
  EpochScheduleIDL,
  FeesIDL,
  NameServiceIDL,
  PhoenixKinobiTree,
  RecentBlockHashesIDL,
  RentIDL,
  RewardsIDL,
  SlotHashesIDL,
  StakeHistoryIDL,
  StakeIDL,
  StakePoolIDL,
  SystemIDL,
  Token2022_235377525_IDL,
  Token2022IDL,
  TokenIDL,
  VoteIDL,
} from "./shank";
import { MemoKinobiTree } from "./shank";
import {
  TokenMetadataV125IDL,
  TokenMetadataV130IDL,
  TokenMetadataV135IDL,
  TokenMetadataV160IDL,
  TokenMetadataV162IDL,
  TokenMetadataV170Beta2IDL,
  TokenMetadataV170IDL,
  TokenMetadataV1100IDL,
  TokenMetadataV1110IDL,
  TokenMetadataV1120IDL,
  TokenMetadataV1130IDL,
} from "./shank/others/token-metadata";

export type IdlTypes = ShankIdl | AnchorIdl | AnchorV1Idl | string;

/**
 * A map of program IDs to a map of slot numbers to IDL types.
 * The IDL types can be either ShankIdl, AnchorIdl, or string.
 * If the slot number is 0, then it means that this is the latest idl that the local repository has.
 * 0 should only be used when the IDLRepository only has 1 IDL for a given program.
 */
export const IdlRepository = new Map<string, Map<number, IdlTypes> | null>([
  ["11111111111111111111111111111111", new Map([[0, SystemIDL]])],
  ["Config1111111111111111111111111111111111111", new Map([[0, ConfigIDL]])],
  ["Stake11111111111111111111111111111111111111", new Map([[0, StakeIDL]])],
  ["Vote111111111111111111111111111111111111111", new Map([[0, VoteIDL]])],
  [
    "ComputeBudget111111111111111111111111111111",
    new Map([
      [134784001, ComputeBudgetIDL],
      [134784000, ComputeBudget_134784000_IDL],
    ]),
  ],
  ["BPFLoaderUpgradeab1e11111111111111111111111", new Map([[0, BPFLoaderUpgradeableIDL]])],
  ["TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA", new Map([[0, TokenIDL]])],
  [
    "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
    new Map([
      [220601744, Token2022IDL],
      [235377525, Token2022_235377525_IDL],
    ]),
  ],
  ["namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX", new Map([[0, NameServiceIDL]])],
  ["SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy", new Map([[0, StakePoolIDL]])],
  ["ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", new Map([[0, AssociatedTokenIDL]])],
  ["PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY", new Map([[0, PhoenixKinobiTree]])],
  [
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
    new Map([
      [121277711, TokenMetadataV125IDL],
      [132757495, TokenMetadataV130IDL],
      [148273286, TokenMetadataV135IDL],
      [153595949, TokenMetadataV160IDL],
      [161821544, TokenMetadataV162IDL],
      [174397839, TokenMetadataV170Beta2IDL],
      [175688231, TokenMetadataV170IDL],
      [188446980, TokenMetadataV1100IDL],
      [191949417, TokenMetadataV1110IDL],
      [196112106, TokenMetadataV1120IDL],
      [205969222, TokenMetadataV1130IDL],
    ]),
  ],
  ["auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg", new Map([[0, AuthRulesIDL]])],
  ["AddressLookupTab1e1111111111111111111111111", new Map([[0, AddressLookupTableIDL]])],
  ["SysvarC1ock11111111111111111111111111111111", new Map([[0, ClockIDL]])],
  ["SysvarEpochSchedu1e111111111111111111111111", new Map([[0, EpochScheduleIDL]])],
  ["SysvarFees111111111111111111111111111111111", new Map([[0, FeesIDL]])],
  ["SysvarRecentB1ockHashes11111111111111111111", new Map([[0, RecentBlockHashesIDL]])],
  ["SysvarRent111111111111111111111111111111111", new Map([[0, RentIDL]])],
  ["SysvarRewards111111111111111111111111111111", new Map([[0, RewardsIDL]])],
  ["SysvarS1otHashes111111111111111111111111111", new Map([[0, SlotHashesIDL]])],
  ["SysvarStakeHistory1111111111111111111111111", new Map([[0, StakeHistoryIDL]])],
  ["MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr", new Map([[0, MemoKinobiTree]])],
  ["Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo", new Map([[0, MemoKinobiTree]])],
]);

/**
 * Retrieves the local IDL for a given program ID and slot number from the IDL repository map.
 * If the program ID exists in the map, it returns the IDL for the specified slot number if provided,
 * or the latest IDL if no slot number is provided.
 * If the program ID does not exist in the map, it returns undefined.
 * @param {string} programId - The program ID for the IDL.
 * @param {number} [slot] - The slot number for the IDL.
 * @param {Map<string, Map<number, IdlTypes> | null>} [idlRepoMap=IdlRepository] - The IDL repository map to retrieve the IDL from.
 * @returns - An object containing the IDL and the slot number it was deployed at (if applicable).
 */
export const getLocalIdl = (
  programId: string,
  slot?: number,
  idlRepoMap?: Map<string, Map<number, IdlTypes> | null>
): {
  idl?: IdlTypes | null;
  slotDeployed?: number;
} => {
  const programIdlMap = idlRepoMap ? idlRepoMap.get(programId) : IdlRepository.get(programId);
  if (programIdlMap === null) {
    return {
      idl: null,
    };
  }

  if (programIdlMap !== undefined) {
    if (programIdlMap.size === 1) {
      const [firstKey] = programIdlMap.keys();

      if (firstKey) {
        return {
          idl: programIdlMap.get(firstKey),
          slotDeployed: firstKey,
        };
      } else {
        return {
          idl: programIdlMap.get(0),
          slotDeployed: 0,
        };
      }
    } else {
      if (slot) {
        const slots = Array.from(programIdlMap.keys());
        const closestSlot = slots.reduce((slotToCompareWith, currentSlot) => {
          if (slotToCompareWith <= slot && slot < currentSlot) {
            return slotToCompareWith;
          } else if (currentSlot >= slot) {
            return currentSlot;
          } else if (slotToCompareWith > currentSlot) {
            return slotToCompareWith;
          }

          return currentSlot;
        });

        return {
          idl: programIdlMap.get(closestSlot),
          slotDeployed: closestSlot,
        };
      } else {
        const latestSlot = Math.max(...Array.from(programIdlMap.keys()));
        return {
          idl: programIdlMap.get(latestSlot),
          slotDeployed: latestSlot,
        };
      }
    }
  }

  return {
    idl: undefined,
  };
};

/**
 * Adds an IDL to the given IDL repository map for the specified program ID and slot
 * If the program ID already exists in the map, the IDL is added to the existing nested idl map
 * If the program ID does not exist in the map, a new nested idl map is created with the IDL added to it
 * @param {Map<string, Map<number, IdlTypes>>} idlRepoMap - The IDL repository map to add the IDL to
 * @param {string} programId - The Program ID for the IDL
 * @param {IdlTypes} idl - The IDL to add to the repository
 * @param {number} [slot] - The slot number the IDL was generated at
 * @returns {Map<string, Map<number, IdlTypes> | null>} - The updated IDL repository map that can be used to store in memory
 */
export const addIdlToMap = (
  idlRepoMap: Map<string, Map<number, IdlTypes> | null>,
  programId: string,
  idl: IdlTypes,
  slot?: number
): Map<string, Map<number, IdlTypes> | null> => {
  // To avoid mutating the original IDL repository map, we create a copy of it
  const copiedIdlRepoMap = idlRepoMap.size == IdlRepository.size ? new Map(idlRepoMap) : idlRepoMap;
  const programIdlMap = copiedIdlRepoMap.get(programId);

  if (programIdlMap !== undefined && programIdlMap !== null) {
    programIdlMap.set(slot ?? 0, idl);
    copiedIdlRepoMap.set(programId, programIdlMap);
  } else {
    copiedIdlRepoMap.set(programId, new Map([[slot ?? 0, idl]]));
  }

  return copiedIdlRepoMap;
};
