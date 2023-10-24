import { Idl } from "@solanafm/kinobi-lite";

export const RewardsIDL: Idl = {
  version: "0.0.0",
  name: "sysvar_rewards",
  accounts: [
    {
      name: "rewards_data",
      type: {
        kind: "struct",
        fields: [
          {
            name: "rewards",
            type: {
              defined: "Rewards",
            },
          },
        ],
      },
    },
  ],
  instructions: [],
  types: [
    {
      name: "Rewards",
      type: {
        kind: "struct",
        fields: [
          {
            name: "validator_point_value",
            type: "f64",
          },
          {
            name: "unused",
            type: "f64",
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "SysvarRewards111111111111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
