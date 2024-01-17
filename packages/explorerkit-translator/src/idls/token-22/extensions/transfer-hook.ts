import { Idl } from "@solanafm/kinobi-lite";

export const TransferHookExtensionIDL: Idl = {
  version: "0.1.0",
  name: "TransferHookExtension",
  instructions: [
    {
      name: "initializeTransferHook",
      accounts: [
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "initializeTransferHook",
          type: {
            defined: "initializeTransferHookData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "updateTransferHook",
      accounts: [
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "transferHookAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "updateTransferHook",
          type: {
            defined: "updateTransferHookData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
  ],
  accounts: [],
  types: [
    {
      name: "initializeTransferHookData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "program_id",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "updateTransferHookData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "program_id",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
    binaryVersion: "0.1.0",
    libVersion: "0.1.0",
  },
};
