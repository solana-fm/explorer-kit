import { Idl as AnchorIdl } from "@coral-xyz/anchor";
import { Idl as ShankIdl } from "@solanafm/kinobi-lite";

export enum PatchType {
  APPEND,
  OVERWRITE,
}

export type Patch = {
  type: PatchType;
  programHash: string;
  slots?: number[];
  patch: Partial<AnchorIdl> | Partial<ShankIdl>;
};
