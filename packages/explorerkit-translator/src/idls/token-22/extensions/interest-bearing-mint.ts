import { Idl } from "@solanafm/kinobi-lite";

export const InterestBearingMintIDL: Idl = {
  version: "0.0.0",
  name: "interest-bearing-mint",
  accounts: [],
  instructions: [
    {
      name: "initializeInterestBearingMint",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
      ],
      // rateAuthority should be COption but it's currently not COption ATM for some reason.
      args: [
        {
          name: "rateAuthority",
          type: "publicKey",
        },
        {
          name: "rate",
          type: "i16",
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "updateInterestBearingMintRate",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rateAuthority",
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
          name: "newRate",
          type: "i16",
        },
      ],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
  ],
  types: [],
  metadata: {
    origin: "shank",
    address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
