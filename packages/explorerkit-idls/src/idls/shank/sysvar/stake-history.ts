import { Idl } from "@solanafm/kinobi-lite";

export const StakeHistoryIDL: Idl = {
  version: "0.0.0",
  name: "sysvar_stake_history_entry",
  accounts: [
    {
      name: "stakeHistoryData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "stakeHistory",
            type: {
              defined: "StakeHistory",
            },
          },
        ],
      },
    },
  ],
  instructions: [],
  types: [
    {
      name: "StakeHistory",
      type: {
        kind: "struct",
        fields: [
          {
            name: "stakeHistoryTuple",
            type: {
              vec: {
                defined: "StakeHistoryTuple",
              },
              size: "u64",
            },
          },
        ],
      },
    },
    {
      name: "StakeHistoryTuple",
      type: {
        kind: "struct",
        fields: [
          {
            name: "stakeHistoryEntry",
            type: {
              tuple: [
                "u64",
                {
                  defined: "StakeHistoryEntry",
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: "StakeHistoryEntry",
      type: {
        kind: "struct",
        fields: [
          {
            name: "effective",
            type: "u64",
          },
          {
            name: "activating",
            type: "u64",
          },
          {
            name: "deactivating",
            type: "u64",
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "SysvarStakeHistory1111111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
