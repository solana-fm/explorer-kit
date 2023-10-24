import { Idl } from "@solanafm/kinobi-lite";

export const ClockIDL: Idl = {
  version: "0.0.0",
  name: "sysvar_clock",
  accounts: [
    {
      name: "SysvarClock",
      type: {
        kind: "struct",
        fields: [
          {
            name: "clock",
            type: {
              defined: "Clock",
            },
          },
        ],
      },
    },
  ],
  instructions: [],
  types: [
    {
      name: "Clock",
      type: {
        kind: "struct",
        fields: [
          {
            name: "slot",
            type: "u64",
          },
          {
            name: "epoch_start_timestamp",
            type: "i64",
          },
          {
            name: "epoch",
            type: "u64",
          },
          {
            name: "leader_schedule_epoch",
            type: "u64",
          },
          {
            name: "unix_timestamp",
            type: "i64",
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "SysvarC1ock11111111111111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
