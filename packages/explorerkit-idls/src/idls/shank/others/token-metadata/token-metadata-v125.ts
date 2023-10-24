import { Idl } from "@solanafm/kinobi-lite";

export const TokenMetadataV125IDL: Idl = {
  version: "1.2.5",
  name: "mpl_token_metadata",
  instructions: [
    {
      name: "CreateMetadataAccount",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "Metadata key (pda of ['metadata', program id, mint id])",
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
          desc: "Mint of token asset",
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: true,
          desc: "Mint authority",
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
          desc: "payer",
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: false,
          desc: "update authority info",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent info",
        },
      ],
      args: [
        {
          name: "createMetadataAccountArgs",
          type: {
            defined: "CreateMetadataAccountArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 0,
      },
    },
    {
      name: "UpdateMetadataAccount",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "Metadata account",
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: true,
          desc: "Update authority key",
        },
      ],
      args: [
        {
          name: "updateMetadataAccountArgs",
          type: {
            defined: "UpdateMetadataAccountArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 1,
      },
    },
    {
      name: "DeprecatedCreateMasterEdition",
      accounts: [
        {
          name: "edition",
          isMut: true,
          isSigner: false,
          desc: "Unallocated edition V1 account with address as pda of ['metadata', program id, mint, 'edition']",
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
          desc: "Metadata mint",
        },
        {
          name: "printingMint",
          isMut: true,
          isSigner: false,
          desc: "Printing mint - A mint you control that can mint tokens that can be exchanged for limited editions of your master edition via the MintNewEditionFromMasterEditionViaToken endpoint",
        },
        {
          name: "oneTimePrintingAuthorizationMint",
          isMut: true,
          isSigner: false,
          desc: "One time authorization printing mint - A mint you control that prints tokens that gives the bearer permission to mint any number of tokens from the printing mint one time via an endpoint with the token-metadata program for your metadata. Also burns the token.",
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: true,
          desc: "Current Update authority key",
        },
        {
          name: "printingMintAuthority",
          isMut: false,
          isSigner: true,
          desc: "Printing mint authority - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY.",
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: true,
          desc: "Mint authority on the metadata's mint - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY",
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
          desc: "Metadata account",
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
          desc: "payer",
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          desc: "Token program",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent info",
        },
        {
          name: "oneTimePrintingAuthorizationMintAuthority",
          isMut: false,
          isSigner: true,
          desc: "One time authorization printing mint authority - must be provided if using max supply. THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY.",
        },
      ],
      args: [
        {
          name: "createMasterEditionArgs",
          type: {
            defined: "CreateMasterEditionArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 2,
      },
    },
    {
      name: "DeprecatedMintNewEditionFromMasterEditionViaPrintingToken",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "New Metadata key (pda of ['metadata', program id, mint id])",
        },
        {
          name: "edition",
          isMut: true,
          isSigner: false,
          desc: "New Edition V1 (pda of ['metadata', program id, mint id, 'edition'])",
        },
        {
          name: "masterEdition",
          isMut: true,
          isSigner: false,
          desc: "Master Record Edition V1 (pda of ['metadata', program id, master metadata mint id, 'edition'])",
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
          desc: "Mint of new token - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY",
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: true,
          desc: "Mint authority of new mint",
        },
        {
          name: "printingMint",
          isMut: true,
          isSigner: false,
          desc: "Printing Mint of master record edition",
        },
        {
          name: "masterTokenAccount",
          isMut: true,
          isSigner: false,
          desc: "Token account containing Printing mint token to be transferred",
        },
        {
          name: "editionMarker",
          isMut: true,
          isSigner: false,
          desc: "Edition pda to mark creation - will be checked for pre-existence. (pda of ['metadata', program id, master mint id, edition_number])",
        },
        {
          name: "burnAuthority",
          isMut: false,
          isSigner: true,
          desc: "Burn authority for this token",
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
          desc: "payer",
        },
        {
          name: "masterUpdateAuthority",
          isMut: false,
          isSigner: false,
          desc: "update authority info for new metadata account",
        },
        {
          name: "masterMetadata",
          isMut: false,
          isSigner: false,
          desc: "Master record metadata account",
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          desc: "Token program",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent info",
        },
        {
          name: "reservationList",
          isMut: true,
          isSigner: false,
          desc: "(Optional) Reservation List - If present, and you are on this list, you can get an edition number given by your position on the list.",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 3,
      },
    },
    {
      name: "UpdatePrimarySaleHappenedViaToken",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "Metadata key (pda of ['metadata', program id, mint id])",
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
          desc: "Owner on the token account",
        },
        {
          name: "token",
          isMut: false,
          isSigner: false,
          desc: "Account containing tokens from the metadata's mint",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 4,
      },
    },
    {
      name: "DeprecatedSetReservationList",
      accounts: [
        {
          name: "masterEdition",
          isMut: true,
          isSigner: false,
          desc: "Master Edition V1 key (pda of ['metadata', program id, mint id, 'edition'])",
        },
        {
          name: "reservationList",
          isMut: true,
          isSigner: false,
          desc: "PDA for ReservationList of ['metadata', program id, master edition key, 'reservation', resource-key]",
        },
        {
          name: "resource",
          isMut: false,
          isSigner: true,
          desc: "The resource you tied the reservation list too",
        },
      ],
      args: [
        {
          name: "setReservationListArgs",
          type: {
            defined: "SetReservationListArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 5,
      },
    },
    {
      name: "DeprecatedCreateReservationList",
      accounts: [
        {
          name: "reservationList",
          isMut: true,
          isSigner: false,
          desc: "PDA for ReservationList of ['metadata', program id, master edition key, 'reservation', resource-key]",
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
          desc: "Payer",
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: true,
          desc: "Update authority",
        },
        {
          name: "masterEdition",
          isMut: false,
          isSigner: false,
          desc: " Master Edition V1 key (pda of ['metadata', program id, mint id, 'edition'])",
        },
        {
          name: "resource",
          isMut: false,
          isSigner: false,
          desc: "A resource you wish to tie the reservation list to. This is so your later visitors who come to redeem can derive your reservation list PDA with something they can easily get at. You choose what this should be.",
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
          desc: "Metadata key (pda of ['metadata', program id, mint id])",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent info",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 6,
      },
    },
    {
      name: "SignMetadata",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "Metadata (pda of ['metadata', program id, mint id])",
        },
        {
          name: "creator",
          isMut: false,
          isSigner: true,
          desc: "Creator",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 7,
      },
    },
    {
      name: "DeprecatedMintPrintingTokensViaToken",
      accounts: [
        {
          name: "destination",
          isMut: true,
          isSigner: false,
          desc: "Destination account",
        },
        {
          name: "token",
          isMut: true,
          isSigner: false,
          desc: "Token account containing one time authorization token",
        },
        {
          name: "oneTimePrintingAuthorizationMint",
          isMut: true,
          isSigner: false,
          desc: "One time authorization mint",
        },
        {
          name: "printingMint",
          isMut: true,
          isSigner: false,
          desc: "Printing mint",
        },
        {
          name: "burnAuthority",
          isMut: false,
          isSigner: true,
          desc: "Burn authority",
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
          desc: "Metadata key (pda of ['metadata', program id, mint id])",
        },
        {
          name: "masterEdition",
          isMut: false,
          isSigner: false,
          desc: "Master Edition V1 key (pda of ['metadata', program id, mint id, 'edition'])",
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          desc: "Token program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent",
        },
      ],
      args: [
        {
          name: "mintPrintingTokensViaTokenArgs",
          type: {
            defined: "MintPrintingTokensViaTokenArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 8,
      },
    },
    {
      name: "DeprecatedMintPrintingTokens",
      accounts: [
        {
          name: "destination",
          isMut: true,
          isSigner: false,
          desc: "Destination account",
        },
        {
          name: "printingMint",
          isMut: true,
          isSigner: false,
          desc: "Printing mint",
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: true,
          desc: "Update authority",
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
          desc: "Metadata key (pda of ['metadata', program id, mint id])",
        },
        {
          name: "masterEdition",
          isMut: false,
          isSigner: false,
          desc: "Master Edition V1 key (pda of ['metadata', program id, mint id, 'edition'])",
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          desc: "Token program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent",
        },
      ],
      args: [
        {
          name: "mintPrintingTokensViaTokenArgs",
          type: {
            defined: "MintPrintingTokensViaTokenArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 9,
      },
    },
    {
      name: "CreateMasterEdition",
      accounts: [
        {
          name: "edition",
          isMut: true,
          isSigner: false,
          desc: "Unallocated edition V2 account with address as pda of ['metadata', program id, mint, 'edition']",
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
          desc: "Metadata mint",
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: true,
          desc: "Update authority",
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: true,
          desc: "Mint authority on the metadata's mint - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY",
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
          desc: "payer",
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
          desc: "Metadata account",
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          desc: "Token program",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent info",
        },
      ],
      args: [
        {
          name: "createMasterEditionArgs",
          type: {
            defined: "CreateMasterEditionArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 10,
      },
    },
    {
      name: "MintNewEditionFromMasterEditionViaToken",
      accounts: [
        {
          name: "newMetadata",
          isMut: true,
          isSigner: false,
          desc: "New Metadata key (pda of ['metadata', program id, mint id])",
        },
        {
          name: "newEdition",
          isMut: true,
          isSigner: false,
          desc: "New Edition (pda of ['metadata', program id, mint id, 'edition'])",
        },
        {
          name: "masterEdition",
          isMut: true,
          isSigner: false,
          desc: "Master Record Edition V2 (pda of ['metadata', program id, master metadata mint id, 'edition'])",
        },
        {
          name: "newMint",
          isMut: true,
          isSigner: false,
          desc: "Mint of new token - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY",
        },
        {
          name: "editionMarkPda",
          isMut: true,
          isSigner: false,
          desc: "Edition pda to mark creation - will be checked for pre-existence. (pda of ['metadata', program id, master metadata mint id, 'edition', edition_number]) where edition_number is NOT the edition number you pass in args but actually edition_number = floor(edition/EDITION_MARKER_BIT_SIZE).",
        },
        {
          name: "newMintAuthority",
          isMut: false,
          isSigner: true,
          desc: "Mint authority of new mint",
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
          desc: "payer",
        },
        {
          name: "tokenAccountOwner",
          isMut: false,
          isSigner: true,
          desc: "owner of token account containing master token (#8)",
        },
        {
          name: "tokenAccount",
          isMut: false,
          isSigner: false,
          desc: "token account containing token from master metadata mint",
        },
        {
          name: "newMetadataUpdateAuthority",
          isMut: false,
          isSigner: false,
          desc: "Update authority info for new metadata",
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
          desc: "Master record metadata account",
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          desc: "Token program",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent info",
        },
      ],
      args: [
        {
          name: "mintNewEditionFromMasterEditionViaTokenArgs",
          type: {
            defined: "MintNewEditionFromMasterEditionViaTokenArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 11,
      },
    },
    {
      name: "ConvertMasterEditionV1ToV2",
      accounts: [
        {
          name: "masterEdition",
          isMut: true,
          isSigner: false,
          desc: "Master Record Edition V1 (pda of ['metadata', program id, master metadata mint id, 'edition'])",
        },
        {
          name: "oneTimeAuth",
          isMut: true,
          isSigner: false,
          desc: "One time authorization mint",
        },
        {
          name: "printingMint",
          isMut: true,
          isSigner: false,
          desc: "Printing mint",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 12,
      },
    },
    {
      name: "MintNewEditionFromMasterEditionViaVaultProxy",
      accounts: [
        {
          name: "newMetadata",
          isMut: true,
          isSigner: false,
          desc: "New Metadata key (pda of ['metadata', program id, mint id])",
        },
        {
          name: "newEdition",
          isMut: true,
          isSigner: false,
          desc: "New Edition (pda of ['metadata', program id, mint id, 'edition'])",
        },
        {
          name: "masterEdition",
          isMut: true,
          isSigner: false,
          desc: "Master Record Edition V2 (pda of ['metadata', program id, master metadata mint id, 'edition']",
        },
        {
          name: "newMint",
          isMut: true,
          isSigner: false,
          desc: "Mint of new token - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY",
        },
        {
          name: "editionMarkPda",
          isMut: true,
          isSigner: false,
          desc: "Edition pda to mark creation - will be checked for pre-existence. (pda of ['metadata', program id, master metadata mint id, 'edition', edition_number]) where edition_number is NOT the edition number you pass in args but actually edition_number = floor(edition/EDITION_MARKER_BIT_SIZE).",
        },
        {
          name: "newMintAuthority",
          isMut: false,
          isSigner: true,
          desc: "Mint authority of new mint",
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
          desc: "payer",
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: true,
          desc: "Vault authority",
        },
        {
          name: "safetyDepositStore",
          isMut: false,
          isSigner: false,
          desc: "Safety deposit token store account",
        },
        {
          name: "safetyDepositBox",
          isMut: false,
          isSigner: false,
          desc: "Safety deposit box",
        },
        {
          name: "vault",
          isMut: false,
          isSigner: false,
          desc: "Vault",
        },
        {
          name: "newMetadataUpdateAuthority",
          isMut: false,
          isSigner: false,
          desc: "Update authority info for new metadata",
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
          desc: "Master record metadata account",
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          desc: "Token program",
        },
        {
          name: "tokenVaultProgram",
          isMut: false,
          isSigner: false,
          desc: "Token vault program",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent info",
        },
      ],
      args: [
        {
          name: "mintNewEditionFromMasterEditionViaTokenArgs",
          type: {
            defined: "MintNewEditionFromMasterEditionViaTokenArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 13,
      },
    },
    {
      name: "PuffMetadata",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "Metadata account",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 14,
      },
    },
    {
      name: "UpdateMetadataAccountV2",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "Metadata account",
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: true,
          desc: "Update authority key",
        },
      ],
      args: [
        {
          name: "updateMetadataAccountArgsV2",
          type: {
            defined: "UpdateMetadataAccountArgsV2",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 15,
      },
    },
    {
      name: "CreateMetadataAccountV2",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "Metadata key (pda of ['metadata', program id, mint id])",
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
          desc: "Mint of token asset",
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: true,
          desc: "Mint authority",
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
          desc: "payer",
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: false,
          desc: "update authority info",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent info",
        },
      ],
      args: [
        {
          name: "createMetadataAccountArgsV2",
          type: {
            defined: "CreateMetadataAccountArgsV2",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 16,
      },
    },
    {
      name: "CreateMasterEditionV3",
      accounts: [
        {
          name: "edition",
          isMut: true,
          isSigner: false,
          desc: "Unallocated edition V2 account with address as pda of ['metadata', program id, mint, 'edition']",
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
          desc: "Metadata mint",
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: true,
          desc: "Update authority",
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: true,
          desc: "Mint authority on the metadata's mint - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY",
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
          desc: "payer",
        },
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "Metadata account",
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          desc: "Token program",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent info",
        },
      ],
      args: [
        {
          name: "createMasterEditionArgs",
          type: {
            defined: "CreateMasterEditionArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 17,
      },
    },
    {
      name: "VerifyCollection",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "Metadata account",
        },
        {
          name: "collectionAuthority",
          isMut: false,
          isSigner: true,
          desc: "Collection Update authority",
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
          desc: "payer",
        },
        {
          name: "collectionMint",
          isMut: false,
          isSigner: false,
          desc: "Mint of the Collection",
        },
        {
          name: "collection",
          isMut: false,
          isSigner: false,
          desc: "Metadata Account of the Collection",
        },
        {
          name: "collectionMasterEditionAccount",
          isMut: false,
          isSigner: false,
          desc: "MasterEdition2 Account of the Collection Token",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 18,
      },
    },
    {
      name: "Utilize",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "Metadata account",
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
          desc: "Token Account Of NFT",
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
          desc: "Mint of the Metadata",
        },
        {
          name: "useAuthority",
          isMut: false,
          isSigner: true,
          desc: "A Use Authority / Can be the current Owner of the NFT",
        },
        {
          name: "owner",
          isMut: false,
          isSigner: false,
          desc: "Owner",
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          desc: "Token program",
        },
        {
          name: "ataProgram",
          isMut: false,
          isSigner: false,
          desc: "Associated Token program",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent info",
        },
        {
          name: "useAuthorityRecord",
          isMut: true,
          isSigner: false,
          desc: "(Optional) Use Authority Record PDA If present the program Assumes a delegated use authority",
        },
        {
          name: "burner",
          isMut: false,
          isSigner: false,
          desc: "(Optional) Program As Signer (Burner)",
        },
      ],
      args: [
        {
          name: "utilizeArgs",
          type: {
            defined: "UtilizeArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 19,
      },
    },
    {
      name: "ApproveUseAuthority",
      accounts: [
        {
          name: "useAuthorityRecord",
          isMut: true,
          isSigner: false,
          desc: "Use Authority Record PDA",
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
          desc: "Owner",
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
          desc: "Payer",
        },
        {
          name: "user",
          isMut: false,
          isSigner: false,
          desc: "A Use Authority",
        },
        {
          name: "ownerTokenAccount",
          isMut: true,
          isSigner: false,
          desc: "Owned Token Account Of Mint",
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
          desc: "Metadata account",
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
          desc: "Mint of Metadata",
        },
        {
          name: "burner",
          isMut: false,
          isSigner: false,
          desc: "Program As Signer (Burner)",
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          desc: "Token program",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent info",
        },
      ],
      args: [
        {
          name: "approveUseAuthorityArgs",
          type: {
            defined: "ApproveUseAuthorityArgs",
          },
        },
      ],
      discriminant: {
        type: "u8",
        value: 20,
      },
    },
    {
      name: "RevokeUseAuthority",
      accounts: [
        {
          name: "useAuthorityRecord",
          isMut: true,
          isSigner: false,
          desc: "Use Authority Record PDA",
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
          desc: "Owner",
        },
        {
          name: "user",
          isMut: false,
          isSigner: false,
          desc: "A Use Authority",
        },
        {
          name: "ownerTokenAccount",
          isMut: true,
          isSigner: false,
          desc: "Owned Token Account Of Mint",
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
          desc: "Mint of Metadata",
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
          desc: "Metadata account",
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          desc: "Token program",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent info",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 21,
      },
    },
    {
      name: "UnverifyCollection",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "Metadata account",
        },
        {
          name: "collectionAuthority",
          isMut: false,
          isSigner: true,
          desc: "Collection Authority",
        },
        {
          name: "collectionMint",
          isMut: false,
          isSigner: false,
          desc: "Mint of the Collection",
        },
        {
          name: "collection",
          isMut: false,
          isSigner: false,
          desc: "Metadata Account of the Collection",
        },
        {
          name: "collectionMasterEditionAccount",
          isMut: false,
          isSigner: false,
          desc: "MasterEdition2 Account of the Collection Token",
        },
        {
          name: "collectionAuthorityRecord",
          isMut: false,
          isSigner: false,
          desc: "(Optional) Collection Authority Record PDA",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 22,
      },
    },
    {
      name: "ApproveCollectionAuthority",
      accounts: [
        {
          name: "collectionAuthorityRecord",
          isMut: true,
          isSigner: false,
          desc: "Collection Authority Record PDA",
        },
        {
          name: "newCollectionAuthority",
          isMut: false,
          isSigner: false,
          desc: "A Collection Authority",
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: true,
          desc: "Update Authority of Collection NFT",
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
          desc: "Payer",
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
          desc: "Collection Metadata account",
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
          desc: "Mint of Collection Metadata",
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          desc: "System program",
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          desc: "Rent info",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 23,
      },
    },
    {
      name: "RevokeCollectionAuthority",
      accounts: [
        {
          name: "collectionAuthorityRecord",
          isMut: true,
          isSigner: false,
          desc: "Collection Authority Record PDA",
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: true,
          desc: "Update Authority of Collection NFT",
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
          desc: "Metadata account",
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
          desc: "Mint of Metadata",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 24,
      },
    },
    {
      name: "SetAndVerifyCollection",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "Metadata account",
        },
        {
          name: "collectionAuthority",
          isMut: false,
          isSigner: true,
          desc: "Collection Update authority",
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
          desc: "Payer",
        },
        {
          name: "updateAuthority",
          isMut: false,
          isSigner: false,
          desc: "Update Authority of Collection NFT and NFT",
        },
        {
          name: "collectionMint",
          isMut: false,
          isSigner: false,
          desc: "Mint of the Collection",
        },
        {
          name: "collection",
          isMut: false,
          isSigner: false,
          desc: "Metadata Account of the Collection",
        },
        {
          name: "collectionMasterEditionAccount",
          isMut: false,
          isSigner: false,
          desc: "MasterEdition2 Account of the Collection Token",
        },
        {
          name: "collectionAuthorityRecord",
          isMut: false,
          isSigner: false,
          desc: "(Optional) Collection Authority Record PDA",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 25,
      },
    },
    {
      name: "FreezeDelegatedAccount",
      accounts: [
        {
          name: "delegate",
          isMut: false,
          isSigner: true,
          desc: "Delegate",
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
          desc: "Token account to freeze",
        },
        {
          name: "edition",
          isMut: false,
          isSigner: false,
          desc: "Edition",
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
          desc: "Token mint",
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          desc: "Token Program",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 26,
      },
    },
    {
      name: "ThawDelegatedAccount",
      accounts: [
        {
          name: "delegate",
          isMut: false,
          isSigner: true,
          desc: "Delegate",
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
          desc: "Token account to thaw",
        },
        {
          name: "edition",
          isMut: false,
          isSigner: false,
          desc: "Edition",
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
          desc: "Token mint",
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          desc: "Token Program",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 27,
      },
    },
    {
      name: "RemoveCreatorVerification",
      accounts: [
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
          desc: "Metadata (pda of ['metadata', program id, mint id])",
        },
        {
          name: "creator",
          isMut: false,
          isSigner: true,
          desc: "Creator",
        },
      ],
      args: [],
      discriminant: {
        type: "u8",
        value: 28,
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
      name: "Edition",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: {
              defined: "Key",
            },
          },
          {
            name: "parent",
            type: "publicKey",
          },
          {
            name: "edition",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "MasterEditionV1",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: {
              defined: "Key",
            },
          },
          {
            name: "supply",
            type: "u64",
          },
          {
            name: "maxSupply",
            type: {
              option: "u64",
            },
          },
          {
            name: "printingMint",
            type: "publicKey",
          },
          {
            name: "oneTimePrintingAuthorizationMint",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "ReservationListV1",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: {
              defined: "Key",
            },
          },
          {
            name: "masterEdition",
            type: "publicKey",
          },
          {
            name: "supplySnapshot",
            type: {
              option: "u64",
            },
          },
          {
            name: "reservations",
            type: {
              vec: {
                defined: "ReservationV1",
              },
            },
          },
        ],
      },
    },
    {
      name: "Metadata",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: {
              defined: "Key",
            },
          },
          {
            name: "updateAuthority",
            type: "publicKey",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "data",
            type: {
              defined: "Data",
            },
          },
          {
            name: "primarySaleHappened",
            type: "bool",
          },
          {
            name: "isMutable",
            type: "bool",
          },
          {
            name: "editionNonce",
            type: {
              option: "u8",
            },
          },
          {
            name: "tokenStandard",
            type: {
              option: {
                defined: "TokenStandard",
              },
            },
          },
          {
            name: "collection",
            type: {
              option: {
                defined: "Collection",
              },
            },
          },
          {
            name: "uses",
            type: {
              option: {
                defined: "Uses",
              },
            },
          },
        ],
      },
    },
    {
      name: "ReservationListV2",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: {
              defined: "Key",
            },
          },
          {
            name: "masterEdition",
            type: "publicKey",
          },
          {
            name: "supplySnapshot",
            type: {
              option: "u64",
            },
          },
          {
            name: "reservations",
            type: {
              vec: {
                defined: "Reservation",
              },
            },
          },
          {
            name: "totalReservationSpots",
            type: "u64",
          },
          {
            name: "currentReservationSpots",
            type: "u64",
          },
        ],
      },
    },

    {
      name: "MasterEditionV2",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: {
              defined: "Key",
            },
          },
          {
            name: "supply",
            type: "u64",
          },
          {
            name: "maxSupply",
            type: {
              option: "u64",
            },
          },
        ],
      },
    },
    {
      name: "EditionMarker",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: {
              defined: "Key",
            },
          },
          {
            name: "ledger",
            type: {
              array: ["u8", 31],
            },
          },
        ],
      },
    },
    {
      name: "UseAuthorityRecord",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: {
              defined: "Key",
            },
          },
          {
            name: "allowedUses",
            type: "u64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "CollectionAuthorityRecord",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: {
              defined: "Key",
            },
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "MintPrintingTokensViaTokenArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "supply",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "SetReservationListArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "reservations",
            type: {
              vec: {
                defined: "Reservation",
              },
            },
          },
          {
            name: "totalReservationSpots",
            type: {
              option: "u64",
            },
          },
          {
            name: "offset",
            type: "u64",
          },
          {
            name: "totalSpotOffset",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "UpdateMetadataAccountArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "data",
            type: {
              option: {
                defined: "Data",
              },
            },
          },
          {
            name: "updateAuthority",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "primarySaleHappened",
            type: {
              option: "bool",
            },
          },
        ],
      },
    },
    {
      name: "UpdateMetadataAccountArgsV2",
      type: {
        kind: "struct",
        fields: [
          {
            name: "data",
            type: {
              option: {
                defined: "DataV2",
              },
            },
          },
          {
            name: "updateAuthority",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "primarySaleHappened",
            type: {
              option: "bool",
            },
          },
          {
            name: "isMutable",
            type: {
              option: "bool",
            },
          },
        ],
      },
    },
    {
      name: "CreateMetadataAccountArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "data",
            type: {
              defined: "Data",
            },
          },
          {
            name: "isMutable",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "CreateMetadataAccountArgsV2",
      type: {
        kind: "struct",
        fields: [
          {
            name: "data",
            type: {
              defined: "DataV2",
            },
          },
          {
            name: "isMutable",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "CreateMasterEditionArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "maxSupply",
            type: {
              option: "u64",
            },
          },
        ],
      },
    },
    {
      name: "MintNewEditionFromMasterEditionViaTokenArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "edition",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "ApproveUseAuthorityArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "numberOfUses",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "UtilizeArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "numberOfUses",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "Data",
      type: {
        kind: "struct",
        fields: [
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
          {
            name: "sellerFeeBasisPoints",
            type: "u16",
          },
          {
            name: "creators",
            type: {
              option: {
                vec: {
                  defined: "Creator",
                },
              },
            },
          },
        ],
      },
    },
    {
      name: "DataV2",
      type: {
        kind: "struct",
        fields: [
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
          {
            name: "sellerFeeBasisPoints",
            type: "u16",
          },
          {
            name: "creators",
            type: {
              option: {
                vec: {
                  defined: "Creator",
                },
              },
            },
          },
          {
            name: "collection",
            type: {
              option: {
                defined: "Collection",
              },
            },
          },
          {
            name: "uses",
            type: {
              option: {
                defined: "Uses",
              },
            },
          },
        ],
      },
    },
    {
      name: "Uses",
      type: {
        kind: "struct",
        fields: [
          {
            name: "useMethod",
            type: {
              defined: "UseMethod",
            },
          },
          {
            name: "remaining",
            type: "u64",
          },
          {
            name: "total",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "Collection",
      type: {
        kind: "struct",
        fields: [
          {
            name: "verified",
            type: "bool",
          },
          {
            name: "key",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "Creator",
      type: {
        kind: "struct",
        fields: [
          {
            name: "address",
            type: "publicKey",
          },
          {
            name: "verified",
            type: "bool",
          },
          {
            name: "share",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "Reservation",
      type: {
        kind: "struct",
        fields: [
          {
            name: "address",
            type: "publicKey",
          },
          {
            name: "spotsRemaining",
            type: "u64",
          },
          {
            name: "totalSpots",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "ReservationV1",
      type: {
        kind: "struct",
        fields: [
          {
            name: "address",
            type: "publicKey",
          },
          {
            name: "spotsRemaining",
            type: "u8",
          },
          {
            name: "totalSpots",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "Key",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Uninitialized",
          },
          {
            name: "EditionV1",
          },
          {
            name: "MasterEditionV1",
          },
          {
            name: "ReservationListV1",
          },
          {
            name: "MetadataV1",
          },
          {
            name: "ReservationListV2",
          },
          {
            name: "MasterEditionV2",
          },
          {
            name: "EditionMarker",
          },
          {
            name: "UseAuthorityRecord",
          },
          {
            name: "CollectionAuthorityRecord",
          },
        ],
      },
    },
    {
      name: "UseMethod",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Burn",
          },
          {
            name: "Multiple",
          },
          {
            name: "Single",
          },
        ],
      },
    },
    {
      name: "TokenStandard",
      type: {
        kind: "enum",
        variants: [
          {
            name: "NonFungible",
          },
          {
            name: "FungibleAsset",
          },
          {
            name: "Fungible",
          },
          {
            name: "NonFungibleEdition",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 0,
      name: "InstructionUnpackError",
      msg: "Failed to unpack instruction data",
    },
    {
      code: 1,
      name: "InstructionPackError",
      msg: "Failed to pack instruction data",
    },
    {
      code: 2,
      name: "NotRentExempt",
      msg: "Lamport balance below rent-exempt threshold",
    },
    {
      code: 3,
      name: "AlreadyInitialized",
      msg: "Already initialized",
    },
    {
      code: 4,
      name: "Uninitialized",
      msg: "Uninitialized",
    },
    {
      code: 5,
      name: "InvalidMetadataKey",
      msg: " Metadata's key must match seed of ['metadata', program id, mint] provided",
    },
    {
      code: 6,
      name: "InvalidEditionKey",
      msg: "Edition's key must match seed of ['metadata', program id, name, 'edition'] provided",
    },
    {
      code: 7,
      name: "UpdateAuthorityIncorrect",
      msg: "Update Authority given does not match",
    },
    {
      code: 8,
      name: "UpdateAuthorityIsNotSigner",
      msg: "Update Authority needs to be signer to update metadata",
    },
    {
      code: 9,
      name: "NotMintAuthority",
      msg: "You must be the mint authority and signer on this transaction",
    },
    {
      code: 10,
      name: "InvalidMintAuthority",
      msg: "Mint authority provided does not match the authority on the mint",
    },
    {
      code: 11,
      name: "NameTooLong",
      msg: "Name too long",
    },
    {
      code: 12,
      name: "SymbolTooLong",
      msg: "Symbol too long",
    },
    {
      code: 13,
      name: "UriTooLong",
      msg: "URI too long",
    },
    {
      code: 14,
      name: "UpdateAuthorityMustBeEqualToMetadataAuthorityAndSigner",
      msg: "Update authority must be equivalent to the metadata's authority and also signer of this transaction",
    },
    {
      code: 15,
      name: "MintMismatch",
      msg: "Mint given does not match mint on Metadata",
    },
    {
      code: 16,
      name: "EditionsMustHaveExactlyOneToken",
      msg: "Editions must have exactly one token",
    },
    {
      code: 17,
      name: "MaxEditionsMintedAlready",
      msg: "Maximum editions printed already",
    },
    {
      code: 18,
      name: "TokenMintToFailed",
      msg: "Token mint to failed",
    },
    {
      code: 19,
      name: "MasterRecordMismatch",
      msg: "The master edition record passed must match the master record on the edition given",
    },
    {
      code: 20,
      name: "DestinationMintMismatch",
      msg: "The destination account does not have the right mint",
    },
    {
      code: 21,
      name: "EditionAlreadyMinted",
      msg: "An edition can only mint one of its kind!",
    },
    {
      code: 22,
      name: "PrintingMintDecimalsShouldBeZero",
      msg: "Printing mint decimals should be zero",
    },
    {
      code: 23,
      name: "OneTimePrintingAuthorizationMintDecimalsShouldBeZero",
      msg: "OneTimePrintingAuthorization mint decimals should be zero",
    },
    {
      code: 24,
      name: "EditionMintDecimalsShouldBeZero",
      msg: "EditionMintDecimalsShouldBeZero",
    },
    {
      code: 25,
      name: "TokenBurnFailed",
      msg: "Token burn failed",
    },
    {
      code: 26,
      name: "TokenAccountOneTimeAuthMintMismatch",
      msg: "The One Time authorization mint does not match that on the token account!",
    },
    {
      code: 27,
      name: "DerivedKeyInvalid",
      msg: "Derived key invalid",
    },
    {
      code: 28,
      name: "PrintingMintMismatch",
      msg: "The Printing mint does not match that on the master edition!",
    },
    {
      code: 29,
      name: "OneTimePrintingAuthMintMismatch",
      msg: "The One Time Printing Auth mint does not match that on the master edition!",
    },
    {
      code: 30,
      name: "TokenAccountMintMismatch",
      msg: "The mint of the token account does not match the Printing mint!",
    },
    {
      code: 31,
      name: "TokenAccountMintMismatchV2",
      msg: "The mint of the token account does not match the master metadata mint!",
    },
    {
      code: 32,
      name: "NotEnoughTokens",
      msg: "Not enough tokens to mint a limited edition",
    },
    {
      code: 33,
      name: "PrintingMintAuthorizationAccountMismatch",
      msg: "The mint on your authorization token holding account does not match your Printing mint!",
    },
    {
      code: 34,
      name: "AuthorizationTokenAccountOwnerMismatch",
      msg: "The authorization token account has a different owner than the update authority for the master edition!",
    },
    {
      code: 35,
      name: "Disabled",
      msg: "This feature is currently disabled.",
    },
    {
      code: 36,
      name: "CreatorsTooLong",
      msg: "Creators list too long",
    },
    {
      code: 37,
      name: "CreatorsMustBeAtleastOne",
      msg: "Creators must be at least one if set",
    },
    {
      code: 38,
      name: "MustBeOneOfCreators",
      msg: "If using a creators array, you must be one of the creators listed",
    },
    {
      code: 39,
      name: "NoCreatorsPresentOnMetadata",
      msg: "This metadata does not have creators",
    },
    {
      code: 40,
      name: "CreatorNotFound",
      msg: "This creator address was not found",
    },
    {
      code: 41,
      name: "InvalidBasisPoints",
      msg: "Basis points cannot be more than 10000",
    },
    {
      code: 42,
      name: "PrimarySaleCanOnlyBeFlippedToTrue",
      msg: "Primary sale can only be flipped to true and is immutable",
    },
    {
      code: 43,
      name: "OwnerMismatch",
      msg: "Owner does not match that on the account given",
    },
    {
      code: 44,
      name: "NoBalanceInAccountForAuthorization",
      msg: "This account has no tokens to be used for authorization",
    },
    {
      code: 45,
      name: "ShareTotalMustBe100",
      msg: "Share total must equal 100 for creator array",
    },
    {
      code: 46,
      name: "ReservationExists",
      msg: "This reservation list already exists!",
    },
    {
      code: 47,
      name: "ReservationDoesNotExist",
      msg: "This reservation list does not exist!",
    },
    {
      code: 48,
      name: "ReservationNotSet",
      msg: "This reservation list exists but was never set with reservations",
    },
    {
      code: 49,
      name: "ReservationAlreadyMade",
      msg: "This reservation list has already been set!",
    },
    {
      code: 50,
      name: "BeyondMaxAddressSize",
      msg: "Provided more addresses than max allowed in single reservation",
    },
    {
      code: 51,
      name: "NumericalOverflowError",
      msg: "NumericalOverflowError",
    },
    {
      code: 52,
      name: "ReservationBreachesMaximumSupply",
      msg: "This reservation would go beyond the maximum supply of the master edition!",
    },
    {
      code: 53,
      name: "AddressNotInReservation",
      msg: "Address not in reservation!",
    },
    {
      code: 54,
      name: "CannotVerifyAnotherCreator",
      msg: "You cannot unilaterally verify another creator, they must sign",
    },
    {
      code: 55,
      name: "CannotUnverifyAnotherCreator",
      msg: "You cannot unilaterally unverify another creator",
    },
    {
      code: 56,
      name: "SpotMismatch",
      msg: "In initial reservation setting, spots remaining should equal total spots",
    },
    {
      code: 57,
      name: "IncorrectOwner",
      msg: "Incorrect account owner",
    },
    {
      code: 58,
      name: "PrintingWouldBreachMaximumSupply",
      msg: "printing these tokens would breach the maximum supply limit of the master edition",
    },
    {
      code: 59,
      name: "DataIsImmutable",
      msg: "Data is immutable",
    },
    {
      code: 60,
      name: "DuplicateCreatorAddress",
      msg: "No duplicate creator addresses",
    },
    {
      code: 61,
      name: "ReservationSpotsRemainingShouldMatchTotalSpotsAtStart",
      msg: "Reservation spots remaining should match total spots when first being created",
    },
    {
      code: 62,
      name: "InvalidTokenProgram",
      msg: "Invalid token program",
    },
    {
      code: 63,
      name: "DataTypeMismatch",
      msg: "Data type mismatch",
    },
    {
      code: 64,
      name: "BeyondAlottedAddressSize",
      msg: "Beyond alotted address size in reservation!",
    },
    {
      code: 65,
      name: "ReservationNotComplete",
      msg: "The reservation has only been partially alotted",
    },
    {
      code: 66,
      name: "TriedToReplaceAnExistingReservation",
      msg: "You cannot splice over an existing reservation!",
    },
    {
      code: 67,
      name: "InvalidOperation",
      msg: "Invalid operation",
    },
    {
      code: 68,
      name: "InvalidOwner",
      msg: "Invalid Owner",
    },
    {
      code: 69,
      name: "PrintingMintSupplyMustBeZeroForConversion",
      msg: "Printing mint supply must be zero for conversion",
    },
    {
      code: 70,
      name: "OneTimeAuthMintSupplyMustBeZeroForConversion",
      msg: "One Time Auth mint supply must be zero for conversion",
    },
    {
      code: 71,
      name: "InvalidEditionIndex",
      msg: "You tried to insert one edition too many into an edition mark pda",
    },
    {
      code: 72,
      name: "ReservationArrayShouldBeSizeOne",
      msg: "In the legacy system the reservation needs to be of size one for cpu limit reasons",
    },
    {
      code: 73,
      name: "IsMutableCanOnlyBeFlippedToFalse",
      msg: "Is Mutable can only be flipped to false",
    },
    {
      code: 74,
      name: "CollectionCannotBeVerifiedInThisInstruction",
      msg: "Cannont Verify Collection in this Instruction",
    },
    {
      code: 75,
      name: "Removed",
      msg: "This instruction was deprecated in a previous release and is now removed",
    },
    {
      code: 76,
      name: "MustBeBurned",
      msg: "This token use method is burn and there are no remaining uses, it must be burned",
    },
    {
      code: 77,
      name: "InvalidUseMethod",
      msg: "This use method is invalid",
    },
    {
      code: 78,
      name: "CannotChangeUseMethodAfterFirstUse",
      msg: "Cannot Change Use Method after the first use",
    },
    {
      code: 79,
      name: "CannotChangeUsesAfterFirstUse",
      msg: "Cannot Change Remaining or Available uses after the first use",
    },
    {
      code: 80,
      name: "CollectionNotFound",
      msg: "Collection Not Found on Metadata",
    },
    {
      code: 81,
      name: "InvalidCollectionUpdateAuthority",
      msg: "Collection Update Authority is invalid",
    },
    {
      code: 82,
      name: "CollectionMustBeAUniqueMasterEdition",
      msg: "Collection Must Be a Unique Master Edition v2",
    },
    {
      code: 83,
      name: "UseAuthorityRecordAlreadyExists",
      msg: "The Use Authority Record Already Exists, to modify it Revoke, then Approve",
    },
    {
      code: 84,
      name: "UseAuthorityRecordAlreadyRevoked",
      msg: "The Use Authority Record is empty or already revoked",
    },
    {
      code: 85,
      name: "Unusable",
      msg: "This token has no uses",
    },
    {
      code: 86,
      name: "NotEnoughUses",
      msg: "There are not enough Uses left on this token.",
    },
    {
      code: 87,
      name: "CollectionAuthorityRecordAlreadyExists",
      msg: "This Collection Authority Record Already Exists.",
    },
    {
      code: 88,
      name: "CollectionAuthorityDoesNotExist",
      msg: "This Collection Authority Record Does Not Exist.",
    },
    {
      code: 89,
      name: "InvalidUseAuthorityRecord",
      msg: "This Use Authority Record is invalid.",
    },
    {
      code: 90,
      name: "InvalidCollectionAuthorityRecord",
      msg: "This Collection Authority Record is invalid.",
    },
    {
      code: 91,
      name: "InvalidFreezeAuthority",
      msg: "Metadata does not match the freeze authority on the mint",
    },
    {
      code: 92,
      name: "InvalidDelegate",
      msg: "All tokens in this account have not been delegated to this user.",
    },
    {
      code: 93,
      name: "CannotAdjustVerifiedCreator",
      msg: "Creator can not be adjusted once they are verified.",
    },
    {
      code: 94,
      name: "CannotRemoveVerifiedCreator",
      msg: "Verified creators cannot be removed.",
    },
    {
      code: 95,
      name: "CannotWipeVerifiedCreators",
      msg: "Can not wipe verified creators.",
    },
    {
      code: 96,
      name: "NotAllowedToChangeSellerFeeBasisPoints",
      msg: "Not allowed to change seller fee basis points.",
    },
  ],
  metadata: {
    origin: "shank",
    address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
  },
};
