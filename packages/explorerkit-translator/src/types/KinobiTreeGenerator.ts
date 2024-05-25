import { Serializer } from "@metaplex-foundation/umi";

/**
 * @property instructionName - The instruction that the serializer is suppose to serialize
 * @property serializer - The serializer interface constructed by Kinobi
 */
export type FMShankSerializer = {
  instructionName: string;
  serializer: ShankSerializer;
};

export type ShankSerializer = Serializer<any, any> | null;

export enum KinobiTreeGeneratorType {
  ACCOUNTS,
  INSTRUCTIONS,
  TYPES,
  EVENTS,
}
