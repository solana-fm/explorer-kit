import { Idl } from "@solanafm/kinobi-lite";

//
export const TokenMetadataInterfaceExtensionIDL: Idl = {
  version: "0.1.0",
  name: "TokenMetadataInterfaceExtension",
  instructions: [
    {
      name: "initializeAccount",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "initializeAccountData",
          type: {
            defined: "InitializeAccountData",
          },
        },
      ],
    },
    {
      name: "updatingField",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "updatingFieldData",
          type: {
            defined: "UpdatingFieldData",
          },
        },
      ],
    },
    {
      name: "removeKeyIx",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "removeKeyData",
          type: {
            defined: "RemoveKeyData",
          },
        },
      ],
    },
    {
      name: "updateTheAuthority",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "updateAuthorityData",
          type: {
            defined: "UpdateAuthorityData",
          },
        },
      ],
    },
    {
      name: "emitter",
      accounts: [
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "emitData",
          type: {
            defined: "EmitData",
          },
        },
      ],
    },
  ],
  accounts: [],
  types: [
    {
      name: "InitializeAccountData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "symbol",
            type: "string",
          },
          {
            name: "uri",
            type: "string",
          },
        ],
      },
    },
    {
      name: "UpdatingFieldData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "field",
            type: {
              defined: "Field",
            },
          },
          {
            name: "value",
            type: "string",
          },
        ],
      },
    },
    {
      name: "Field",
      type: {
        kind: "enum",
        size: "u8",
        variants: [
          {
            name: "Name",
            fields: [],
          },
          {
            name: "Symbol",
            fields: [],
          },
          {
            name: "Uri",
            fields: [],
          },
          {
            name: "Key",
            fields: [
              {
                name: "userKeyField",
                type: "string",
              },
            ],
          },
        ],
      },
    },
    {
      name: "RemoveKeyData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "idempotent",
            type: "bool",
          },
          {
            name: "key",
            type: "string",
          },
        ],
      },
    },
    {
      name: "UpdateAuthorityData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "new_authority",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "EmitData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "start",
            type: {
              option: "u64",
            },
          },
          {
            name: "end",
            type: {
              option: "u64",
            },
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
