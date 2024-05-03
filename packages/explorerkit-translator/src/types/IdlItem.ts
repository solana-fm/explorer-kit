import { Idl as AnchorIdl } from "@coral-xyz/anchor";
import { Idl as AnchorV1Idl } from "@coral-xyz/anchor-new";
import { Idl as ShankIdl } from "@solanafm/kinobi-lite";

/**
 * Represents an IDL item, which contains information about a Solana program's IDL.
 * TODO: Move to solanafm/basekit-core like EC-54 to have a unified types that will be used throughout the monorepo.
 */
export interface IdlItem {
  /** The program ID of the Solana program. */
  programId: string;
  /** The IDL of the Solana program, which can be an Anchor IDL, Shank IDL, or a string. */
  idl: AnchorIdl | AnchorV1Idl | ShankIdl | string;
  /** The type of IDL used by the Solana program. */
  idlType: "anchor" | "anchorV1" | "shank" | "kinobi";
  /** The version of the Solana program's IDL slot. */
  idlSlotVersion?: number;
  /** The chain ID of the Solana program. */
  chainId?: CHAIN_ID;
}

/** Enum representing the chain ID of a Solana Blockchain. */
enum CHAIN_ID {
  SOLANA_MAINNET = "solana-mainnet",
  SOLANA_DEVNET = "solana-devnet",
  SOLANA_TESTNET = "solana-testnet",
}
