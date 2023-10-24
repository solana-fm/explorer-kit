import { Idl } from "@solanafm/kinobi-lite";

export const RentIDL: Idl = {
  version: "0.0.0",
  name: "sysvar_rent",
  accounts: [
    {
      name: "rentData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "rent",
            type: {
              defined: "Rent",
            },
          },
        ],
      },
    },
  ],
  instructions: [],
  types: [
    {
      name: "Rent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "lamports_per_byte_year",
            type: "u64",
          },
          {
            name: "exemption_threshold",
            type: "f64",
          },
          {
            name: "burn_percent",
            type: "u8",
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "SysvarRent111111111111111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
