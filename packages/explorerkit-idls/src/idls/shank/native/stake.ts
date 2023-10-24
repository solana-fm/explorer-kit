import { Idl } from "@solanafm/kinobi-lite";

export const StakeIDL: Idl = {
  version: "0.0.1",
  name: "stake",
  accounts: [
    {
      name: "Uninitialized",
      type: {
        kind: "struct",
        fields: [],
      },
    },
    {
      name: "Initialized",
      type: {
        kind: "struct",
        fields: [
          {
            name: "meta",
            type: {
              defined: "Meta",
            },
          },
        ],
      },
    },
    {
      name: "StakeAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "meta",
            type: {
              defined: "Meta",
            },
          },
          {
            name: "stake",
            type: {
              defined: "Stake",
            },
          },
        ],
      },
    },
    {
      name: "RewardsPool",
      type: {
        kind: "struct",
        fields: [],
      },
    },
  ],
  instructions: [
    {
      name: "Initialize",
      accounts: [
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rentSysvar",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "authorized",
          type: {
            defined: "Authorized",
          },
        },
        {
          name: "lockup",
          type: {
            defined: "Lockup",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 0,
      },
    },
    {
      name: "Authorize",
      accounts: [
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "clockSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "lockupAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "authorizePubkey",
          type: "publicKey",
        },
        {
          name: "stakeAuthorize",
          type: {
            defined: "StakeAuthorize",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 1,
      },
    },
    {
      name: "DelegateStake",
      accounts: [
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "voteAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clockSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeHistorySysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 2,
      },
    },
    {
      name: "Split",
      accounts: [
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "splitAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "stakeAmount",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u32",
        value: 3,
      },
    },
    {
      name: "Withdraw",
      accounts: [
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recipientAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "clockSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeHistorySysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "withdrawAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "unstakedLamports",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u32",
        value: 4,
      },
    },
    {
      name: "Deactivate",
      accounts: [
        {
          name: "delegatedStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "clockSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 5,
      },
    },
    {
      name: "SetLockup",
      accounts: [
        {
          name: "initializedStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lockupOrWithdrawAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "lockup",
          type: {
            defined: "Lockup",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 6,
      },
    },
    {
      name: "Merge",
      accounts: [
        {
          name: "destinationStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sourceStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "clockSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeHistorySysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 7,
      },
    },
    {
      name: "AuthorizeWithSeed",
      accounts: [
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeOrWithdrawAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "clockSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "lockupAuthority",
          isMut: false,
          isSigner: true,
          isOptional: true,
        },
      ],
      args: [
        {
          name: "authorizeWithSeedArgs",
          type: {
            defined: "AuthorizeWithSeedArgs",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 8,
      },
    },
    {
      name: "InitializeChecked",
      accounts: [
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rentSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "withdrawAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 9,
      },
    },
    {
      name: "AuthorizeChecked",
      accounts: [
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "clockSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "newStakeAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "lockupAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "stakeAuthorize",
          type: {
            defined: "StakeAuthorize",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 10,
      },
    },
    {
      name: "AuthorizeCheckedWithSeed",
      accounts: [
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "clockSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "newStakeAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "lockupAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "authorizeWithSeedArgs",
          type: {
            defined: "AuthorizeWithSeedArgs",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 11,
      },
    },
    {
      name: "SetLockupChecked",
      accounts: [
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lockupOrWithdrawAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "newLockupAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "lockupCheckedArgs",
          type: {
            defined: "LockupCheckedArgs",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 12,
      },
    },
    {
      name: "GetMinimumDelegation",
      accounts: [],
      args: [],
      discriminant: {
        type: "u32",
        value: 13,
      },
    },
    {
      name: "DeactivateDelinquent",
      accounts: [
        {
          name: "delegatedStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "delinquentVoteAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "referenceVoteAccount",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 14,
      },
    },
    {
      name: "Redelegate",
      accounts: [
        {
          name: "delegatedStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "uninitializedStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "voteAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 15,
      },
    },
  ],
  types: [
    {
      name: "LockupCheckedArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "unix_timestamp",
            type: {
              option: "i64",
            },
          },
          {
            name: "epoch",
            type: {
              option: "u64",
            },
          },
        ],
      },
    },
    {
      name: "AuthorizeWithSeedArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "stake_authorize",
            type: {
              defined: "StakeAuthorize",
            },
          },
          {
            name: "authority_seed",
            type: "string",
          },
          {
            name: "authority_owner",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "StakeAuthorize",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Staker",
          },
          {
            name: "Withdrawer",
          },
        ],
        size: "u32",
      },
    },
    {
      name: "Delegation",
      type: {
        kind: "struct",
        fields: [
          {
            name: "voter_pubkey",
            type: "publicKey",
          },
          {
            name: "stake",
            type: "u64",
          },
          {
            name: "activation_epoch",
            type: "u64",
          },
          {
            name: "deactivation_epoch",
            type: "u64",
          },
          {
            name: "warmup_cooldown_rate",
            type: "f64",
          },
        ],
      },
    },
    {
      name: "Stake",
      type: {
        kind: "struct",
        fields: [
          {
            name: "delegation",
            type: {
              defined: "Delegation",
            },
          },
          {
            name: "credits_observed",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "Meta",
      type: {
        kind: "struct",
        fields: [
          {
            name: "rent_exempt_reserve",
            type: "u64",
          },
          {
            name: "authorized",
            type: {
              defined: "Authorized",
            },
          },
          {
            name: "lockup",
            type: {
              defined: "Lockup",
            },
          },
        ],
      },
    },
    {
      name: "Authorized",
      type: {
        kind: "struct",
        fields: [
          {
            name: "staker",
            type: "publicKey",
          },
          {
            name: "withdrawer",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "Lockup",
      type: {
        kind: "struct",
        fields: [
          {
            name: "unix_timestamp",
            type: "i64",
          },
          {
            name: "epoch",
            type: "u64",
          },
          {
            name: "custodian",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "Stake11111111111111111111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
