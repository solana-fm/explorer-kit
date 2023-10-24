import { Idl } from "@solanafm/kinobi-lite";

export const EpochScheduleIDL: Idl = {
  version: "0.0.0",
  name: "sysvar_epoch_schedule",
  accounts: [
    {
      name: "SysvarEpochSchedule",
      type: {
        kind: "struct",
        fields: [
          {
            name: "epochSchedule",
            type: {
              defined: "EpochSchedule",
            },
          },
        ],
      },
    },
  ],
  instructions: [],
  types: [
    {
      name: "EpochSchedule",
      type: {
        kind: "struct",
        fields: [
          {
            name: "slots_per_epoch",
            type: "u64",
          },
          {
            name: "leader_schedule_slot_offset",
            type: "u64",
          },
          {
            name: "warmup",
            type: "bool",
          },
          {
            name: "first_normal_epoch",
            type: "u64",
          },
          {
            name: "first_normal_slot",
            type: "u64",
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "SysvarEpochSchedu1e111111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
