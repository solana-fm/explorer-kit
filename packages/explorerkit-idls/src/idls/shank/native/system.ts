import { Idl } from "@solanafm/kinobi-lite";

export const SystemIDL: Idl = {
  version: "0.0.1",
  name: "system",
  accounts: [
    {
      name: "UninitializedNonceAccount",
      type: {
        kind: "struct",
        fields: [],
      },
    },
    {
      name: "InitializedNonceAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "state",
            type: {
              kind: "enum",
              variants: [
                {
                  name: "Uninitialized",
                },
                {
                  name: "Initialized",
                },
              ],
              size: "u32",
            },
          },
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "durableNonce",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "feeCalculator",
            type: {
              kind: "struct",
              fields: [
                {
                  name: "lamportsPerSignature",
                  type: "u64",
                },
              ],
            },
          },
        ],
      },
    },
  ],
  instructions: [
    {
      name: "CreateAccount",
      accounts: [
        {
          name: "fundingAccount",
          isMut: true,
          isSigner: true,
        },
        {
          name: "newAccount",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "lamports",
          type: "u64",
        },
        {
          name: "space",
          type: "u64",
        },
        {
          name: "owner",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u32",
        value: 0,
      },
    },
    {
      name: "Assign",
      accounts: [
        {
          name: "assignAccount",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "owner",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u32",
        value: 1,
      },
    },
    {
      name: "Transfer",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: true,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "lamports",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u32",
        value: 2,
      },
    },
    {
      name: "CreateAccountWithSeed",
      accounts: [
        {
          name: "fundingAccount",
          isMut: true,
          isSigner: true,
        },
        {
          name: "createdAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "baseAccount",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "base",
          type: "publicKey",
        },
        {
          name: "seed",
          type: "string",
        },
        {
          name: "lamports",
          type: "u64",
        },
        {
          name: "space",
          type: "u64",
        },
        {
          name: "owner",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u32",
        value: 3,
      },
    },
    {
      name: "AdvanceNonceAccount",
      accounts: [
        {
          name: "nonceAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recentBlockhashesSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "nonceAuthority",
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
      name: "WithdrawNonceAccount",
      accounts: [
        {
          name: "nonceAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recipientAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recentBlockhashesSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rentSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "nonceAuthority",
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
        value: 5,
      },
    },
    {
      name: "InitializeNonceAccount",
      accounts: [
        {
          name: "nonceAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recentBlockhashesSysvar",
          isMut: false,
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
          name: "nonceAccount",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u32",
        value: 6,
      },
    },
    {
      name: "AuthorizeNonceAccount",
      accounts: [
        {
          name: "nonceAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nonceAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "nonceAccount",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u32",
        value: 7,
      },
    },
    {
      name: "Allocate",
      accounts: [
        {
          name: "newAccount",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "space",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u32",
        value: 8,
      },
    },
    {
      name: "AllocateWithSeed",
      accounts: [
        {
          name: "allocatedAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "baseAccount",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "base",
          type: "publicKey",
        },
        {
          name: "seed",
          type: "string",
        },
        {
          name: "space",
          type: "u64",
        },
        {
          name: "owner",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u32",
        value: 9,
      },
    },
    {
      name: "AssignWithSeed",
      accounts: [
        {
          name: "assignedAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "baseAccount",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "base",
          type: "publicKey",
        },
        {
          name: "seed",
          type: "string",
        },
        {
          name: "owner",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u32",
        value: 10,
      },
    },
    {
      name: "TransferWithSeed",
      accounts: [
        {
          name: "fundingAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "baseAccount",
          isMut: false,
          isSigner: true,
        },
        {
          name: "recipientAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "lamports",
          type: "u64",
        },
        {
          name: "fromSeed",
          type: "string",
        },
        {
          name: "fromOwner",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u32",
        value: 11,
      },
    },
    {
      name: "UpgradeNonceAccount",
      accounts: [
        {
          name: "nonceAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u32",
        value: 12,
      },
    },
  ],
  types: [],
  errors: [
    {
      code: 0,
      name: "AccountAlreadyInUse",
      msg: "an account with the same address already exists",
    },
    {
      code: 1,
      name: "ResultWithNegativeLamports",
      msg: "account does not have enough SOL to perform the operation",
    },
    {
      code: 2,
      name: "InvalidProgramId",
      msg: "cannot assign account to this program id",
    },
    {
      code: 3,
      name: "InvalidAccountDataLength",
      msg: "cannot allocate account data of this length",
    },
    {
      code: 4,
      name: "MaxSeedLengthExceeded",
      msg: "length of requested seed is too long",
    },
    {
      code: 5,
      name: "AddressWithSeedMismatch",
      msg: "provided address does not match addressed derived from seed",
    },
    {
      code: 6,
      name: "NonceNoRecentBlockhashes",
      msg: "advancing stored nonce requires a populated RecentBlockhashes sysvar",
    },
    {
      code: 7,
      name: "NonceBlockhashNotExpired",
      msg: "stored nonce is still in recent_blockhashes",
    },
    {
      code: 8,
      name: "NonceUnexpectedBlockhashValue",
      msg: "specified nonce does not match stored nonce",
    },
  ],
  metadata: {
    origin: "shank",
    address: "11111111111111111111111111111111",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
