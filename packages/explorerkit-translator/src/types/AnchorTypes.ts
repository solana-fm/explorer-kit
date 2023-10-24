// This is to ensure that we can import and export the types properly
// as these types are not exported from the anchor package properly.
// Source: https://github.com/coral-xyz/anchor/blob/master/ts/packages/anchor/src/idl.ts
export type IdlEvent = {
  name: string;
  fields: IdlEventField[];
};

export type IdlEventField = {
  name: string;
  type: IdlType;
  index: boolean;
};

export type IdlAccountItem = IdlAccount | IdlAccounts;

export function isIdlAccounts(accountItem: IdlAccountItem): accountItem is IdlAccounts {
  return "accounts" in accountItem;
}

export type IdlAccount = {
  name: string;
  isMut: boolean;
  isSigner: boolean;
  isOptional?: boolean;
  docs?: string[];
  relations?: string[];
  pda?: IdlPda;
};

export type IdlPda = {
  seeds: any[];
  programId?: any;
};

// A nested/recursive version of IdlAccount.
export type IdlAccounts = {
  name: string;
  docs?: string[];
  accounts: IdlAccountItem[];
};

export type IdlField = {
  name: string;
  docs?: string[];
  type: IdlType;
};

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
  | "publicKey"
  | IdlTypeDefined
  | IdlTypeOption
  | IdlTypeCOption
  | IdlTypeVec
  | IdlTypeArray;

// User defined type.
export type IdlTypeDefined = {
  defined: string;
};

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
  array: [idlType: IdlType, size: number];
};

export type IdlErrorCode = {
  code: number;
  name: string;
  msg?: string;
};
