import { Idl } from "@solanafm/kinobi-lite";

export const DefaultAccountStateExtensionIDL: Idl = {
  version: "0.1.0",
  name: "DefaultAccountStateExtension",
  instructions: [
    {
      name: "initializeDefaultAccountState",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "accountState",
          type: {
            defined: "AccountState",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "updateDefaultAccountState",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "freezeAuthority",
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
          name: "accountState",
          type: {
            defined: "AccountState",
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
      name: "AccountState",
      type: {
        kind: "enum",
        size: "u8",
        variants: [
          {
            name: "Uninitialized",
          },
          {
            name: "Initialized",
          },
          {
            name: "Frozen",
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
