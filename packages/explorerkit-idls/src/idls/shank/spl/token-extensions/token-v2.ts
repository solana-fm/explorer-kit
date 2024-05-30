import { Idl } from "@solanafm/kinobi-lite";

export const Token2022IDL: Idl = {
  version: "0.7.0",
  name: "spl-token-2022",
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
          name: "rent",
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
          name: "signer1",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer2",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer3",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer4",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer5",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer6",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer7",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer8",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer9",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer10",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer11",
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
          name: "tokenMint",
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
          name: "rent",
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
          name: "signer1",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer2",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer3",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer4",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer5",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer6",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer7",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer8",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer9",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer10",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer11",
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
      args: [
        {
          name: "extensionType",
          type: {
            defined: "ExtensionTypeArray",
          },
        },
      ],
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
    {
      name: "initializeMintCloseAuthority",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "closeAuthority",
          type: {
            coption: "publicKey",
            prefix: "u8",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 25,
      },
    },
    // This part onwards is new from token-2022
    {
      name: "transferFeeExtension",
      accounts: [],
      args: [],
      discriminant: {
        type: "u8",
        value: 26,
      },
    },
    {
      name: "confidentialTransferExtension",
      accounts: [],
      args: [],
      discriminant: {
        type: "u8",
        value: 27,
      },
    },
    {
      name: "defaultAccountStateExtension",
      accounts: [],
      args: [],
      discriminant: {
        type: "u8",
        value: 28,
      },
    },
    {
      name: "reallocate",
      accounts: [
        {
          name: "reallocatedAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
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
          name: "extensionType",
          type: {
            defined: "ExtensionTypeArray",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 29,
      },
    },
    {
      name: "memoTransferExtension",
      accounts: [],
      args: [],
      discriminant: {
        type: "u8",
        value: 30,
      },
    },
    {
      name: "createNativeMint",
      accounts: [
        {
          name: "fundingAccount",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "fundingAccount",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 31,
      },
    },
    {
      name: "initializeNonTransferableMint",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 32,
      },
    },
    {
      name: "interestBearingMintExtension",
      accounts: [],
      args: [],
      discriminant: {
        type: "u8",
        value: 33,
      },
    },
    {
      name: "cpiGuardExtension",
      accounts: [],
      args: [],
      discriminant: {
        type: "u8",
        value: 34,
      },
    },
    {
      name: "initializePermanentDelegate",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "delegate",
          type: "publicKey",
        },
      ],
      discriminant: {
        type: "u8",
        value: 35,
      },
    },
    {
      name: "transferHookExtension",
      accounts: [],
      args: [],
      discriminant: {
        type: "u8",
        value: 36,
      },
    },
    {
      name: "confidentialTransferFeeExtension",
      accounts: [],
      args: [],
      discriminant: {
        type: "u8",
        value: 37,
      },
    },
    {
      name: "withdrawExcessLamports",
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
      args: [],
      discriminant: {
        type: "u8",
        value: 38,
      },
    },
    {
      name: "metadataPointerExtension",
      accounts: [],
      args: [],
      discriminant: {
        type: "u8",
        value: 39,
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
      name: "AccountType",
      type: {
        kind: "enum",
        size: "u8",
        variants: [{ name: "Uninitialized" }, { name: "Mint" }, { name: "Account" }],
      },
    },
    {
      name: "AuthorityType",
      type: {
        kind: "enum",
        size: "u8",
        variants: [
          { name: "MintTokens" },
          { name: "FreezeAccount" },
          { name: "AccountOwner" },
          { name: "CloseAccount" },
          { name: "TransferFeeConfig" },
          { name: "WithheldWithdraw" },
          { name: "CloseMint" },
          { name: "InterestRate" },
          { name: "PermanentDelegate" },
          { name: "ConfidentialTransferMint" },
          { name: "TransferHookProgramId" },
          { name: "ConfidentialTransferFeeConfig" },
          { name: "MetadataPointer" },
        ],
      },
    },
    {
      name: "ExtensionTypeArray",
      type: {
        kind: "struct",
        fields: [
          {
            name: "ExtensionType",
            type: {
              vec: {
                defined: "ExtensionType",
              },
              size: "remainder",
            },
          },
        ],
      },
    },
    {
      name: "ExtensionTypeWithFields",
      type: {
        kind: "enum",
        size: "u16",
        variants: [
          { name: "Uninitialized" },
          {
            name: "TransferFeeConfig",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "transferFeeConfigAuthority",
                type: "publicKey",
              },
              {
                name: "withdrawWithheldAuthority",
                type: "publicKey",
              },
              {
                name: "withheldAmount",
                type: "u64",
              },
              {
                name: "olderTransferFee",
                type: {
                  defined: "TransferFee",
                },
              },
              {
                name: "newerTransferFee",
                type: {
                  defined: "TransferFee",
                },
              },
            ],
          },
          {
            name: "TransferFeeAmount",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "withheldAmount",
                type: "u64",
              },
            ],
          },
          {
            name: "MintCloseAuthority",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "closeAuthority",
                type: "publicKey",
              },
            ],
          },
          {
            name: "ConfidentialTransferMint",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "authority",
                type: "publicKey",
              },
              {
                name: "autoApproveNewAccounts",
                type: "bool",
              },
              {
                name: "auditorElgamalPubkey",
                type: "publicKey",
              },
            ],
          },
          {
            name: "ConfidentialTransferAccount",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "approved",
                type: "bool",
              },
              {
                name: "elgamal_pubkey",
                type: "publicKey",
              },
              {
                name: "pending_balance_lo",
                type: {
                  array: ["u8", 64],
                },
              },
              {
                name: "pending_balance_hi",
                type: {
                  array: ["u8", 64],
                },
              },
              {
                name: "available_balance",
                type: {
                  array: ["u8", 64],
                },
              },
              {
                name: "decryptable_available_balance",
                type: {
                  array: ["u8", 36],
                },
              },
              {
                name: "allow_confidential_credits",
                type: "bool",
              },
              {
                name: "allow_non_confidential_credits",
                type: "bool",
              },
              {
                name: "pending_balance_credit_counter",
                type: "u64",
              },
              {
                name: "maximum_pending_balance_credit_counter",
                type: "u64",
              },
              {
                name: "expected_pending_balance_credit_counter",
                type: "u64",
              },
              {
                name: "actual_pending_balance_credit_counter",
                type: "u64",
              },
            ],
          },
          {
            name: "DefaultAccountState",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "defaultAccountState",
                type: {
                  defined: "AccountState",
                },
              },
            ],
          },
          {
            name: "ImmutableOwner",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
            ],
          },
          {
            name: "MemoTransfer",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "requireIncomingTransferMemos",
                type: "bool",
              },
            ],
          },
          {
            name: "NonTransferable",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
            ],
          },
          {
            name: "InterestBearingConfig",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "rate",
                type: "publicKey",
              },
              {
                name: "initializationTimestamp",
                type: "i64",
              },
              {
                name: "preUpdateAverageRate",
                type: "i16",
              },
              {
                name: "lastUpdateTimestamp",
                type: "i64",
              },
              {
                name: "currentRate",
                type: "i16",
              },
            ],
          },
          {
            name: "CpiGuard",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "lockCpi",
                type: "bool",
              },
            ],
          },
          {
            name: "PermanentDelegate",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "delegate",
                type: "publicKey",
              },
            ],
          },
          {
            name: "NonTransferableAccount",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
            ],
          },
          {
            name: "TransferHook",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "authority",
                type: "publicKey",
              },
              {
                name: "programId",
                type: "publicKey",
              },
            ],
          },
          {
            name: "TransferHookAccount",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "transferring",
                type: "bool",
              },
            ],
          },
          {
            name: "ConfidentialTransferFeeConfig",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "authority",
                type: "publicKey",
              },
              {
                name: "withdrawWithheldAuthorityElgamalPubkey",
                type: "publicKey",
              },
              {
                name: "harvestToMintEnabled",
                type: "bool",
              },
              {
                name: "withheldAmount",
                type: {
                  array: ["u8", 64],
                },
              },
            ],
          },
          {
            name: "ConfidentialTransferFeeAmount",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "withheldAmount",
                type: {
                  array: ["u8", 64],
                },
              },
            ],
          },
          {
            name: "MetadataPointer",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "authority",
                type: "publicKey",
              },
              {
                name: "metadataAddress",
                type: "publicKey",
              },
            ],
          },
          {
            name: "TokenMetadata",
            fields: [
              {
                name: "extensionLength",
                type: "u16",
              },
              {
                name: "updateAuthority",
                type: "publicKey",
              },
              {
                name: "mint",
                type: "publicKey",
              },
              {
                name: "name",
                type: "string",
              },
              {
                name: "symbol",
                type: "string",
              },
              {
                name: "uri",
                type: "string",
              },
              {
                name: "additionalMetadata",
                type: {
                  hashMap: ["string", "string"],
                },
              },
            ],
          },
        ],
      },
    },
    {
      name: "ExtensionType",
      type: {
        kind: "enum",
        size: "u16",
        variants: [
          { name: "Uninitialized" },
          { name: "TransferFeeConfig" },
          { name: "TransferFeeAmount" },
          { name: "MintCloseAuthority" },
          { name: "ConfidentialTransferMint" },
          { name: "ConfidentialTransferAccount" },
          { name: "DefaultAccountState" },
          { name: "ImmutableOwner" },
          { name: "MemoTransfer" },
          { name: "NonTransferable" },
          { name: "InterestBearingConfig" },
          { name: "CpiGuard" },
          { name: "PermanentDelegate" },
          { name: "NonTransferableAccount" },
          { name: "TransferHook" },
          { name: "TransferHookAccount" },
          { name: "ConfidentialTransferFeeConfig" },
          { name: "ConfidentialTransferFeeAmount" },
          { name: "MetadataPointer" },
          { name: "TokenMetadata" },
        ],
      },
    },
    {
      name: "TransferFee",
      type: {
        kind: "struct",
        fields: [
          {
            name: "epoch",
            type: "u64",
          },
          {
            name: "maximumFee",
            type: "u64",
          },
          {
            name: "transferFeeBasisPoints",
            type: "u16",
          },
        ],
      },
    },
    {
      name: "BasisPoints",
      type: {
        kind: "struct",
        fields: [
          {
            name: "BasisPoints",
            type: {
              array: ["u8", 2],
            },
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
    binaryVersion: "0.7.0",
    libVersion: "0.7.0",
  },
};
