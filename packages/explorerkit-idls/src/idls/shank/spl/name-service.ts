import { Idl } from "@solanafm/kinobi-lite";

export const NameServiceIDL: Idl = {
  version: "0.0.0",
  name: "name",
  accounts: [
    {
      name: "NameRecordHeader",
      type: {
        kind: "struct",
        fields: [
          {
            name: "parentName",
            type: "publicKey",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "class",
            type: "publicKey",
          },
          // {
          //   name: "data",
          //   type: "string",
          // },
        ],
      },
    },
  ],
  instructions: [
    {
      name: "Create",
      accounts: [
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "fundingAccount",
          isMut: true,
          isSigner: true,
        },
        {
          name: "nameRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "accountClass",
          isMut: false,
          isSigner: true,
        },
        {
          name: "parentNameRecord",
          isMut: false,
          isSigner: false,
        },
        {
          name: "parentNameRecordClass",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "hashedName",
          type: {
            vec: "u8",
            size: "u32",
          },
        },
        {
          name: "lamports",
          type: "u64",
        },
        {
          name: "space",
          type: "u32",
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "Update",
      accounts: [
        {
          name: "nameRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "parentNameRecord",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "offset",
          type: "u32",
        },
        {
          name: "data",
          type: {
            vec: "u8",
            size: "u32",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
    {
      name: "Transfer",
      accounts: [
        {
          name: "nameRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "parentNameRecord",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "newOwner",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u8",
        value: 2,
      },
    },
    {
      name: "Delete",
      accounts: [
        {
          name: "nameRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "refundAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 3,
      },
    },
    {
      name: "Realloc",
      accounts: [
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "nameRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "space",
          type: "u32",
        },
      ],
      discriminant: {
        type: "u8",
        value: 4,
      },
    },
  ],
  types: [],
  metadata: {
    origin: "shank",
    address: "namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
