import { Idl } from "@solanafm/kinobi-lite";

export const TokenIDL: Idl = {
  version: "3.5.0",
  name: "spl-token",
  instructions: [
    {
      name: "initializeMint",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "decimals",
          type: "u8",
        },
        {
          name: "mintAuthority",
          type: "publicKey",
        },
        {
          name: "freezeAuthority",
          type: {
            coption: "publicKey",
            prefix: "u8",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "initializeAccount",
      accounts: [
        {
          name: "accountToInitialize",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rentSysvar",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
    {
      name: "initializeMultisig",
      accounts: [
        {
          name: "multisig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "noOfSignersRequired",
          type: "u8",
        },
      ],
      discriminant: {
        type: "u8",
        value: 2,
      },
    },
    {
      name: "transfer",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 3,
      },
    },
    {
      name: "approve",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "delegate",
          isMut: false,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 4,
      },
    },
    {
      name: "revoke",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 5,
      },
    },
    {
      name: "setAuthority",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "currentAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "authorityType",
          type: {
            defined: "AuthorityType",
          },
        },
        {
          name: "newAuthority",
          type: {
            coption: "publicKey",
            prefix: "u8",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 6,
      },
    },
    {
      name: "mintTo",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintTo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 7,
      },
    },
    {
      name: "burn",
      accounts: [
        {
          name: "burnAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 8,
      },
    },
    {
      name: "closeAccount",
      accounts: [
        {
          name: "closeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 9,
      },
    },
    {
      name: "freezeAccount",
      accounts: [
        {
          name: "freezeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 10,
      },
    },
    {
      name: "thawAccount",
      accounts: [
        {
          name: "thawAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 11,
      },
    },
    {
      name: "transferChecked",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "decimals",
          type: "u8",
        },
      ],
      discriminant: {
        type: "u8",
        value: 12,
      },
    },
    {
      name: "approveChecked",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "delegate",
          isMut: false,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "decimals",
          type: "u8",
        },
      ],
      discriminant: {
        type: "u8",
        value: 13,
      },
    },
    {
      name: "mintToChecked",
      accounts: [
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintTo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "decimals",
          type: "u8",
        },
      ],
      discriminant: {
        type: "u8",
        value: 14,
      },
    },
    {
      name: "burnChecked",
      accounts: [
        {
          name: "burnAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "decimals",
          type: "u8",
        },
      ],
      discriminant: {
        type: "u8",
        value: 15,
      },
    },
    {
      name: "initializeAccount2",
      accounts: [
        {
          name: "initializeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "associatedMint",
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
          name: "owner",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u8",
        value: 16,
      },
    },
    {
      name: "syncNative",
      accounts: [
        {
          name: "nativeTokenAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 17,
      },
    },
    {
      name: "initializeAccount3",
      accounts: [
        {
          name: "initializeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "associatedMint",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "owner",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u8",
        value: 18,
      },
    },
    {
      name: "initializeMultisig2",
      accounts: [
        {
          name: "initializeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "m",
          type: "u8",
        },
      ],
      discriminant: {
        type: "u8",
        value: 19,
      },
    },
    {
      name: "initializeMint2",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "decimals",
          type: "u8",
        },
        {
          name: "mintAuthority",
          type: "publicKey",
        },
        {
          name: "freezeAuthority",
          type: {
            coption: "publicKey",
            prefix: "u8",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 20,
      },
    },
    {
      name: "getAccountDataSize",
      accounts: [
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 21,
      },
    },
    {
      name: "initializeImmutableOwner",
      accounts: [
        {
          name: "initializeAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 22,
      },
    },
    {
      name: "amountToUiAmount",
      accounts: [
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 23,
      },
    },
    {
      name: "uiAmountToAmount",
      accounts: [
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "uiAmount",
          type: "string",
        },
      ],
      discriminant: {
        type: "u8",
        value: 24,
      },
    },
  ],
  accounts: [
    {
      name: "MintAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "mint_authority",
            type: {
              coption: "publicKey",
              prefix: "u32",
            },
          },
          {
            name: "supply",
            type: "u64",
          },
          {
            name: "decimals",
            type: "u8",
          },
          {
            name: "is_initialized",
            type: "bool",
          },
          {
            name: "freeze_authority",
            type: {
              coption: "publicKey",
              prefix: "u32",
            },
          },
        ],
      },
    },
    {
      name: "TokenAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "delegate",
            type: {
              coption: "publicKey",
              prefix: "u32",
            },
          },
          {
            name: "state",
            type: {
              defined: "AccountState",
            },
          },
          {
            name: "is_native",
            type: {
              coption: "u64",
              prefix: "u32",
            },
          },
          {
            name: "delegated_amount",
            type: "u64",
          },
          {
            name: "close_authority",
            type: {
              coption: "publicKey",
              prefix: "u32",
            },
          },
        ],
      },
    },
    {
      name: "MultisigAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "num_of_signers_required",
            type: "u8",
          },
          {
            name: "num_of_valid_signers_required",
            type: "u8",
          },
          {
            name: "is_initialized",
            type: "bool",
          },
          {
            name: "signers",
            type: {
              array: ["publicKey", 11],
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "AccountState",
      type: {
        kind: "enum",
        size: "u8",
        variants: [
          {
            name: "Uninitialized",
          },
          {
            name: "Initialized",
          },
          {
            name: "Frozen",
          },
        ],
      },
    },
    {
      name: "AuthorityType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "MintTokens",
          },
          {
            name: "FreezeAccount",
          },
          {
            name: "AccountOwner",
          },
          {
            name: "CloseAccount",
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    binaryVersion: "3.5.0",
    libVersion: "3.5.0",
  },
};
