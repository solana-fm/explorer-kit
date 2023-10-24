import { Idl } from "@solanafm/kinobi-lite";

export const ConfigIDL: Idl = {
  version: "0.0.1",
  name: "config",
  accounts: [
    {
      name: "StakeConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "Keys",
            type: {
              defined: "ConfigKeys",
            },
          },
          {
            name: "warmup_cooldown_rate",
            type: "f64",
          },
          {
            name: "slash_penalty",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "ValidatorInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "Keys",
            type: {
              defined: "ConfigKeys",
            },
          },
          {
            name: "info",
            type: "string",
          },
        ],
      },
    },
  ],
  instructions: [
    {
      name: "Create",
      accounts: [
        {
          name: "ConfigAccount",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "Keys",
          type: {
            defined: "ConfigKeys",
          },
        },
        {
          name: "space",
          type: "u64",
        },
      ],
    },
    {
      name: "Store",
      accounts: [
        {
          name: "ConfigAccount",
          isMut: true,
          isSigner: true,
        },
        {
          name: "Signer1",
          isMut: true,
          isSigner: true,
        },
        {
          name: "Signer2",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "Keys",
          type: {
            defined: "ConfigKeys",
          },
        },
        {
          name: "info",
          type: "string",
        },
      ],
    },
  ],
  types: [
    {
      name: "ConfigKeys",
      type: {
        kind: "struct",
        fields: [
          {
            name: "KeysTuple",
            type: {
              vec: {
                tuple: ["publicKey", "bool"],
              },
              size: "u8",
            },
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "Config1111111111111111111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
