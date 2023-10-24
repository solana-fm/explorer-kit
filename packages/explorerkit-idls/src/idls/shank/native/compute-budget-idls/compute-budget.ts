import { Idl } from "@solanafm/kinobi-lite";

export const ComputeBudgetIDL: Idl = {
  version: "0.0.1",
  name: "ComputeBudget",
  instructions: [
    {
      name: "RequestUnitsDeprecated",
      accounts: [],
      args: [
        {
          name: "units",
          type: "u32",
        },
        {
          name: "additionalFee",
          type: "u32",
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "RequestHeapFrame",
      accounts: [],
      args: [
        {
          name: "heapRegionSize",
          type: "u32",
        },
      ],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
    {
      name: "SetComputeUnitLimit",
      accounts: [],
      args: [
        {
          name: "computeUnitLimit",
          type: "u32",
        },
      ],
      discriminant: {
        type: "u8",
        value: 2,
      },
    },
    {
      name: "SetComputeUnitPrice",
      accounts: [],
      args: [
        {
          name: "computeUnitPrice",
          type: "u32",
        },
      ],
      discriminant: {
        type: "u8",
        value: 3,
      },
    },
    {
      name: "SetLoadedAccountsDataSizeLimit",
      accounts: [],
      args: [
        {
          name: "accountDataSizeLimit",
          type: "u32",
        },
      ],
      discriminant: {
        type: "u8",
        value: 4,
      },
    },
  ],
  types: [],
  metadata: {
    origin: "shank",
    address: "ComputeBudget111111111111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
