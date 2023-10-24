import { Idl } from "@solanafm/kinobi-lite";

export const BubblegumEventIdl: Idl = {
  name: "bubblegum-events",
  instructions: [],
  types: [
    {
      name: "BubblegumEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bubblegumEventType",
            type: {
              defined: "BubblegumEventType",
            },
          },
          {
            name: "version",
            type: {
              defined: "Version",
            },
          },
          {
            name: "leafSchema",
            type: {
              defined: "LeafSchema",
            },
          },
          {
            name: "leafHash",
            type: {
              array: ["u8", 32],
            },
          },
        ],
      },
    },
    {
      name: "LeafSchema",
      type: {
        kind: "enum",
        variants: [
          {
            name: "V1",
            fields: [
              {
                name: "id",
                type: "publicKey",
              },
              {
                name: "owner",
                type: "publicKey",
              },
              {
                name: "delegate",
                type: "publicKey",
              },
              {
                name: "nonce",
                type: "u64",
              },
              {
                name: "data_hash",
                type: {
                  array: ["u8", 32],
                },
              },
              {
                name: "creator_hash",
                type: {
                  array: ["u8", 32],
                },
              },
            ],
          },
        ],
      },
    },
    {
      name: "Version",
      type: {
        kind: "enum",
        variants: [
          {
            name: "V1",
          },
        ],
      },
    },
    {
      name: "BubblegumEventType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Uninitialized",
          },
          {
            name: "LeafSchemaEvent",
          },
        ],
      },
    },
  ],
  metadata: {
    address: "BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY",
    origin: "shank",
  },
  version: "0.1.1",
};
