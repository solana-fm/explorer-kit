import { Idl as AnchorIdl } from "@coral-xyz/anchor";
import { Idl as ShankIdl } from "@solanafm/kinobi-lite";

import { checkIdlIsString } from "../idls/IdlRepository";
import { ProgramResponse } from "../instances/ProgramIDL";
import { JupiterV4IdlPatch } from "./patches/jupiter-v4";
import { MagicEdenV2IdlPatch } from "./patches/magiceden-v2";
import { Patch, PatchType } from "./patches/types";

export const checkForIdlPatches = (idlMetaResponse: ProgramResponse) => {
  let patchedIdlMetaResponse = Object.assign({}, idlMetaResponse);
  if (patchedIdlMetaResponse.idlInformation) {
    if (patchedIdlMetaResponse.idlInformation.idl) {
      switch (idlMetaResponse.programHash) {
        case "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K":
          patchedIdlMetaResponse.idlInformation.idl = patchIdlByAppending(
            MagicEdenV2IdlPatch,
            patchedIdlMetaResponse?.idlInformation?.idl
          );
          break;

        case "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB":
          patchedIdlMetaResponse.idlInformation.idl = patchIdlByOverwriting(
            JupiterV4IdlPatch,
            patchedIdlMetaResponse?.idlInformation.slotDeployed,
            patchedIdlMetaResponse?.idlInformation?.idl
          );
          break;

        default:
          break;
      }
    }
  }

  return patchedIdlMetaResponse;
};

// TODO: Remember to check for the slots deployed when patching the IDL.
const patchIdlByAppending = (patch: Patch, idl?: AnchorIdl | ShankIdl | string) => {
  if (idl) {
    if (!checkIdlIsString(idl)) {
      if (patch.type === PatchType.APPEND) {
        const idlToReturn = Object.assign({}, idl);
        const keysToAppend = Object.keys(patch.patch);

        keysToAppend.forEach((key) => {
          if (key in idlToReturn) {
            if (Array.isArray(idlToReturn[key as keyof typeof idlToReturn])) {
              idlToReturn[key as keyof typeof idlToReturn] = idlToReturn[key as keyof typeof idlToReturn].concat(
                patch.patch[key as keyof typeof patch.patch]
              );
            }
          }
        });

        return idlToReturn;
      }
    }
  }

  return idl;
};

const patchIdlByOverwriting = (patch: Patch, idlSlotDeployed?: number, idl?: AnchorIdl | ShankIdl | string) => {
  if (idl) {
    if (!checkIdlIsString(idl)) {
      // Check if the idl slotDeployed is included in the patch, if it is then we will continue
      if (patch.slots) {
        if (idlSlotDeployed) {
          if (!patch.slots.includes(idlSlotDeployed)) {
            return idl;
          }
        }
      }

      if (patch.type === PatchType.OVERWRITE) {
        const idlToReturn = Object.assign({}, idl);
        const keysToOverwrite = Object.keys(patch.patch);

        keysToOverwrite.forEach((key) => {
          idlToReturn[key as keyof typeof idlToReturn] = patch.patch[key as keyof typeof patch.patch];
        });

        return idlToReturn;
      }
    }
  }

  return idl;
};
