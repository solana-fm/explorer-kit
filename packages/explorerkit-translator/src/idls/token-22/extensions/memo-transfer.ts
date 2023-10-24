import { Idl } from "@solanafm/kinobi-lite";

export const MemoTransferExtensionIDL: Idl = {
  version: "0.1.0",
  name: "MemoTransferExtension",
  instructions: [
    {
      name: "enableMemoTransfer",
      accounts: [
        {
          name: "accountToUpdate",
          isMut: true,
          isSigner: false,
        },
        {
          name: "accountOwner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "disableMemoTransfer",
      accounts: [
        {
          name: "accountToUpdate",
          isMut: true,
          isSigner: false,
        },
        {
          name: "accountOwner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "signers",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
  ],
  accounts: [],
  types: [],
  metadata: {
    origin: "shank",
    address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
