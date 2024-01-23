import { Idl } from "@solanafm/kinobi-lite";

export const ConfidentialTransferExtensionIDL: Idl = {
  version: "0.1.0",
  name: "ConfidentialTransferExtension",
  instructions: [
    {
      name: "initializeMint",
      accounts: [
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "initializeMintData",
          type: {
            defined: "InitializeMintData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "updateMint",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "updateMintData",
          type: {
            defined: "UpdateMintData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
    {
      name: "configureAccount",
      accounts: [
        {
          name: "tokenAccount",
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
          isSigner: false,
        },
        {
          name: "instructions",
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
          name: "configureAccountInstructionData",
          type: {
            defined: "ConfigureAccountInstructionData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 2,
      },
    },
    {
      name: "approveAccount",
      accounts: [
        {
          name: "approvingAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 3,
      },
    },
    {
      name: "emptyAccount",
      accounts: [
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "instructions",
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
          name: "emptyAccountInstructionData",
          type: {
            defined: "EmptyAccountInstructionData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 4,
      },
    },
    {
      name: "deposit",
      accounts: [
        {
          name: "tokenAccount",
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
      args: [
        {
          name: "depositInstructionData",
          type: {
            defined: "DepositInstructionData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 5,
      },
    },
    {
      name: "withdraw",
      accounts: [
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "instructions",
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
          name: "withdrawInstructionData",
          type: {
            defined: "WithdrawInstructionData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 6,
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
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "instructions",
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
          name: "transferInstructionData",
          type: {
            defined: "TransferInstructionData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 7,
      },
    },
    {
      name: "applyPendingBalance",
      accounts: [
        {
          name: "tokenAccount",
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
          name: "applyPendingBalanceData",
          type: {
            defined: "ApplyPendingBalanceData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 8,
      },
    },
    {
      name: "enableConfidentialCredits",
      accounts: [
        {
          name: "tokenAccount",
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
        value: 9,
      },
    },
    {
      name: "disableConfidentialCredits",
      accounts: [
        {
          name: "tokenAccount",
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
        value: 10,
      },
    },
    {
      name: "enableNonConfidentialCredits",
      accounts: [
        {
          name: "tokenAccount",
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
        value: 11,
      },
    },
    {
      name: "disableNonConfidentialCredits",
      accounts: [
        {
          name: "tokenAccount",
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
        value: 12,
      },
    },
  ],
  accounts: [],
  types: [
    {
      name: "InitializeMintData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "auto_approve_new_accounts",
            type: "u8",
          },
          {
            name: "auditor_elgamal_pubkey",
            type: {
              array: ["u8", 32],
            },
          },
        ],
      },
    },
    {
      name: "UpdateMintData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "auto_approve_new_accounts",
            type: "u8",
          },
          {
            name: "auditor_elgamal_pubkey",
            type: {
              array: ["u8", 32],
            },
          },
        ],
      },
    },
    {
      name: "ConfigureAccountInstructionData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "decryptable_zero_balance",
            type: {
              array: ["u8", 36],
            },
          },
          {
            name: "maximum_pending_balance_credit_counter",
            type: "u64",
          },
          {
            name: "proof_instruction_offset",
            type: "i8",
          },
        ],
      },
    },
    {
      name: "EmptyAccountInstructionData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "proof_insruction_offset",
            type: "i8",
          },
        ],
      },
    },
    {
      name: "DepositInstructionData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amount",
            type: {
              array: ["u8", 8],
            },
          },
          {
            name: "decimals",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "WithdrawInstructionData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amount",
            type: {
              array: ["u8", 8],
            },
          },
          {
            name: "decimals",
            type: "u8",
          },
          {
            name: "new_deryptable_available_balance",
            type: {
              array: ["u8", 36],
            },
          },
          {
            name: "proof_instruction_offset",
            type: "i8",
          },
        ],
      },
    },
    {
      name: "TransferInstructionData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "new_source_decryptable_available_balance",
            type: {
              array: ["u8", 36],
            },
          },
          {
            name: "proof_instruction_offset",
            type: "i8",
          },
        ],
      },
    },
    {
      name: "ApplyPendingBalanceData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "expected_pending_balance_credit_counter",
            type: {
              array: ["u8", 8],
            },
          },
          {
            name: "new_decryptable_available_balance",
            type: {
              array: ["u8", 36],
            },
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
    binaryVersion: "0.1.0",
    libVersion: "0.1.0",
  },
};
