import { Idl } from "@solanafm/kinobi-lite";

export const VoteIDL: Idl = {
  version: "0.0.1",
  name: "vote",
  accounts: [
    {
      name: "Uninitialized",
      type: {
        kind: "struct",
        fields: [],
      },
    },
    {
      name: "VoteState",
      type: {
        kind: "struct",
        fields: [
          {
            name: "node_pubkey",
            type: "publicKey",
          },
          {
            name: "authorized_withdrawer",
            type: "publicKey",
          },
          {
            name: "commission",
            type: "u8",
          },
          {
            name: "votes",
            type: {
              vec: {
                defined: "Lockout",
              },
              size: "u64",
            },
          },
          {
            name: "root_slot",
            type: {
              option: "u64",
            },
          },
          {
            name: "authorized_voters",
            type: {
              bTreeMap: ["u64", "publicKey"],
              size: "u64",
            },
          },
          {
            name: "prior_voters",
            type: {
              defined: "PriorVoters",
            },
          },
          {
            name: "epoch_credits",
            type: {
              vec: {
                tuple: [
                  {
                    defined: "Epoch",
                  },
                  {
                    defined: "Credits",
                  },
                  {
                    defined: "PrevCredits",
                  },
                ],
              },
              size: "u64",
            },
          },
          {
            name: "last_timestamp",
            type: {
              defined: "BlockTimestamp",
            },
          },
        ],
      },
    },
    {
      name: "VoteStateWithLatency",
      type: {
        kind: "struct",
        fields: [
          {
            name: "node_pubkey",
            type: "publicKey",
          },
          {
            name: "authorized_withdrawer",
            type: "publicKey",
          },
          {
            name: "commission",
            type: "u8",
          },
          {
            name: "votes",
            type: {
              vec: {
                defined: "LandedVote",
              },
              size: "u64",
            },
          },
          {
            name: "root_slot",
            type: {
              option: "u64",
            },
          },
          {
            name: "authorized_voters",
            type: {
              bTreeMap: ["u64", "publicKey"],
              size: "u64",
            },
          },
          {
            name: "prior_voters",
            type: {
              defined: "PriorVoters",
            },
          },
          {
            name: "epoch_credits",
            type: {
              vec: {
                tuple: [
                  {
                    defined: "Epoch",
                  },
                  {
                    defined: "Credits",
                  },
                  {
                    defined: "PrevCredits",
                  },
                ],
              },
              size: "u64",
            },
          },
          {
            name: "last_timestamp",
            type: {
              defined: "BlockTimestamp",
            },
          },
        ],
      },
    },
  ],
  instructions: [
    {
      name: "Initialize",
      accounts: [
        {
          name: "voteAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rentSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clockSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "nodePubkey",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "voteInit",
          type: {
            defined: "VoteInit",
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
          name: "voteAccount",
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
      ],

      args: [
        {
          name: "newAuthorizedPubkey",
          type: "publicKey",
        },
        {
          name: "voteAuthorizeType",
          type: {
            defined: "VoteAuthorize",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 1,
      },
    },
    {
      name: "Vote",
      accounts: [
        {
          name: "voteAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "slotHashesSysvar",
          isMut: false,
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
      ],

      args: [
        {
          name: "vote",
          type: {
            defined: "Vote",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 2,
      },
    },
    {
      name: "Withdraw",
      accounts: [
        {
          name: "voteAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recipientAccount",
          isMut: true,
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
          name: "withdrawAmount",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u32",
        value: 3,
      },
    },
    {
      name: "UpdateValidatorIdentity",
      accounts: [
        {
          name: "voteAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newValidatorIdentity",
          isMut: false,
          isSigner: true,
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
        value: 4,
      },
    },
    {
      name: "UpdateCommission",
      accounts: [
        {
          name: "voteAccount",
          isMut: true,
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
          name: "commissionAmount",
          type: "u8",
        },
      ],
      discriminant: {
        type: "u32",
        value: 5,
      },
    },
    {
      name: "VoteSwitch",
      accounts: [
        {
          name: "voteAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "slotHashesSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clockSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "voteAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "vote",
          type: {
            defined: "Vote",
          },
        },
        {
          name: "hash",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u32",
        value: 6,
      },
    },
    {
      name: "AuthorizeChecked",
      accounts: [
        {
          name: "voteAccount",
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
          name: "newAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "voteAuthorize",
          type: {
            defined: "VoteAuthorize",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 7,
      },
    },
    {
      name: "UpdateVoteState",
      accounts: [
        {
          name: "voteAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "voteAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "voteStateUpdate",
          type: {
            defined: "VoteStateUpdate",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 8,
      },
    },
    {
      name: "UpdateVoteStateSwitch",
      accounts: [
        {
          name: "voteAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "voteAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "voteStateUpdate",
          type: {
            defined: "VoteStateUpdate",
          },
        },
        {
          name: "hash",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u32",
        value: 9,
      },
    },
    {
      name: "AuthorizeWithSeed",
      accounts: [
        {
          name: "voteAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "clockSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authorityBaseKey",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "voteAuthorizeWithSeed",
          type: {
            defined: "VoteAuthorizeWithSeed",
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
          name: "voteAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "clockSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "currentAuthorityBaseKey",
          isMut: false,
          isSigner: true,
        },
        {
          name: "newAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "voteAuthorizeCheckedWithSeed",
          type: {
            defined: "VoteAuthorizeCheckedWithSeed",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 11,
      },
    },
    {
      name: "CompactUpdateVoteState",
      accounts: [
        {
          name: "voteAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "voteAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "compactVoteState",
          type: {
            defined: "CompactVoteState",
          },
        },
      ],
      discriminant: {
        type: "u32",
        value: 12,
      },
    },
    {
      name: "CompactUpdateVoteStateSwitch",
      accounts: [
        {
          name: "voteAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "voteAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "compactVoteState",
          type: {
            defined: "CompactVoteState",
          },
        },
        {
          name: "hash",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u32",
        value: 13,
      },
    },
  ],
  types: [
    {
      name: "ShortLockout",
      type: {
        kind: "struct",
        fields: [
          {
            name: "offset",
            type: "u8",
          },
          {
            name: "confirmationCount",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "CompactVoteState",
      type: {
        kind: "struct",
        fields: [
          {
            name: "root",
            type: "u64",
          },
          {
            name: "lockoutOffsets",
            type: {
              vec: {
                defined: "ShortLockout",
              },
              size: "u8",
            },
          },
          {
            name: "hash",
            type: "publicKey",
          },
          {
            name: "timestamp",
            type: {
              option: "i64",
            },
          },
        ],
      },
    },
    {
      name: "VoteAuthorizeCheckedWithSeed",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authorizationType",
            type: {
              defined: "VoteAuthorize",
            },
          },
          {
            name: "currentAuthorityDerivedKeyOwner",
            type: "publicKey",
          },
          {
            name: "currentAuthorityDerivedKeySeed",
            type: "string",
          },
        ],
      },
    },
    {
      name: "VoteAuthorizeWithSeed",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authorizationType",
            type: {
              defined: "VoteAuthorize",
            },
          },
          {
            name: "currentAuthorityDerivedKeyOwner",
            type: "publicKey",
          },
          {
            name: "currentAuthorityDerivedKeySeed",
            type: "string",
          },
          {
            name: "newAuthority",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "VoteStateUpdate",
      type: {
        kind: "struct",
        fields: [
          {
            name: "lockouts",
            type: {
              vec: {
                defined: "Lockout",
              },
              size: "u64",
            },
          },
          {
            name: "root",
            type: {
              option: "u64",
            },
          },
          {
            name: "hash",
            type: "publicKey",
          },
          {
            name: "timestamp",
            type: {
              option: "i64",
            },
          },
        ],
      },
    },
    {
      name: "Vote",
      type: {
        kind: "struct",
        fields: [
          {
            name: "slots",
            type: {
              vec: "u64",
              size: "u64",
            },
          },
          {
            name: "hash",
            type: "publicKey",
          },
          {
            name: "timestamp",
            type: {
              option: "i64",
            },
          },
        ],
      },
    },
    {
      name: "VoteAuthorize",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Voter",
          },
          { name: "Withdrawer" },
        ],
        size: "u32",
      },
    },
    {
      name: "VoteInit",
      type: {
        kind: "struct",
        fields: [
          {
            name: "nodePubkey",
            type: "publicKey",
          },
          {
            name: "authorizedVoter",
            type: "publicKey",
          },
          {
            name: "authorizedWithdrawer",
            type: "publicKey",
          },
          {
            name: "commission",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "Epoch",
      type: {
        kind: "struct",
        fields: [
          {
            name: "epoch",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "Credits",
      type: {
        kind: "struct",
        fields: [
          {
            name: "credits",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "PrevCredits",
      type: {
        kind: "struct",
        fields: [
          {
            name: "prevCredits",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "PriorVoters",
      type: {
        kind: "struct",
        fields: [
          {
            name: "buf",
            type: {
              array: [
                {
                  tuple: ["publicKey", "u64", "u64"],
                },
                32,
              ],
            },
          },
          {
            name: "idx",
            type: "u64",
          },
          {
            name: "is_empty",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "Lockout",
      type: {
        kind: "struct",
        fields: [
          {
            name: "slot",
            type: "u64",
          },
          {
            name: "confirmation_count",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "BlockTimestamp",
      type: {
        kind: "struct",
        fields: [
          {
            name: "slot",
            type: "u64",
          },
          {
            name: "timestamp",
            type: "i64",
          },
        ],
      },
    },
    {
      name: "LandedVote",
      type: {
        kind: "struct",
        fields: [
          {
            name: "latency",
            type: "u8",
          },
          {
            name: "lockout",
            type: {
              defined: "Lockout",
            },
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "Vote111111111111111111111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
