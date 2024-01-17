import { Idl } from "@solanafm/kinobi-lite";

export const ConfidentialTransferFeeExtensionIDL: Idl = {
  version: "0.1.0",
  name: "ConfidentialTransferFee",
  instructions: [
    {
      name: "initializeConfidentialTransferFeeConfig",
      accounts: [
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "initializeConfidentialTransferFeeConfigData",
          type: {
            defined: "InitializeConfidentialTransferFeeConfigData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "WithdrawWithheldTokensFromMint",
      accounts: [
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeReceiver",
          isMut: true,
          isSigner: false,
        },
        {
          name: "instructionsSysvarOrContextStateAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "withdrawWithheldAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "withdrawWithheldTokensFromMintData",
          type: {
            defined: "WithdrawWithheldTokensFromMintData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
    {
      name: "WithdrawWithheldTokensFromAccounts",
      accounts: [
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeReceiver",
          isMut: true,
          isSigner: false,
        },
        {
          name: "instructionsSysvarOrContextStateAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "withdrawWithheldAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "withdrawWithheldTokensFromAccountsData",
          type: {
            defined: "WithdrawWithheldTokensFromAccountsData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 2,
      },
    },
    {
      name: "HarvestWithheldTokensToMint",
      accounts: [
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sourceAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 3,
      },
    },
    {
      name: "EnableHarvestToMint",
      accounts: [
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sourceAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 4,
      },
    },
    {
      name: "DisableHarvestToMint",
      accounts: [
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "confidentialTransferFeeAuthority",
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
  ],
  accounts: [],
  types: [
    {
      name: "InitializeConfidentialTransferFeeConfigData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "withdraw_withheld_authority_elgamal_pubkey",
            type: {
              array: ["u8", 32],
            },
          },
        ],
      },
    },
    {
      name: "WithdrawWithheldTokensFromMintData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "proof_instruction_offset",
            type: "i8",
          },
          {
            name: "new_decryptable_available_balance",
            type: {
              defined: "DecryptableBalance",
            },
          },
        ],
      },
    },
    {
      name: "DecryptableBalance",
      type: {
        kind: "struct",
        fields: [
          {
            name: "nonce",
            type: {
              array: ["u8", 12],
            },
          },
          {
            name: "ciphertext",
            type: {
              array: ["u8", 24],
            },
          },
        ],
      },
    },
    {
      name: "WithdrawWithheldTokensFromAccountsData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "num_token_accounts",
            type: "u8",
          },
          {
            name: "proof_instruction_offset",
            type: "i8",
          },
          {
            name: "new_decryptable_available_balance",
            type: {
              defined: "DecryptableBalance",
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
