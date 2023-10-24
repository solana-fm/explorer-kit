import { Idl } from "@solanafm/kinobi-lite";

export const StakePoolIDL: Idl = {
  version: "0.7.0",
  name: "spl_stake_pool",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "manager",
          isMut: false,
          isSigner: true,
        },
        {
          name: "staker",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakePoolWithdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserveStake",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "managerPoolAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "depositAuthority",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "fee",
          type: {
            defined: "Fee",
          },
        },
        {
          name: "withdrawalFee",
          type: {
            defined: "Fee",
          },
        },
        {
          name: "depositFee",
          type: {
            defined: "Fee",
          },
        },
        {
          name: "referralFee",
          type: "u8",
        },
        {
          name: "maxValidators",
          type: "u32",
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "addValidatorToPool",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: false,
          isSigner: true,
        },
        {
          name: "reserveStakeAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakePoolWithdraw",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stake",
          isMut: true,
          isSigner: false,
        },
        {
          name: "validator",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarRent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarClock",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarStakeHistory",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarStakeConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "seed",
          type: "u32",
        },
      ],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
    {
      name: "removeValidatorFromPool",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: false,
          isSigner: true,
        },
        {
          name: "stakePoolWithdraw",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "transientStakeAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarClock",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 2,
      },
    },
    {
      name: "decreaseValidatorStake",
      accounts: [
        {
          name: "stakePool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: false,
          isSigner: true,
        },
        {
          name: "stakePoolWithdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "canonicalStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "transientStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sysvarClock",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarRent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "lamports",
          type: "u64",
        },
        {
          name: "transientStakeSeed",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 3,
      },
    },
    {
      name: "increaseValidatorStake",
      accounts: [
        {
          name: "stakePool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: false,
          isSigner: true,
        },
        {
          name: "stakePoolWithdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakePoolReserveStake",
          isMut: true,
          isSigner: false,
        },
        {
          name: "transientStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "validatorStakeAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorVoteAccountToDelegateTo",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarClock",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarRent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeHistorySysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeConfigSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "lamports",
          type: "u64",
        },
        {
          name: "transientStakeSeed",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 4,
      },
    },
    {
      name: "setPreferredValidator",
      accounts: [
        {
          name: "stakePoolAddress",
          isMut: true,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: false,
          isSigner: true,
        },
        {
          name: "validatorList",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "validatorType",
          type: {
            defined: "PreferredValidatorType",
          },
        },
        {
          name: "validatorVoteAddress",
          type: {
            option: "publicKey",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 5,
      },
    },
    {
      name: "updateValidatorListBalance",
      accounts: [
        {
          name: "stakePool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakePoolWithdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "storageAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserveStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sysvarClock",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarStakeHistory",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorStakeAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "transientStakeAccount",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "startIndex",
          type: "u32",
        },
        {
          name: "noMerge",
          type: "bool",
        },
      ],
      discriminant: {
        type: "u8",
        value: 6,
      },
    },
    {
      name: "updateStakePoolBalance",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakePoolWithdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorStakeList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserveStakeAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "accountToReceivePoolFeeTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolMintAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 7,
      },
    },
    {
      name: "cleanupRemovedValidatorEntries",
      accounts: [
        {
          name: "stakePool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorListStorage",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 8,
      },
    },
    {
      name: "depositStake",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "validatorStakeList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakePoolDepositAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "stakePoolWithdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "validatorStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserveStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokensAmount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolFeesAmount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenMintAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sysvarClockAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarStakeHistoryAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolTokenProgramId",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgramId",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 9,
      },
    },
    {
      name: "withdrawStake",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "validatorStakeList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakePoolWithdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "uninitializedStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTransferAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "userAccountWithPoolTokensToBurnFrom",
          isMut: true,
          isSigner: false,
        },
        {
          name: "accountToReceivePoolFeeTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenMintAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sysvarClockAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolTokenProgramId",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgramId",
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
        value: 10,
      },
    },
    {
      name: "setManager",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "manager",
          isMut: false,
          isSigner: true,
        },
        {
          name: "newManager",
          isMut: false,
          isSigner: true,
        },
        {
          name: "newFeeReceiver",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 11,
      },
    },
    {
      name: "setFee",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "manager",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "fee",
          type: {
            defined: "FeeType",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 12,
      },
    },
    {
      name: "setStaker",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "currentStaker",
          isMut: false,
          isSigner: true,
        },
        {
          name: "newStaker",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 13,
      },
    },
    {
      name: "depositSol",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakePoolWithdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "reserveStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "depositer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "userAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "referralFeeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgramId",
          isMut: false,
          isSigner: false,
        },
        {
          name: "depositAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "depositAmount",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 14,
      },
    },
    {
      name: "setFundingAuthority",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "manager",
          isMut: false,
          isSigner: true,
        },
        {
          name: "newAuthority",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "fundingType",
          type: {
            defined: "FundingType",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 15,
      },
    },
    {
      name: "withdrawSol",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "withdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "transferAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "burnPoolTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserveStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "withdrawAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sysvarClock",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarStakeHistory",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "solWithdrawAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "arg",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 16,
      },
    },
    {
      name: "createTokenMetadata",
      accounts: [
        {
          name: "stakePool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "manager",
          isMut: false,
          isSigner: true,
        },
        {
          name: "stakePoolWithdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenMetadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mplTokenMetadata",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
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
      ],
      discriminant: {
        type: "u8",
        value: 17,
      },
    },
    {
      name: "updateTokenMetadata",
      accounts: [
        {
          name: "stakePool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "manager",
          isMut: false,
          isSigner: true,
        },
        {
          name: "stakePoolWithdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenMetadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mplTokenMetadata",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
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
      ],
      discriminant: {
        type: "u8",
        value: 18,
      },
    },
    {
      name: "increaseAdditionalValidatorStake",
      accounts: [
        {
          name: "stakePool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: false,
          isSigner: true,
        },
        {
          name: "withdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserveStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "uninitializedEphemeralStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "transientStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "validatorStakeAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorVoteAccount",
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
          name: "stakeConfigSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "lamports",
          type: "u64",
        },
        {
          name: "transientStakeSeed",
          type: "u64",
        },
        {
          name: "ephemeralStakeSeed",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 19,
      },
    },
    {
      name: "decreaseAdditionalValidatorStake",
      accounts: [
        {
          name: "stakePool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: false,
          isSigner: true,
        },
        {
          name: "withdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sourceCanonicalStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "uninitializedEphemeralStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "transientStakeAccount",
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
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "lamports",
          type: "u64",
        },
        {
          name: "transientStakeSeed",
          type: "u64",
        },
        {
          name: "ephemeralStakeSeed",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 20,
      },
    },
    {
      name: "redelegate",
      accounts: [
        {
          name: "stakePool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: false,
          isSigner: true,
        },
        {
          name: "withdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "validatorList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sourceCanonicalStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sourceTransientStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "uninitializedEphemeralStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destinationTransientStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destinationStakeAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "destinationValidatorVoteAccount",
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
          name: "stakeConfigSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "lamports",
          type: "u64",
        },
        {
          name: "sourceTransientStakeSeed",
          type: "u64",
        },
        {
          name: "ephemeralStakeSeed",
          type: "u64",
        },
        {
          name: "destinationTransientStakeSeed",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 21,
      },
    },
    {
      name: "depositStakeWithSlippage",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "validatorList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "depositAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "withdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "validatorStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserveStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "referralFeeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenMintAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sysvarClockAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarStakeHistory",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "minimumPoolTokensOut",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 22,
      },
    },
    {
      name: "withdrawStakeWithSlippage",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "validatorList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "withdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "withdrawalAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newWithdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTransferAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "burnPoolTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sysvarClockAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "poolTokensIn",
          type: "u64",
        },
        {
          name: "minimumLamportsOut",
          type: "string",
        },
      ],
      discriminant: {
        type: "u8",
        value: 23,
      },
    },
    {
      name: "depositSolWithSlippage",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "withdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "reserveStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "depositAccount",
          isMut: false,
          isSigner: true,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "referralFeeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "solDepositAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "lamportsIn",
          type: "u64",
        },
        {
          name: "minimumPoolsTokensOut",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 24,
      },
    },
    {
      name: "withdrawSolWithSlippage",
      accounts: [
        {
          name: "stakePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "withdrawAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "transferAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "poolTokenBurn",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reserveStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "withdrawAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sysvarClock",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarStakeHistory",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "solWithdrawAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "poolTokensIn",
          type: "u64",
        },
        {
          name: "minimumLamportsOut",
          type: "u64",
        },
      ],
      discriminant: {
        type: "u8",
        value: 25,
      },
    },
  ],
  accounts: [
    {
      name: "Uninitialized",
      type: {
        kind: "struct",
        fields: [],
      },
    },
    {
      name: "StakePool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "accountType",
            type: {
              defined: "AccountType",
            },
          },
          {
            name: "manager",
            type: "publicKey",
          },
          {
            name: "staker",
            type: "publicKey",
          },
          {
            name: "stakeDepositAuthority",
            type: "publicKey",
          },
          {
            name: "stakeWithdrawBumpSeed",
            type: "u8",
          },
          {
            name: "validatorList",
            type: "publicKey",
          },
          {
            name: "reserveStake",
            type: "publicKey",
          },
          {
            name: "poolMint",
            type: "publicKey",
          },
          {
            name: "managerFeeAccount",
            type: "publicKey",
          },
          {
            name: "tokenProgramId",
            type: "publicKey",
          },
          {
            name: "totalLamports",
            type: "u64",
          },
          {
            name: "poolTokenSupply",
            type: "u64",
          },
          {
            name: "lastUpdateEpoch",
            type: "u64",
          },
          {
            name: "lockup",
            type: {
              defined: "Lockup",
            },
          },
          {
            name: "epochFee",
            type: {
              defined: "Fee",
            },
          },
          {
            name: "nextEpochFee",
            type: {
              option: {
                defined: "Fee",
              },
            },
          },
          {
            name: "preferredDepositValidatorVoteAddress",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "preferredWithdrawValidatorVoteAddress",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "stakeDepositFee",
            type: {
              defined: "Fee",
            },
          },
          {
            name: "stakeWithdrawalFee",
            type: {
              defined: "Fee",
            },
          },
          {
            name: "nextStakeWithdrawalFee",
            type: {
              option: {
                defined: "Fee",
              },
            },
          },
          {
            name: "stakeReferralFee",
            type: "u8",
          },
          {
            name: "solDepositAuthority",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "solDepositFee",
            type: {
              defined: "Fee",
            },
          },
          {
            name: "solReferralFee",
            type: "u8",
          },
          {
            name: "solWithdrawAuthority",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "solWithdrawalFee",
            type: {
              defined: "Fee",
            },
          },
          {
            name: "nextSolWithdrawalFee",
            type: {
              option: {
                defined: "Fee",
              },
            },
          },
          {
            name: "lastEpochPoolTokenSupply",
            type: "u64",
          },
          {
            name: "lastEpochTotalLamports",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "ValidatorList",
      type: {
        kind: "struct",
        fields: [
          {
            name: "validatorListHeader",
            type: {
              defined: "ValidatorListHeader",
            },
          },
          {
            name: "validators",
            type: {
              vec: {
                defined: "ValidatorStakeInfo",
              },
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "ValidatorStakeInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "activeStakeLamports",
            type: "u64",
          },
          {
            name: "transientStakeLamports",
            type: "u64",
          },
          {
            name: "lastUpdateEpoch",
            type: "u64",
          },
          {
            name: "transientSeedSuffixStart",
            type: "u64",
          },
          {
            name: "unused",
            type: "u32",
          },
          {
            name: "transientSeedSuffixEnd",
            type: "u32",
          },
          {
            name: "status",
            type: {
              defined: "StakeStatus",
            },
          },
          {
            name: "voteAccountAddress",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "Fee",
      type: {
        kind: "struct",
        fields: [
          {
            name: "denominator",
            type: "u64",
          },
          {
            name: "numerator",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "ValidatorListHeader",
      type: {
        kind: "struct",
        fields: [
          {
            name: "accountType",
            type: {
              defined: "AccountType",
            },
          },
          {
            name: "maxValidators",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "AccountType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Uninitialized",
          },
          {
            name: "StakePool",
          },
          {
            name: "ValidatorList",
          },
        ],
        size: "u8",
      },
    },
    {
      name: "StakeStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Active",
          },
          {
            name: "DeactivatingTransient",
          },
          {
            name: "ReadyForRemoval",
          },
        ],
      },
    },
    {
      name: "PreferredValidatorType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Deposit",
          },
          {
            name: "Withdraw",
          },
        ],
      },
    },
    {
      name: "FeeType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "SolReferral",
            fields: ["u8"],
          },
          {
            name: "StakeReferral",
            fields: ["u8"],
          },
          {
            name: "Epoch",
            fields: [
              {
                defined: "Fee",
              },
            ],
          },
          {
            name: "StakeWithdrawal",
            fields: [
              {
                defined: "Fee",
              },
            ],
          },
          {
            name: "SolDeposit",
            fields: [
              {
                defined: "Fee",
              },
            ],
          },
          {
            name: "StakeDeposit",
            fields: [
              {
                defined: "Fee",
              },
            ],
          },
          {
            name: "SolWithdrawal",
            fields: [
              {
                defined: "Fee",
              },
            ],
          },
        ],
      },
    },
    {
      name: "FundingType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "StakeDeposit",
          },
          {
            name: "SolDeposit",
          },
          {
            name: "SolWithdraw",
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
  errors: [
    {
      code: 0,
      name: "AlreadyInUse",
      msg: "AlreadyInUse",
    },
    {
      code: 1,
      name: "InvalidProgramAddress",
      msg: "InvalidProgramAddress",
    },
    {
      code: 2,
      name: "InvalidState",
      msg: "InvalidState",
    },
    {
      code: 3,
      name: "CalculationFailure",
      msg: "CalculationFailure",
    },
    {
      code: 4,
      name: "FeeTooHigh",
      msg: "FeeTooHigh",
    },
    {
      code: 5,
      name: "WrongAccountMint",
      msg: "WrongAccountMint",
    },
    {
      code: 6,
      name: "WrongManager",
      msg: "WrongManager",
    },
    {
      code: 7,
      name: "SignatureMissing",
      msg: "SignatureMissing",
    },
    {
      code: 8,
      name: "InvalidValidatorStakeList",
      msg: "InvalidValidatorStakeList",
    },
    {
      code: 9,
      name: "InvalidFeeAccount",
      msg: "InvalidFeeAccount",
    },
    {
      code: 10,
      name: "WrongPoolMint",
      msg: "WrongPoolMint",
    },
    {
      code: 11,
      name: "WrongStakeState",
      msg: "WrongStakeState",
    },
    {
      code: 12,
      name: "UserStakeNotActive",
      msg: "UserStakeNotActive",
    },
    {
      code: 13,
      name: "ValidatorAlreadyAdded",
      msg: "ValidatorAlreadyAdded",
    },
    {
      code: 14,
      name: "ValidatorNotFound",
      msg: "ValidatorNotFound",
    },
    {
      code: 15,
      name: "InvalidStakeAccountAddress",
      msg: "InvalidStakeAccountAddress",
    },
    {
      code: 16,
      name: "StakeListOutOfDate",
      msg: "StakeListOutOfDate",
    },
    {
      code: 17,
      name: "StakeListAndPoolOutOfDate",
      msg: "StakeListAndPoolOutOfDate",
    },
    {
      code: 18,
      name: "UnknownValidatorStakeAccount",
      msg: "UnknownValidatorStakeAccount",
    },
    {
      code: 19,
      name: "WrongMintingAuthority",
      msg: "WrongMintingAuthority",
    },
    {
      code: 20,
      name: "UnexpectedValidatorListAccountSize",
      msg: "UnexpectedValidatorListAccountSize",
    },
    {
      code: 21,
      name: "WrongStaker",
      msg: "WrongStaker",
    },
    {
      code: 22,
      name: "NonZeroPoolTokenSupply",
      msg: "NonZeroPoolTokenSupply",
    },
    {
      code: 23,
      name: "StakeLamportsNotEqualToMinimum",
      msg: "StakeLamportsNotEqualToMinimum",
    },
    {
      code: 24,
      name: "IncorrectDepositVoteAddress",
      msg: "IncorrectDepositVoteAddress",
    },
    {
      code: 25,
      name: "IncorrectWithdrawVoteAddress",
      msg: "IncorrectWithdrawVoteAddress",
    },
    {
      code: 26,
      name: "InvalidMintFreezeAuthority",
      msg: "InvalidMintFreezeAuthority",
    },
    {
      code: 27,
      name: "FeeIncreaseTooHigh",
      msg: "FeeIncreaseTooHigh",
    },
    {
      code: 28,
      name: "WithdrawalTooSmall",
      msg: "WithdrawalTooSmall",
    },
    {
      code: 29,
      name: "DepositTooSmall",
      msg: "DepositTooSmall",
    },
    {
      code: 30,
      name: "InvalidStakeDepositAuthority",
      msg: "InvalidStakeDepositAuthority",
    },
    {
      code: 31,
      name: "InvalidSolDepositAuthority",
      msg: "InvalidSolDepositAuthority",
    },
    {
      code: 32,
      name: "InvalidPreferredValidator",
      msg: "InvalidPreferredValidator",
    },
    {
      code: 33,
      name: "TransientAccountInUse",
      msg: "TransientAccountInUse",
    },
    {
      code: 34,
      name: "InvalidSolWithdrawAuthority",
      msg: "InvalidSolWithdrawAuthority",
    },
    {
      code: 35,
      name: "SolWithdrawalTooLarge",
      msg: "SolWithdrawalTooLarge",
    },
    {
      code: 36,
      name: "InvalidMetadataAccount",
      msg: "InvalidMetadataAccount",
    },
  ],
  metadata: {
    origin: "shank",
    address: "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
