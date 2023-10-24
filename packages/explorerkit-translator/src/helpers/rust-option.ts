import { none, some } from "@metaplex-foundation/umi";
import { publicKey, u32 } from "@metaplex-foundation/umi-serializers";

import { AccParserSerializationType } from "../types/BaseAccountTypes";

/**
 * Tries to serialize a COption public key.
 * @param {Uint8Array} dataBuffer - The data buffer to serialize.
 * @param {AccParserSerializationType} serializationType - The serialization type to use.
 * @returns {[COption<Pubkey>, number]} - A tuple containing the serialized COption public key and the offset.
 * @throws {Error} - Throws an error if the serialization type is not supported or if the option value is not 0 or 1.
 */
export const tryToSerializeCOptionPubkey = (dataBuffer: Uint8Array, serializationType: AccParserSerializationType) => {
  switch (serializationType) {
    case AccParserSerializationType.BORSH:
      // COption in Borsh Serialization will be 4 bytes for the Option.
      // This code is copied from https://github.com/metaplex-foundation/umi/blob/main/packages/umi-serializers/src/option.ts
      // But to optimize the option value to be either 1 or 0 according to
      // https://github.com/solana-labs/solana-program-library/commit/2a5acff2d8671b2412ec2d015f9ae7bbb6e8f5c2
      let offset = 0;
      const [isSome, prefixOffset] = u32().deserialize(dataBuffer, offset);
      offset = prefixOffset;
      if (isSome === 0) {
        return [none(), offset];
      } else if (isSome === 1) {
        const [value, newOffset] = publicKey().deserialize(dataBuffer, offset);
        offset = newOffset;
        return [some(value), offset];
      }

      throw new Error("Unable to serialize COption<Pubkey> as Option Value is not 0 or 1");

    default:
      throw new Error("Unable to serialize COption<Pubkey> as Option Value is not 0 or 1");
  }
};
