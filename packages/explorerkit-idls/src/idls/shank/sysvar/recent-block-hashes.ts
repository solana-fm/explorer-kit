import { Idl } from "@solanafm/kinobi-lite";

export const RecentBlockHashesIDL: Idl = {
  version: "0.0.0",
  name: "sysvar_recent_blockhashes",
  accounts: [
    {
      name: "RecentBlockhashes",
      type: {
        kind: "struct",
        fields: [
          {
            name: "entry",
            type: {
              vec: {
                defined: "Entry",
              },
              size: "u64",
            },
          },
        ],
      },
    },
  ],
  instructions: [],
  types: [
    {
      name: "Entry",
      type: {
        kind: "struct",
        fields: [
          {
            name: "blockHash",
            type: "publicKey",
          },
          {
            name: "fee_calculator",
            type: {
              defined: "FeeCalculator",
            },
          },
        ],
      },
    },
    {
      name: "FeeCalculator",
      type: {
        kind: "struct",
        fields: [
          {
            name: "lamports_per_signature",
            type: "u64",
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "SysvarRecentB1ockHashes11111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
