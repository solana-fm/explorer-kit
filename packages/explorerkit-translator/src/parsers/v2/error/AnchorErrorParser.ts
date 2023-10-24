import { Idl as AnchorIdl } from "@coral-xyz/anchor";

import { ErrorParserInterface } from "../../../interfaces";
import { IdlItem } from "../../../types/IdlItem";
import { ParserType } from "../../../types/Parsers";

// Copied directly from Anchor Framework
export const LangErrorCode = {
  // Instructions.
  InstructionMissing: 100,
  InstructionFallbackNotFound: 101,
  InstructionDidNotDeserialize: 102,
  InstructionDidNotSerialize: 103,

  // IDL instructions.
  IdlInstructionStub: 1000,
  IdlInstructionInvalidProgram: 1001,

  // Constraints.
  ConstraintMut: 2000,
  ConstraintHasOne: 2001,
  ConstraintSigner: 2002,
  ConstraintRaw: 2003,
  ConstraintOwner: 2004,
  ConstraintRentExempt: 2005,
  ConstraintSeeds: 2006,
  ConstraintExecutable: 2007,
  ConstraintState: 2008,
  ConstraintAssociated: 2009,
  ConstraintAssociatedInit: 2010,
  ConstraintClose: 2011,
  ConstraintAddress: 2012,
  ConstraintZero: 2013,
  ConstraintTokenMint: 2014,
  ConstraintTokenOwner: 2015,
  ConstraintMintMintAuthority: 2016,
  ConstraintMintFreezeAuthority: 2017,
  ConstraintMintDecimals: 2018,
  ConstraintSpace: 2019,
  ConstraintAccountIsNone: 2020,

  // Require.
  RequireViolated: 2500,
  RequireEqViolated: 2501,
  RequireKeysEqViolated: 2502,
  RequireNeqViolated: 2503,
  RequireKeysNeqViolated: 2504,
  RequireGtViolated: 2505,
  RequireGteViolated: 2506,

  // Accounts.
  AccountDiscriminatorAlreadySet: 3000,
  AccountDiscriminatorNotFound: 3001,
  AccountDiscriminatorMismatch: 3002,
  AccountDidNotDeserialize: 3003,
  AccountDidNotSerialize: 3004,
  AccountNotEnoughKeys: 3005,
  AccountNotMutable: 3006,
  AccountOwnedByWrongProgram: 3007,
  InvalidProgramId: 3008,
  InvalidProgramExecutable: 3009,
  AccountNotSigner: 3010,
  AccountNotSystemOwned: 3011,
  AccountNotInitialized: 3012,
  AccountNotProgramData: 3013,
  AccountNotAssociatedTokenAccount: 3014,
  AccountSysvarMismatch: 3015,
  AccountReallocExceedsLimit: 3016,
  AccountDuplicateReallocs: 3017,

  // Miscellaneous
  DeclaredProgramIdMismatch: 4100,

  // Used for APIs that shouldn't be used anymore.
  Deprecated: 5000,
};

// convert all the rest of these
export const LangErrorMessage = new Map<
  number,
  {
    name: string;
    msg: string;
  }
