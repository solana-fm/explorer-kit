import { Idl as AnchorIdl } from "@coral-xyz/anchor";
import { Idl as ShankIdl } from "@solanafm/kinobi-lite";

import { CHAIN_ID } from "../constants";
import { checkForIdlPatches } from "../idls-patcher";
import { createProgramIdlInstance, createProgramIdlInstanceOptions, IdlRepoResponse } from "../instances/ProgramIDL";
import { getLocalIdl, IdlTypes } from "./LocalIdlRepository";

export interface IdlItem {
  programId: string;
  idl: AnchorIdl | ShankIdl | string;
  idlType: "anchor" | "shank" | "kinobi";
  idlSlotVersion?: number;
  chainId?: CHAIN_ID;
}

export type FetchProgramIdlOptions = {
  slotContext?: number;
  chainId?: CHAIN_ID;
} & createProgramIdlInstanceOptions;

/**
 * Checks if the given IDL is an Anchor IDL.
 * @param {AnchorIdl | ShankIdl | string} idl - The IDL to check.
 * @returns {idl is AnchorIdl} - True if the IDL is an Anchor IDL, false otherwise.
 */
export const checkIdlIsAnchor = (idl: AnchorIdl | ShankIdl | string): idl is AnchorIdl => {
  const anchorIdl = idl as AnchorIdl;

  if (anchorIdl.metadata !== undefined && anchorIdl.metadata.origin === "shank") return false;

  if (anchorIdl.instructions !== undefined) {
    return anchorIdl.instructions.every((instruction: any) => {
      if ("discriminant" in instruction) {
        return false;
      }

      return true;
    });
  }

  return false;
};

/**
 * Checks if the given IDL is an Shank IDL.
 * @param {AnchorIdl | ShankIdl | string} idl - The IDL to check.
 * @returns {idl is ShankIdl} - True if the IDL is an Shank IDL, false otherwise.
 */
export const checkIdlIsShank = (idl: AnchorIdl | ShankIdl | string): idl is ShankIdl => {
  return (idl as ShankIdl).instructions !== undefined && (idl as ShankIdl).metadata !== undefined;
};

/**
 * Checks if the given IDL is a string.
 * @param {AnchorIdl | ShankIdl | string} idl - The IDL to check.
 * @returns {idl is string} - True if the IDL is a string, false otherwise.
 */
export const checkIdlIsString = (idl: AnchorIdl | ShankIdl | string): idl is string => {
  return typeof idl === "string";
};

/**
 * Retrieves the IDL for a given program hash
 * @param {string} programHash - The program hash to fetch the IDL for
 * @param {FetchProgramIdlOptions} [options] - Options for fetching the program IDL
 * @param {Map<string, Map<number, IdlTypes> | null>} [idlRepoMap] - A map of program hashes to their IDLs
 * @returns {Promise<IdlItem | null>} - The IDL for the program hash, or null if it cannot be found
 * @example
 * ```typescript
 * const idl = await getProgramIdl("KLend2g3cP87fffoy8q1mQqGKjrxjC8boSyAYavgmjD", { slotContext: 123 });
 * ```
 */
export const getProgramIdl = async (
  programHash: string,
  options?: FetchProgramIdlOptions,
  idlRepoMap?: Map<string, Map<number, IdlTypes> | null>
): Promise<IdlItem | null> => {
  const localIdl = getLocalIdl(programHash, options?.slotContext, idlRepoMap);
  if (localIdl.idl) {
    if (checkIdlIsAnchor(localIdl.idl)) {
      return {
        programId: programHash,
        idl: localIdl.idl,
        idlType: "anchor",
        idlSlotVersion: localIdl?.slotDeployed,
        chainId: options?.chainId,
      };
    } else if (checkIdlIsShank(localIdl.idl)) {
      return {
        programId: programHash,
        idl: localIdl.idl,
        idlType: "shank",
        idlSlotVersion: localIdl?.slotDeployed,
        chainId: options?.chainId,
      };
    } else if (checkIdlIsString(localIdl.idl)) {
      return {
        programId: programHash,
        idl: localIdl.idl,
        idlType: "kinobi",
        idlSlotVersion: localIdl?.slotDeployed,
        chainId: options?.chainId,
      };
    }
  } else if (localIdl.idl === undefined) {
    try {
      const idlInstance = createProgramIdlInstance(options as Pick<FetchProgramIdlOptions, "baseUrl" | "apiKey">);
      let idlMetaResponse = (
        await idlInstance.get<IdlRepoResponse>(`/programs/meta/${programHash}`, {
          params: { slotContext: options?.slotContext },
        })
      ).data.result;

      // Tries to patch the idl if there's any patch available
      idlMetaResponse = checkForIdlPatches(idlMetaResponse);

      if (idlMetaResponse.idlInformation) {
        if (idlMetaResponse.idlInformation.idl) {
          if (idlMetaResponse.idlInformation.idlType === "anchor") {
            return {
              programId: idlMetaResponse.programHash,
              idl: idlMetaResponse.idlInformation.idl,
              idlType: "anchor",
              idlSlotVersion: idlMetaResponse.idlInformation.slotDeployed,
              chainId: options?.chainId,
            };
          } else if (idlMetaResponse.idlInformation.idlType === "shank") {
            return {
              programId: idlMetaResponse.programHash,
              idl: idlMetaResponse.idlInformation.idl,
              idlType: "shank",
              idlSlotVersion: idlMetaResponse.idlInformation.slotDeployed,
              chainId: options?.chainId,
            };
          }

          return {
            programId: idlMetaResponse.programHash,
            idl: idlMetaResponse.idlInformation.idl,
            idlType: "anchor",
            idlSlotVersion: idlMetaResponse.idlInformation.slotDeployed,
            chainId: options?.chainId,
          };
        }
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  return null;
};

/**
 * Retrieves the IDLs for multiple program hashes
 * @param {string[]} programHashes - The program hashes to fetch the IDLs for
 * @param {FetchProgramIdlOptions} [options] - Options for fetching the program IDLs
 * @param {Map<string, Map<number, IdlTypes> | null>} [idlRepoMap] - A map of program hashes to their IDLs
 * @returns {Promise<IdlItem[]>} - The IDLs for the program hashes
 * @example
 * ```typescript
 * const idls = await getMultipleProgramIdls(["KLend2g3cP87fffoy8q1mQqGKjrxjC8boSyAYavgmjD", "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"], { slotContext: 123 });
 * ```
 */
export const getMultipleProgramIdls = async (
  programHashes: string[],
  options?: FetchProgramIdlOptions,
  idlRepoMap?: Map<string, Map<number, IdlTypes> | null>
): Promise<IdlItem[]> => {
  const promises = programHashes.map((programHash) => getProgramIdl(programHash, options, idlRepoMap));
  const idlsToReturn: IdlItem[] = [];
  const settledPromises = await Promise.allSettled(promises);

  settledPromises.forEach((settledPromise) => {
    if (settledPromise.status === "fulfilled") {
      const idlItem = settledPromise.value;
      if (idlItem) {
        idlsToReturn.push(idlItem);
      }
    }
  });

  return idlsToReturn;
};
