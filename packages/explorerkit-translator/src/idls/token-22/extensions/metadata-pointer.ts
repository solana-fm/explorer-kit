import { Idl } from "@solanafm/kinobi-lite";

export const MetadataPointerExtensionIdl: Idl = {
  version: "0.1.0",
  name: "MetadataPointerExtension",
  instructions: [
    {
      name: "initializeMetadataPointer",
      accounts: [
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "initializeMetadataPointerData",
          type: {
            defined: "InitializeMetadataPointerData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "updateMetadataPointer",
      accounts: [
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "metadataPointerAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "updateMetadataPointerData",
          type: {
            defined: "UpdateMetadataPointerData",
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
      name: "InitializeMetadataPointerData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "metadata_address",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "UpdateMetadataPointerData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "metadata_address",
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
