import { Patch, PatchType } from "./types";

export const MagicEdenV2IdlPatch: Patch = {
  type: PatchType.APPEND,
  programHash: "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K",
  patch: {
    instructions: [
      {
        name: "executeSale",
        accounts: [
          {
            name: "buyer",
            isMut: true,
            isSigner: false,
          },
          {
            name: "seller",
            isMut: true,
            isSigner: false,
          },
          {
            name: "notary",
            isMut: false,
            isSigner: false,
          },
          {
            name: "tokenAccount",
            isMut: true,
            isSigner: false,
          },
          {
            name: "tokenMint",
            isMut: false,
            isSigner: false,
          },
          {
            name: "metadata",
            isMut: false,
            isSigner: false,
          },
          {
            name: "escrowPaymentAccount",
            isMut: true,
            isSigner: false,
          },
          {
            name: "buyerReceiptTokenAccount",
            isMut: true,
            isSigner: false,
          },
          {
            name: "authority",
            isMut: false,
            isSigner: false,
          },
          {
            name: "auctionHouse",
            isMut: false,
            isSigner: false,
          },
          {
            name: "auctionHouseTreasury",
            isMut: true,
            isSigner: false,
          },
          {
            name: "buyerTradeState",
            isMut: true,
            isSigner: false,
          },
          {
            name: "buyerReferral",
            isMut: true,
            isSigner: false,
          },
          {
            name: "sellerTradeState",
            isMut: true,
            isSigner: false,
          },
          {
            name: "sellerReferral",
            isMut: true,
            isSigner: false,
          },
          {
            name: "tokenProgram",
            isMut: false,
            isSigner: false,
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false,
          },
          {
            name: "ataProgram",
            isMut: false,
            isSigner: false,
          },
          {
            name: "programAsSigner",
            isMut: false,
            isSigner: false,
          },
          {
            name: "rent",
            isMut: false,
            isSigner: false,
          },
        ],
        args: [
          {
            name: "escrowPaymentBump",
            type: "u8",
          },
          {
            name: "programAsSignerBump",
            type: "u8",
          },
          {
            name: "buyerPrice",
            type: "u64",
          },
          {
            name: "tokenSize",
            type: "u64",
          },
          {
            name: "buyerStateExpiry",
            type: "i64",
          },
          {
            name: "sellerStateExpiry",
            type: "i64",
          },
        ],
      },
    ],
  },
};
