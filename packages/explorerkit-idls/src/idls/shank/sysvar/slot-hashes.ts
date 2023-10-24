import { Idl } from "@solanafm/kinobi-lite";

export const SlotHashesIDL: Idl = {
  version: "0.0.0",
  name: "sysvar_slot_hashes",
  accounts: [
    {
      name: "SysvarSlotHashes",
      type: {
        kind: "struct",
        fields: [
          {
            name: "slotHashes",
            type: {
              defined: "SlotHashes",
            },
          },
        ],
      },
    },
  ],
  instructions: [],
  types: [
    {
      name: "SlotHashes",
      type: {
        kind: "struct",
        fields: [
          {
            name: "slotHash",
            type: {
              vec: {
                tuple: ["u64", "publicKey"],
              },
              size: "u64",
            },
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "SysvarS1otHashes111111111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
