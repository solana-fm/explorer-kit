import { Idl } from "@solanafm/kinobi-lite";

export const BPFLoaderUpgradeableIDL: Idl = {
  version: "0.0.0",
  name: "bpf_upgradeable_loader",
  accounts: [
    {
      name: "Uninitialized",
      type: {
        kind: "struct",
        fields: [],
      },
    },
    {
      name: "Buffer",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority_address",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "data",
            type: "bytes",
          },
        ],
      },
    },
    {
      name: "Program",
      type: {
        kind: "struct",
        fields: [
          {
            name: "program_data_address",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "ProgramData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "slot",
            type: "u64",
          },
          {
            name: "upgrade_authority_address",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "data",
            type: "bytes",
          },
        ],
      },
    },
  ],
  instructions: [
    {
      name: "InitializeBuffer",
      accounts: [
        {
          name: "initializeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bufferAuthority",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 0,
      },
    },
    {
      name: "Write",
      accounts: [
        {
          name: "bufferAccountToWrite",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bufferAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "offset",
          type: "u32",
        },
        {
          name: "data",
          type: "bytes",
        },
      ],
      discriminant: {
        type: "u32",
        value: 1,
      },
    },
    {
      name: "DeployWithMaxDataLen",
      accounts: [
        {
          name: "payer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "programData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "program",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bufferAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rentSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clockSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "maxDataLen",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u32",
        value: 2,
      },
    },
    {
      name: "Upgrade",
      accounts: [
        {
          name: "programData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "program",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bufferAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "spillAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rentSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clockSysvar",
          isMut: false,
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
      name: "SetAuthority",
      accounts: [
        {
          name: "programData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "currentAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "newAuthority",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 4,
      },
    },
    {
      name: "Close",
      accounts: [
        {
          name: "closeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "DestinationAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "associatedProgram",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 5,
      },
    },
    {
      name: "ExtendProgram",
      accounts: [
        {
          name: "programData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "associatedProgram",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "additionalBytes",
          type: "u32",
        },
      ],
      discriminant: {
        type: "u32",
        value: 6,
      },
    },
    {
      name: "SetAuthorityNew",
      accounts: [
        {
          name: "programData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "currentAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "newAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 7,
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "BPFLoaderUpgradeab1e11111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
