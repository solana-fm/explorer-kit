import { Idl } from "@solanafm/kinobi-lite";

export const GroupPointerIDL: Idl = {
  version: "0.0.0",
  name: "group-pointer",
  accounts: [],
  instructions: [
    {
      name: "initializeGroupPointer",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "initializeGroupPointerData",
          type: {
            defined: "InitializeGroupPointerData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "UpdateGroupPointer",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "groupPointerAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "updateGroupPointerData",
          type: {
            defined: "UpdateGroupPointerData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
  ],
  types: [
    {
      name: "InitializeGroupPointerData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "group_address",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "UpdateGroupPointerData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "group_address",
            type: "publicKey",
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
