import { Idl } from "@coral-xyz/anchor";
import { describe, expect, it } from "vitest"; // <-- **

import { checkForIdlPatches, checkIdlIsString } from "../src/";
import { ProgramResponse } from "../src/instances/ProgramIDL";

describe("checkForIdlPatches", () => {
  it("should return the original response if no patch is available", () => {
    const response: ProgramResponse = {
      programHash: "abc123",
      programInformation: {
        hasIdl: true,
        isClosed: false,
      },
      idlInformation: {
        idl: {
          instructions: [],
          name: "test",
          version: "0.0.1",
        },
      },
    };
    const patchedResponse = checkForIdlPatches(response);
    expect(patchedResponse).toEqual(response);
  });

  it("should patch the idl for MagicEdenV2", () => {
    const response: ProgramResponse = {
      programHash: "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K",
      programInformation: {
        hasIdl: true,
        isClosed: false,
      },
      idlInformation: {
        idl: {
          instructions: [],
          name: "test",
          version: "0.0.1",
        },
      },
    };
    const patchedResponse = checkForIdlPatches(response);
    expect(patchedResponse.idlInformation).toBeDefined();
    expect(patchedResponse.idlInformation?.idl).toBeDefined();
    expect(checkIdlIsString(patchedResponse.idlInformation!.idl!)).toBeFalsy();
    expect((patchedResponse.idlInformation?.idl! as Idl).instructions).toHaveLength(1);
    expect((patchedResponse.idlInformation?.idl! as Idl).instructions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
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
        }),
      ])
    );
  });

  it("should not modify the original response", () => {
    const response: ProgramResponse = {
      programHash: "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K",
      programInformation: {
        hasIdl: true,
        isClosed: false,
      },
      idlInformation: {
        idl: {
          instructions: [],
          name: "test",
          version: "0.0.1",
        },
      },
    };
    const patchedResponse = checkForIdlPatches(response);
    expect(patchedResponse.idlInformation).toBeDefined();
    expect(patchedResponse).not.toBe(response);
  });

  it("should handle undefined idlInformation", () => {
    const response: ProgramResponse = {
      programHash: "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K",
      programInformation: {
        hasIdl: false,
        isClosed: false,
      },
    };
    const patchedResponse = checkForIdlPatches(response);
    expect(patchedResponse).toEqual(response);
  });

  it("should handle null idl", () => {
    const response: ProgramResponse = {
      programHash: "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K",
      programInformation: {
        hasIdl: false,
        isClosed: false,
      },
    };
    const patchedResponse = checkForIdlPatches(response);
    expect(patchedResponse).toEqual(response);
  });
});
