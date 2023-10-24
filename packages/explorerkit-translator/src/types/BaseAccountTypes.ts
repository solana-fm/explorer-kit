// Default AccountData Parser for all the parsing types
export type AccountData<T> = {
  accountDataType?: string;
  data?: T;
};

export enum AccParserSerializationType {
  BINCODE,
  BORSH,
  SYSVAR,
}
