// Types imported here from the anchor package is from 0.3.0 and onwards
export type IdlArrayLen = IdlArrayLenGeneric | IdlArrayLenValue;

export type IdlArrayLenGeneric = {
  generic: string;
};

export type IdlArrayLenValue = number;

export type IdlGenericArg = IdlGenericArgType | IdlGenericArgConst;

export type IdlGenericArgType = { kind: "type"; type: IdlType };

export type IdlGenericArgConst = { kind: "const"; value: string };

export type IdlType =
  | "bool"
  | "u8"
  | "i8"
  | "u16"
  | "i16"
  | "u32"
  | "i32"
  | "f32"
  | "u64"
  | "i64"
  | "f64"
  | "u128"
  | "i128"
  | "u256"
  | "i256"
  | "bytes"
  | "string"
  | "pubkey"
  | IdlTypeOption
  | IdlTypeCOption
  | IdlTypeVec
  | IdlTypeArray
  | IdlTypeDefined
  | IdlTypeGeneric;

export type IdlTypeOption = {
  option: IdlType;
};

export type IdlTypeCOption = {
  coption: IdlType;
};

export type IdlTypeVec = {
  vec: IdlType;
};

export type IdlTypeArray = {
  array: [idlType: IdlType, size: IdlArrayLen];
};

export type IdlTypeDefined = {
  defined: {
    name: string;
    generics?: IdlGenericArg[];
  };
};

export type IdlTypeGeneric = {
  generic: string;
};

export type IdlField = {
  name: string;
  docs?: string[];
  type: IdlType;
};

export type IdlDefinedFields = IdlDefinedFieldsNamed | IdlDefinedFieldsTuple;

export type IdlDefinedFieldsNamed = IdlField[];

export type IdlDefinedFieldsTuple = IdlType[];

export type IdlInstructionAccountItem = IdlInstructionAccount | IdlInstructionAccounts;

export type IdlInstructionAccount = {
  name: string;
  docs?: string[];
  writable?: boolean;
  signer?: boolean;
  optional?: boolean;
  address?: string;
  pda?: IdlPda;
  relations?: string[];
};

export type IdlInstructionAccounts = {
  name: string;
  accounts: IdlInstructionAccount[];
};

export type IdlPda = {
  seeds: IdlSeed[];
  program?: IdlSeed;
};

export type IdlSeed = IdlSeedConst | IdlSeedArg | IdlSeedAccount;

export type IdlSeedConst = {
  kind: "const";
  value: number[];
};

export type IdlSeedArg = {
  kind: "arg";
  path: string;
};

export type IdlSeedAccount = {
  kind: "account";
  path: string;
  account?: string;
};

export const checkIfIdlDefinedFieldsNamed = (fields: IdlDefinedFields): fields is IdlDefinedFieldsNamed => {
  const fieldsToCheck = fields as IdlDefinedFieldsNamed;
  if (!fieldsToCheck[0]) return false;
  if (fieldsToCheck[0].name !== undefined) return true;

  return false;
};

export function isIdlAccounts(accountItem: IdlInstructionAccountItem): accountItem is IdlInstructionAccounts {
  return "accounts" in accountItem;
}
