import { Idl } from "@solanafm/kinobi-lite";

export const GroupMemberPointerIDL: Idl = {
  version: "0.0.0",
  name: "group-member-pointer",
  accounts: [],
  instructions: [
    {
      name: "initializeGroupMemberPointer",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "initializeGroupMemberPointerData",
          type: {
            defined: "InitializeGroupMemberPointerData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "UpdateGroupMemberPointer",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "groupPointerAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "updateGroupMemberPointerData",
          type: {
            defined: "UpdateGroupMemberPointerData",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
  ],
  types: [
    {
      name: "InitializeGroupMemberPointerData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "member_address",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "UpdateGroupMemberPointerData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "member_address",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  metadata: {
    origin: "shank",
    address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
    binaryVersion: "0.0.1",
    libVersion: "0.0.1",
  },
};
