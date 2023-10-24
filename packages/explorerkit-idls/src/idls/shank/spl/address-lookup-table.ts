import { Idl } from "@solanafm/kinobi-lite";

export const AddressLookupTableIDL: Idl = {
  version: "0.0.0",
  name: "address_lookup_table",
  accounts: [
    {
      name: "Uninitialized",
      type: {
        kind: "struct",
        fields: [],
      },
    },
    {
      name: "AddressLookupTable",
      type: {
        kind: "struct",
        fields: [
          {
            name: "meta",
            type: {
              defined: "LookupTableMeta",
            },
          },
          {
            name: "addresses",
            type: {
              defined: "LookupTableAddresses",
            },
          },
        ],
      },
    },
  ],
  instructions: [
    {
      name: "CreateLookupTable",
      accounts: [
        {
          name: "lookUpTable",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "funder",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "recentSlot",
          type: { defined: "Slot" },
        },
        {
          name: "bumpSeed",
          type: "u8",
        },
      ],
      discriminant: {
        type: "u32",
        value: 0,
      },
    },
    {
      name: "FreezeLookupTable",
      accounts: [
        {
          name: "lookUpTable",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 1,
      },
    },
    {
      name: "ExtendLookupTable",
      accounts: [
        {
          name: "lookUpTable",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "funder",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "newAddresses",
          type: {
            vec: "publicKey",
            size: "u64",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 2,
      },
    },
    {
      name: "DeactivateLookupTable",
      accounts: [
        {
          name: "lookUpTable",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 3,
      },
    },
    {
      name: "CloseLookupTable",
      accounts: [
        {
          name: "lookUpTable",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "lamportsRecipient",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 4,
      },
    },
  ],
  types: [
    {
      name: "Key",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Uninitialized",
          },
          {
            name: "LookupTable",
          },
        ],
      },
    },
    {
      name: "Slot",
      type: {
        kind: "struct",
        fields: [
          {
            name: "slot",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "LookupTableMeta",
      type: {
        kind: "struct",
        fields: [
          {
            name: "deactivation_slot",
            type: "u64",
          },
          {
            name: "last_extended_slot",
            type: "u64",
          },
          {
            name: "last_extended_slot_start_index",
            type: "u8",
          },
          {
            name: "authority",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "_padding",
            type: "u16",
          },
        ],
      },
    },
    {
      name: "LookupTableAddresses",
      type: {
        kind: "struct",
        fields: [
          {
            name: "addresses",
            type: {
              vec: "publicKey",
              size: "remainder",
            },
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "AddressLookupTab1e1111111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
