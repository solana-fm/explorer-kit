import { Idl } from "@solanafm/kinobi-lite";

export const TransferFeeExtensionIDL: Idl = {
  version: "0.1.0",
  name: "TransferFeeExtension",
  instructions: [
    {
      name: "initializeTransferFeeConfig",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "transferFeeConfigAuthority",
          type: {
            coption: "publicKey",
            prefix: "u8",
          },
        },
        {
          name: "withdrawWithheldAuthority",
          type: {
            coption: "publicKey",
            prefix: "u8",
          },
        },
        {
          name: "transferFeeBasisPoints",
          type: "u16",
        },
        {
          name: "maximumFee",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "transferCheckedWithFee",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "decimals",
          type: "u8",
        },
        {
          name: "fee",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
    {
      name: "withdrawWithheldTokensFromMint",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "withdrawWithheldAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 2,
      },
    },
    {
      name: "withdrawWithheldTokensFromAccounts",
      accounts: [
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "withdrawWithheldAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "numTokenAccounts",
          type: "u8",
        },
      ],
      discriminant: {
        type: "u8",
        value: 3,
      },
    },
    {
      name: "harvestWithheldTokensToMint",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 4,
      },
    },
    {
      name: "setTransferFee",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "transferFeeBasisPoints",
          type: "u16",
        },
        {
          name: "maximumFee",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 5,
      },
    },
  ],
  accounts: [],
  types: [],
  metadata: {
    origin: "shank",
    address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
