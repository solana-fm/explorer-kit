import { Idl } from "@solanafm/kinobi-lite";

export const FeesIDL: Idl = {
  version: "0.0.0",
  name: "sysvar_fees",
  accounts: [
    {
      name: "sysvarFees",
      type: {
        kind: "struct",
        fields: [
          {
            name: "fees",
            type: {
              defined: "Fees",
            },
          },
        ],
      },
    },
  ],
  instructions: [],
  types: [
    {
      name: "Fees",
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
    address: "SysvarFees111111111111111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
