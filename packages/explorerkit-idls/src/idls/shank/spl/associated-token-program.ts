import { Idl } from "@solanafm/kinobi-lite";

export const AssociatedTokenIDL: Idl = {
  version: "1.1.1",
  name: "spl_associated_token_account",
  instructions: [
    {
      name: "create",
      accounts: [
        {
          name: "fundingAddress",
          isMut: true,
          isSigner: true,
        },
        {
          name: "associatedAccountAddress",
          isMut: true,
          isSigner: false,
        },
        {
          name: "walletAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenMintAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "createIdempotent",
      accounts: [
        {
          name: "fundingAddress",
          isMut: true,
          isSigner: true,
        },
        {
          name: "associatedAccountAddress",
          isMut: true,
          isSigner: false,
        },
        {
          name: "walletAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenMintAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
    {
      name: "recoverNested",
      accounts: [
        {
          name: "nestedAssociatedAccountAddress",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nestedTokenMintAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "destinationAssociatedAccountAddress",
          isMut: true,
          isSigner: false,
        },
        {
          name: "ownerAssociatedAccountAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "ownerTokenMintAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "walletAddress",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 2,
      },
    },
  ],
  errors: [
    {
      code: 0,
      name: "InvalidOwner",
      msg: "Associated token account owner does not match address derivation",
    },
  ],
  metadata: {
    origin: "shank",
    address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
    binaryVersion: "1.1.1",
    libVersion: "1.1.1",
  },
};