>([
  // Instructions.
  [
    LangErrorCode.InstructionMissing,
    {
      name: "InstructionMissing",
      msg: "8 byte instruction identifier not provided",
    },
  ],
  [
    LangErrorCode.InstructionFallbackNotFound,
    {
      name: "InstructionFallbackNotFound",
      msg: "Fallback functions are not supported",
    },
  ],
  [
    LangErrorCode.InstructionDidNotDeserialize,
    {
      name: "InstructionDidNotDeserialize",
      msg: "The program could not deserialize the given instruction",
    },
  ],
  [
    LangErrorCode.InstructionDidNotSerialize,
    {
      name: "InstructionDidNotSerialize",
      msg: "The program could not serialize the given instruction",
    },
  ],

  // Idl instructions.
  [
    LangErrorCode.IdlInstructionStub,
    {
      name: "IdlInstructionStub",
      msg: "The program was compiled without idl instructions",
    },
  ],
  [
    LangErrorCode.IdlInstructionInvalidProgram,
    {
      name: "IdlInstructionInvalidProgram",
      msg: "The transaction was given an invalid program for the IDL instruction",
    },
  ],

  // Constraints.
  [
    LangErrorCode.ConstraintMut,
    {
      name: "ConstraintMut",
      msg: "A mut constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintHasOne,
    {
      name: "ConstraintHasOne",
      msg: "A has one constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintSigner,
    {
      name: "ConstraintSigner",
      msg: "A signer constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintRaw,
    {
      name: "ConstraintRaw",
      msg: "A raw constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintOwner,
    {
      name: "ConstraintOwner",
      msg: "An owner constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintRentExempt,
    {
      name: "ConstraintRentExempt",
      msg: "A rent exemption constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintSeeds,
    {
      name: "ConstraintSeeds",
      msg: "A seeds constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintExecutable,
    {
      name: "ConstraintExecutable",
      msg: "An executable constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintState,
    {
      name: "ConstraintState",
      msg: "Deprecated Error, feel free to replace with something else",
    },
  ],
  [
    LangErrorCode.ConstraintAssociated,
    {
      name: "ConstraintAssociated",
      msg: "An associated constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintAssociatedInit,
    {
      name: "ConstraintAssociatedInit",
      msg: "An associated init constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintClose,
    {
      name: "ConstraintClose",
      msg: "A close constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintAddress,
    {
      name: "ConstraintAddress",
      msg: "An address constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintZero,
    {
      name: "ConstraintZero",
      msg: "Expected zero account discriminant",
    },
  ],
  [
    LangErrorCode.ConstraintTokenMint,
    {
      name: "ConstraintTokenMint",
      msg: "A token mint constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintTokenOwner,
    {
      name: "ConstraintTokenOwner",
      msg: "A token owner constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintMintMintAuthority,
    {
      name: "ConstraintMintMintAuthority",
      msg: "A mint mint authority constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintMintFreezeAuthority,
    {
      name: "ConstraintMintFreezeAuthority",
      msg: "A mint freeze authority constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintMintDecimals,
    {
      name: "ConstraintMintDecimals",
      msg: "A mint decimals constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintSpace,
    {
      name: "ConstraintSpace",
      msg: "A space constraint was violated",
    },
  ],
  [
    LangErrorCode.ConstraintAccountIsNone,
    {
      name: "ConstraintAccountIsNone",
      msg: "A required account for the constraint is None",
    },
  ],

  // Require.
  [
    LangErrorCode.RequireViolated,
    {
      name: "RequireViolated",
      msg: "A require expression was violated",
    },
  ],
  [
    LangErrorCode.RequireEqViolated,
    {
      name: "RequireEqViolated",
      msg: "A require_eq expression was violated",
    },
  ],
  [
    LangErrorCode.RequireKeysEqViolated,
    {
      name: "RequireKeysEqViolated",
      msg: "A require_keys_eq expression was violated",
    },
  ],
  [
    LangErrorCode.RequireNeqViolated,
    {
      name: "RequireNeqViolated",
      msg: "A require_neq expression was violated",
    },
  ],
  [
    LangErrorCode.RequireKeysNeqViolated,
    {
      name: "RequireKeysNeqViolated",
      msg: "A require_keys_neq expression was violated",
    },
  ],
  [
    LangErrorCode.RequireGtViolated,
    {
      name: "RequireGtViolated",
      msg: "A require_gt expression was violated",
    },
  ],
  [
    LangErrorCode.RequireGteViolated,
    {
      name: "RequireGteViolated",
      msg: "A require_gte expression was violated",
    },
  ],

  // Accounts.
  [
    LangErrorCode.AccountDiscriminatorAlreadySet,
    {
      name: "AccountDiscriminatorAlreadySet",
      msg: "The account discriminator was already set on this account",
    },
  ],
  [
    LangErrorCode.AccountDiscriminatorNotFound,
    {
      name: "AccountDiscriminatorNotFound",
      msg: "No 8 byte discriminator was found on the account",
    },
  ],
  [
    LangErrorCode.AccountDiscriminatorMismatch,
    {
      name: "AccountDiscriminatorMismatch",
      msg: "8 byte discriminator did not match what was expected",
    },
  ],
  [
    LangErrorCode.AccountDidNotDeserialize,
    {
      name: "AccountDidNotDeserialize",
      msg: "Failed to deserialize the account",
    },
  ],
  [
    LangErrorCode.AccountDidNotSerialize,
    {
      name: "AccountDidNotSerialize",
      msg: "Failed to serialize the account",
    },
  ],
  [
    LangErrorCode.AccountNotEnoughKeys,
    {
      name: "AccountNotEnoughKeys",
      msg: "Not enough account keys given to the instruction",
    },
  ],
  [
    LangErrorCode.AccountNotMutable,
    {
      name: "AccountNotMutable",
      msg: "The given account is not mutable",
    },
  ],
  [
    LangErrorCode.AccountOwnedByWrongProgram,
    {
      name: "AccountOwnedByWrongProgram",
      msg: "The given account is owned by a different program than expected",
    },
  ],
  [
    LangErrorCode.InvalidProgramId,
    {
      name: "InvalidProgramId",
      msg: "Program ID was not as expected",
    },
  ],
  [
    LangErrorCode.InvalidProgramExecutable,
    {
      name: "InvalidProgramExecutable",
      msg: "Program account is not executable",
    },
  ],
  [
    LangErrorCode.AccountNotSigner,
    {
      name: "AccountNotSigner",
      msg: "The given account did not sign",
    },
  ],
  [
    LangErrorCode.AccountNotSystemOwned,
    {
      name: "AccountNotSystemOwned",
      msg: "The given account is not owned by the system program",
    },
  ],
  [
    LangErrorCode.AccountNotInitialized,
    {
      name: "AccountNotInitialized",
      msg: "The program expected this account to be already initialized",
    },
  ],
  [
    LangErrorCode.AccountNotProgramData,
    {
      name: "AccountNotProgramData",
      msg: "The given account is not a program data account",
    },
  ],
  [
    LangErrorCode.AccountNotAssociatedTokenAccount,
    {
      name: "AccountNotAssociatedTokenAccount",
      msg: "The given account is not the associated token account",
    },
  ],
  [
    LangErrorCode.AccountSysvarMismatch,
    {
      name: "AccountSysvarMismatch",
      msg: "The given public key does not match the required sysvar",
    },
  ],
  [
    LangErrorCode.AccountReallocExceedsLimit,
    {
      name: "AccountReallocExceedsLimit",
      msg: "The account reallocation exceeds the MAX_PERMITTED_DATA_INCREASE limit",
    },
  ],
  [
    LangErrorCode.AccountDuplicateReallocs,
    {
      name: "AccountDuplicateReallocs",
      msg: "The account was duplicated for more than one reallocation",
    },
  ],

  // Miscellaneous
  [
    LangErrorCode.DeclaredProgramIdMismatch,
    {
      name: "DeclaredProgramIdMismatch",
      msg: "The declared program id does not match the actual program id",
    },
  ],

  // Deprecated
  [
    LangErrorCode.Deprecated,
    {
      name: "Deprecated",
      msg: "The API being used is deprecated and should no longer be used",
    },
  ],
]);

export const createAnchorErrorParser: (idlItem: IdlItem) => ErrorParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as AnchorIdl;
  const errorsLayout = new Map<
    number,
    {
      name: string;
      msg: string;
    }
  >();

  idl?.errors?.forEach((error) => {
    errorsLayout.set(error.code, {
      name: error.name,
      msg: error.msg ?? "No error message specified",
    });
  });

  const parseError = (unparsedErrorCode: string) => {
    try {
      const errorCode: number = parseInt(unparsedErrorCode);
      const error = errorsLayout.get(errorCode);

      if (error) {
        return {
          name: error.name,
          data: error.msg,
          type: ParserType.ERROR,
        };
      }
    } catch (parseErr) {
      return null;
    }

    return null;
  };

  return { errorsLayout, parseError };
};
