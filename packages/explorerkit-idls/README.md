<p align="center">
  <a href="https://github.com/solana-fm/explorer-kit">
    <img src="images/logo.png" width="320px" alt="SolanaFM logo" />
  </a>
</p>

<h3 align="center">Solana Data Parser for Developers</h3>
<p align="center">Framework agnostic and can be used by anyone, everywhere</p>
<br>

<p align="center">
    <a href="https://www.npmjs.com/package/@solanafm/explorer-kit" alt="ExplorerKit NPM Link">
        <img src="https://img.shields.io/npm/v/%40solanafm%2Fexplorer-kit?logo=npm&label=explorer-kit" />
    </a>
    <a href="https://www.npmjs.com/package/@solanafm/explorer-kit-idls" alt="ExplorerKit IDLs NPM Link">
        <img src="https://img.shields.io/npm/v/%40solanafm%2Fexplorer-kit-idls?logo=npm&label=explorer-kit-idls" />
    </a>
</p>
<br>

## Features

- 📦 **Framework agnostic** - Use it with any framework you want
- ♻️ **Space efficient** - Reduce package size overhead as you don't have to generate SDKs for your project to use
- 🧑‍💻 **User friendly** - Easy to use and understand

## Getting Started

### ⚡️ Installation

Install ExplorerKit with these simple commands:

- Use any package manager that you desire to install ExplorerKit

Using **npm**:

```bash
npm add @solanafm/explorer-kit
npm add @solanafm/explorer-kit-idls
```

Using **yarn**:

```bash
yarn add @solanafm/explorer-kit
yarn add @solanafm/explorer-kit-idls
```

Using **pnpm**:

```bash
pnpm add @solanafm/explorer-kit
pnpm add @solanafm/explorer-kit-idls
```

Once the packages have been installed, you can start using ExplorerKit in your project 🎉

### 🚀 Usage

How to get a SolanaFM IdlItem to start parsing a transaction or account state for a particular program:

```ts
import { getProgramIdl } from "@solanafm/explorer-kit-idls";

const programId = "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY";
// Get the IDL for a specific program hash
const SFMIdlItem = await getProgramIdl(programId);
// You can also get an IDL at a specific slot context if you're trying to histroically parse a transaction / account
// but the IDL might not be backwards compatible.
const historicalSFMIdlItem = await getProgramIdl(programId, {
  slotContext: 132322893,
});
```

Parsing a transaction:

```ts
import { SolanaFMParser, checkIfInstructionParser, ParserType } from "@solanafm/explorer-kit";
import { getProgramIdl } from "@solanafm/explorer-kit-idls";

const programId = "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY";
// Get the IDL for a specific program hash
const SFMIdlItem = await getProgramIdl(programId);
// You can also get an IDL at a specific slot context if you're trying to histroically parse a transaction / account
// but the IDL might not be backwards compatible.
const historicalSFMIdlItem = await getProgramIdl(programId, {
  slotContext: 132322893,
});
// For now, we only support parsing transactions with an encoded base 58 message
const ixData = "1AMTAauCh9UPEJKKd6LnGGtWqFvRs2aUZkv9r6wNe3PTzB1KS9TbwYzM8Cp7vUSDYZXTxXJp5M";
// Checks if SFMIdlItem is defined, if not you will not be able to initialize the parser layout
if (SFMIdlItem) {
  const parser = new SolanaFMParser(SFMIdlItem, programId);
  const instructionParser = parser.createParser(ParserType.INSTRUCTION);

  if (instructionParser && checkIfInstructionParser(instructionParser)) {
    // Parse the transaction
    const decodedData = instructionParser.parseInstructions(ixData);
  }
}
```

Parsing an event data:

```ts
import { SolanaFMParser. checkIfEventParser, ParserType } from "@solanafm/explorer-kit"

// For event data they have to base-64 encoded and they can be extracted from logs or a inner instruction with CPI logs.
// Phoenix Program Event Data
const eventData = "DwEABF2SDQAAAABDfDtlAAAAAKiVfA0AAAAAL9p3EN7QVm+wCbiCUn2jVyJyazsZQYgqVRhf6h2a/pX5SjR+9eBu2sQU7NYr1TEeH7vRFNOiXSyDLJ9g+fDJrwMAAgAABPzrK7CsLqR5NiVFXYwyp7QgatDNQXbn3JA8wOVXQfANFxMTAAAAAIB/AAAAAAAAg7MAAAAAAAAAAAAAAAAAAAIBAAT86yuwrC6keTYlRV2MMqe0IGrQzUF259yQPMDlV0HwDhcTEwAAAACCfwAAAAAAAByBAAAAAAAA6EwCAAAAAAAGAgAAAAAAAAAAAAAAAAAAAAAAnzQBAAAAAABzEb6ZAAAAALveBwAAAAAA"
const parser = new SolanaFMParser(SFMIdlItem);
const eventParser = parser.createParser(ParserType.EVENT);

if (eventParser && checkIfEventParser(eventParser)) {
    // Parse the transaction
    const decodedData = parser.parseEvents(eventData);
}
```

Parsing an account data:

