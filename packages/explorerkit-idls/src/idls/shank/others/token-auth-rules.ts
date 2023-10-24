import { Idl } from "@solanafm/kinobi-lite";

export const AuthRulesIDL: Idl = {
  version: "1.3.0",
  name: "mpl_token_auth_rules",
  instructions: [
    {
      name: "CreateOrUpdate",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
          desc: "Payer and creator of the RuleSet",
        },
        {
          name: "ruleSetPda",
          isMut: true,
          isSigner: false,
          desc: "The PDA account where the RuleSet is stored",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "bufferPda",
          isMut: false,
          isSigner: false,
          desc: "The buffer to copy a complete ruleset from",
          optional: true,
        },
      ],
      args: [
        {
          name: "createOrUpdateArgs",
          type: {
            defined: "CreateOrUpdateArgs",
          },
        },
      ],
      defaultOptionalAccounts: true,
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "Validate",
      accounts: [
        {
          name: "ruleSetPda",
          isMut: false,
          isSigner: false,
          desc: "The PDA account where the RuleSet is stored",
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
          desc: "Mint of token asset",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
          desc: "Payer for RuleSet state PDA account",
          optional: true,
        },
        {
          name: "ruleAuthority",
          isMut: false,
          isSigner: true,
          desc: "Signing authority for any Rule state updates",
          optional: true,
        },
        {
          name: "ruleSetStatePda",
          isMut: true,
          isSigner: false,
          desc: "The PDA account where any RuleSet state is stored",
          optional: true,
        },
      ],
      args: [
        {
          name: "validateArgs",
          type: {
            defined: "ValidateArgs",
          },
        },
      ],
      defaultOptionalAccounts: true,
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
    {
      name: "WriteToBuffer",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
          desc: "Payer and creator of the RuleSet",
        },
        {
          name: "bufferPda",
          isMut: true,
          isSigner: false,
          desc: "The PDA account where the RuleSet buffer is stored",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
      ],
      args: [
        {
          name: "writeToBufferArgs",
          type: {
            defined: "WriteToBufferArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 2,
      },
    },
    {
      name: "PuffRuleSet",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
          desc: "Payer and creator of the RuleSet",
        },
        {
          name: "ruleSetPda",
          isMut: true,
          isSigner: false,
          desc: "The PDA account where the RuleSet is stored",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
      ],
      args: [
        {
          name: "puffRuleSetArgs",
          type: {
            defined: "PuffRuleSetArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 3,
      },
    },
  ],
  accounts: [
    {
      name: "FrequencyAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: {
              defined: "Key",
            },
          },
          {
            name: "lastUpdate",
            type: "i64",
          },
          {
            name: "period",
            type: "i64",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "SeedsVec",
      type: {
        kind: "struct",
        fields: [
          {
            name: "seeds",
            type: {
              vec: "bytes",
            },
          },
        ],
      },
    },
    {
      name: "ProofInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "proof",
            type: {
              vec: {
                array: ["u8", 32],
              },
            },
          },
        ],
      },
    },
    {
      name: "Payload",
      type: {
        kind: "struct",
        fields: [
          {
            name: "map",
            type: {
              hashMap: [
                "string",
                {
                  defined: "PayloadType",
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: "RuleSetHeader",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: {
              defined: "Key",
            },
          },
          {
            name: "revMapVersionLocation",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "RuleSetRevisionMapV1",
      type: {
        kind: "struct",
        fields: [
          {
            name: "ruleSetRevisions",
            type: {
              vec: "u64",
            },
          },
        ],
      },
    },
    {
      name: "CreateOrUpdateArgs",
      type: {
        kind: "enum",
        variants: [
          {
            name: "V1",
            fields: [
              {
                name: "serialized_rule_set",
                type: "bytes",
              },
            ],
          },
        ],
      },
    },
    {
      name: "ValidateArgs",
      type: {
        kind: "enum",
        variants: [
          {
            name: "V1",
            fields: [
              {
                name: "operation",
                type: "string",
              },
              {
                name: "payload",
                type: {
                  defined: "Payload",
                },
              },
              {
                name: "update_rule_state",
                type: "bool",
              },
              {
                name: "rule_set_revision",
                type: {
                  option: "u64",
                },
              },
            ],
          },
        ],
      },
    },
    {
      name: "WriteToBufferArgs",
      type: {
        kind: "enum",
        variants: [
          {
            name: "V1",
            fields: [
              {
                name: "serialized_rule_set",
                type: "bytes",
              },
              {
                name: "overwrite",
                type: "bool",
              },
            ],
          },
        ],
      },
    },
    {
      name: "PuffRuleSetArgs",
      type: {
        kind: "enum",
        variants: [
          {
            name: "V1",
            fields: [
              {
                name: "rule_set_name",
                type: "string",
              },
            ],
          },
        ],
      },
    },
    {
      name: "PayloadType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Pubkey",
            fields: ["publicKey"],
          },
          {
            name: "Seeds",
            fields: [
              {
                defined: "SeedsVec",
              },
            ],
          },
          {
            name: "MerkleProof",
            fields: [
              {
                defined: "ProofInfo",
              },
            ],
          },
          {
            name: "Number",
            fields: ["u64"],
          },
        ],
      },
    },
    {
      name: "Key",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Uninitialized",
          },
          {
            name: "RuleSet",
          },
          {
            name: "Frequency",
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg",
    binaryVersion: "0.0.11",
    libVersion: "0.0.11",
  },
};
