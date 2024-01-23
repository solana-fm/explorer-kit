import { Idl } from "@solanafm/kinobi-lite";

export const TokenGroupInterfaceExtensionIDL: Idl = {
  version: "0.1.0",
  name: "TokenGroupInterfaceExtension",
  instructions: [
    {
      name: "initializeTokenGroup",
      accounts: [
        {
          name: "group",
          isMut: true,
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
          name: "initializeGroupData",
          type: {
            defined: "InitializeGroupData",
          },
        },
      ],
    },
    {
      name: "updateGroupMaxSize",
      accounts: [
        {
          name: "group",
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
          name: "updateGroupMaxSizeData",
          type: {
            defined: "UpdateGroupMaxSizeData",
          },
        },
      ],
    },
    {
      name: "updateAuthority",
      accounts: [
        {
          name: "group",
          isMut: true,
          isSigner: false,
        },
        {
          name: "currentUpdateAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "updateGroupAuthorityData",
          type: {
            defined: "UpdateGroupAuthorityData",
          },
        },
      ],
    },
    {
      name: "initializeMember",
      accounts: [
        {
          name: "member",
          isMut: true,
          isSigner: false,
        },
        {
          name: "memberMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "memberMintAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "group",
          isMut: true,
          isSigner: false,
        },
        {
          name: "groupUpdateAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
  ],
  accounts: [],
  types: [
    {
      name: "InitializeGroupData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "update_authority",
            type: "publicKey",
          },
          {
            name: "max_size",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "UpdateGroupMaxSizeData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "max_size",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "UpdateGroupAuthorityData",
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
  ],
  metadata: {
    origin: "shank",
    address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
    binaryVersion: "0.1.0",
    libVersion: "0.1.0",
  },
};