```ts
import { SolanaFMParser, checkIfAccountParser, ParserType } from "@solanafm/explorer-kit";

const SFMIdlItem = await getProgramIdl(programId);

// Account data have to be base-64 encoded
// Stake Pool Account Data
const accountData =
  "AWq1iyr99ATwNekhxZcljopQjeBixmWt+p/5CTXBmRbd3Noj1MlCDU6CVh08awajdvCUB/G3tPyo/emrHFdD8Wfh4Pippvxf8kLk81F78B7Wst0ZUaC6ttlDVyWShgT3cP/LqkIDCUdVLBkThURwDuYX1RR+JyWBHNvgnIkDCm914o2jckW1NrCzDbv9Jn/RWcT0cAMYKm8U4SfG/F878wV0XwxEYxirEMlfQJSVhXDNBXRlpU2rFNnd40gahv7V/Mvj/aPav/vdTOwRdFALTRZQlijB9G5myz+0QWe7U7EGIQbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpE2P1ZIWKAQDUAp5GdmQBAMkBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQJwAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECcAAAAAAAAAAAAAAAAAAABWHWK1dGQBAAgnQqFYigEAv0rw1gHIAQAPfXpGLPQBABAnAAAAAAAAAAAAAAAAAAAAicd7jscBANVMdCNW7gEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

const parser = new SolanaFMParser(SFMIdlItem);
const eventParser = parser.createParser(ParserType.ACCOUNT);

if (eventParser && checkIfAccountParser(eventParser)) {
  // Parse the transaction
  const decodedData = eventParser.parseAccount(accountData);
}
```

Once the data is parsed, the returned data type will look something like this

```ts
export type ParserOutput = {
  // The name of the struct that's being used to parse the data
  name: string;
  // The parsed data according to the IDL schema
  data: any;
  // ParserType depends on the type of parser you have initialized
  type: ParserType;
} | null;
```

More to be added soon...

You can also checkout the [examples](https://github.com/solana-fm/explorer-kit/examples) as well!

## Caveats and Limitations

- IDLs found in `@solanafm/explorer-kit-idls` are usually IDLs for programs that are immutable and are not expected to change. These IDLs can be imported directly from the package and used in your project without interacting with our API. If you wish to get the latest IDLs that might be on chain, `getProgramIdl()` will do a API call to our API to query for the relevant IDLs
- **Account** and **Event** parsers only takes in a `base64` encoded string at the moment
- **Instruction** parsers only takes in a `base58` encoded string at the moment

## Supported Programs

| Program IDs                                                                             | Program                        | Working Parsers                              |
| --------------------------------------------------------------------------------------- | ------------------------------ | -------------------------------------------- |
| 11111111111111111111111111111111                                                        | System Program                 | Account, Instructions                        |
| Config1111111111111111111111111111111111111                                             | Config Program                 | Account, Instructions                        |
| Stake11111111111111111111111111111111111111                                             | Stake Program                  | Account, Instructions                        |
| Vote111111111111111111111111111111111111111                                             | Vote Program                   | Account, Instructions                        |
| ComputeBudget111111111111111111111111111111                                             | Compute Budget Program         | Instructions                                 |
| BPFLoaderUpgradeab1e11111111111111111111111                                             | BPF Upgradeable Loader Program | Account, Instructions                        |
| TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA                                             | Token Program                  | Account, Instructions                        |
| TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb                                             | Token 2022 Program             | Account, Instructions, Extensions (built-in) |
| namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX                                             | Name Service Program           | Account, Instructions                        |
| SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy                                             | Stake Pool Program             | Account, Instructions                        |
| ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL                                            | Associated Token Program       | Instructions                                 |
| PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY                                             | Phoenix Program                | Account, Instructions, Events                |
| metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s                                             | Token Metadata Program         | Account, Instructions                        |
| auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg                                             | Token Auth Rules Program       | Instructions                                 |
| AddressLookupTab1e1111111111111111111111111                                             | Address Lookup Table           | Account, Instructions                        |
| SysvarC1ock11111111111111111111111111111111                                             | Clock Sysvar                   | Account                                      |
| SysvarEpochSchedu1e111111111111111111111111                                             | Epoch Schedule Sysvar          | Account                                      |
| SysvarFees111111111111111111111111111111111                                             | Fees Sysvar                    | Account                                      |
| SysvarRecentB1ockHashes11111111111111111111                                             | Recent Blockhashes Sysvar      | Account                                      |
| SysvarRent111111111111111111111111111111111                                             | Rent Sysvar                    | Account                                      |
| SysvarRewards111111111111111111111111111111                                             | Rewards Sysvar                 | Account                                      |
| SysvarS1otHashes111111111111111111111111111                                             | Slot Hashes Sysvar             | Account                                      |
| SysvarStakeHistory1111111111111111111111111                                             | Stake History Sysvar           | Account                                      |
| MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo | Memo Program                   | Instructions                                 |
| cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK                                             | SPL Account Compression        | Instructions, Events                         |
| BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY                                            | Bubblegum                      | Instructions, Events                         |
| TCMPhJdwDryooaGtiocG1u3xcYbRpiJzb283XfCZsDp                                             | Tensor Compression             | Instructions, Events                         |

And many more programs that have their IDLs uploaded on chain. Feel free to contact anyone in the team or open a pull request to have your IDLs added to the list!

## Credits

Explorer Kit is hugely inspired and built upon [Kinobi](https://github.com/metaplex-foundation/kinobi). Without Kinobi, Explorer Kit would not have been possible at it's current iteration.

Also, huge thanks to the following projects and engineers for making this possible:

- [Loris](https://github.com/lorisleiva) - For all the work and help he has poured into Kinobi and Umi
- [Umi](https://github.com/metaplex-foundation/umi) - Usage of their deserializers to decode the various data types
- [Kinobi](https://github.com/metaplex-foundation/kinobi) - Kinobi parsing of IDLs to a Kinobi Tree has been a great inspiration in creating a layout to be stored in memory for deserialization
- [Anchor](https://github.com/coral-xyz/anchor/tree/master)

## Contributing

We welcome all contributions to Explorer Kit! Feel free to open a pull request or issues to discuss your ideas and suggestions. You may checkout our [contributing guide](/CONTRIBUTING.md) for more information on how to contribute to Explorer Kit.

## License

Explorer Kit is licensed under the [GNU v3](/LICENSE)
