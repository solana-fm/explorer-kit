import { Idl } from "@solanafm/kinobi-lite";

export const CompressionEventIdl: Idl = {
  name: "compression-events",
  instructions: [],
  types: [
    {
      name: "AccountCompressionEvent",
      type: {
        kind: "enum",
        variants: [
          { name: "ChangeLog", fields: [{ defined: "ChangeLogEvent" }] },
          {
            name: "ApplicationData",
            fields: [{ defined: "ApplicationDataEvent" }],
          },
        ],
      },
    },
    {
      name: "ApplicationDataEvent",
      type: {
        kind: "enum",
        variants: [{ name: "V1", fields: [{ defined: "ApplicationDataEventV1" }] }],
      },
    },
    {
      name: "ChangeLogEvent",
      type: {
        kind: "enum",
        variants: [{ name: "V1", fields: [{ defined: "ChangeLogEventV1" }] }],
      },
    },
    {
      name: "ApplicationDataEventV1",
      type: {
        kind: "struct",
        fields: [
          // This is basically just vec<u8>
          {
            name: "applicationDataLen",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "ChangeLogEventV1",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            docs: ["Public key of the ConcurrentMerkleTree"],
            type: "publicKey",
          },
          {
            name: "path",
            docs: ["Nodes of off-chain merkle tree needed by indexer"],
            type: { vec: { defined: "PathNode" } },
          },
          {
            name: "seq",
            docs: [
              "Index corresponding to the number of successful operations on this tree.",
              "Used by the off-chain indexer to figure out when there are gaps to be backfilled.",
            ],
            type: "u64",
          },
          {
            name: "index",
            docs: ["Bitmap of node parity (used when hashing)"],
            type: "u32",
          },
        ],
      },
    },
    {
      name: "PathNode",
      type: {
        kind: "struct",
        fields: [
          { name: "node", type: { array: ["u8", 32] } },
          { name: "index", type: "u32" },
        ],
      },
    },
  ],
  metadata: {
    address: "cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK",
    origin: "shank",
  },
  version: "0.1.1",
};
