# Warp Core Hardhat Environment

Warp Core's blockchain environment is based on [Hardhat](https://hardhat.org) (converted to Typescript).

## Getting started

The blockchain environment makes use of `dotenv` to protect API keys and private keys from being uploaded to the server. Copy `.example.env` and rename it `.env`, filling in data in the relevant fields.

## Deploy script

There is a customized deploy script which leverages `hardhat-etherscan` in order to provide auto-verification on deploy. There is a separate README in the [`scripts/`](./scripts/README.md) with detailed usage instructions.

## Mainnet forking

The environment provides optionality for testing in an environment forked off an existing network. This allows interacting with existing infrastructure in a "free" environment. As with traditional dev chains, you are provided with accounts prefunded with ETH. In addition you are able to transfer from other accounts, so if you need a particular token (such as DAI), you have the ability to transfer them to your account. (You have the ability to emulate any account and send txs from it.) For more details, see [Hardhat's mainnet forking docs](https://hardhat.org/hardhat-network/guides/mainnet-forking.html).

Prerequisites:
* An API key for a provider that supports mainnet forking. We have configured Warp Core to work with [Alchemy](https://alchemy.com), though any provider can be wired up.

The following instructions are for forking Ethereum's mainnet, which is how the environment has been configured. With some customization, you can also fork other chains. This will be detailed in a later section.

## Instructions

1. Copy the `.example.env` file and rename it `.env` if you have not done so already
2. Place your Alchemy `.env` file under `MAINNET_ALCHEMY_KEY`
3. Open a terminal inside the repo, and run `yarn fork` - the terminal should populate with 20 accounts (address, private key) prefunded with 10000 ETH

If you would like to test using MetaMask or similar, make sure that they are pointed at port 8545 locally (`chainId` should be 31337). The accounts can be added via private key if desired.

At this point you should have a functional mainnet fork on port 8545, and can test the frontend on it.

## Helper Scripts

There are convenience scripts that have been written to assist with commonly needed tasks once operating inside a forked environment:

**Funding DAI:** In order to fund the accounts with Dai, run `yarn fund:dai`, which will give each prefunded account 1 million Dai. (This is done by syphoning Dai locked in the cDai (Compound's Dai token) contract.)

**Refilling ETH:** If you run out of ETH on the accounts, they can be refilled with 10,000 ETH each by running `yarn fund:eth`. (This is done by syphoning from `0x0000...dead`).

**Resetting the fork:** You can re-fork mainnet from the latest block (resetting any state changed while previously forked) 

## Forking Additional Chains

While the scripts are currently configured to fork Ethereum's mainnet, they can also be used to fork any other chain, provided access to an archive node, either through an API key or by running one. All that would need to be done is to change the `fork` script in `chain/package.json`. Currently it reads:
```json
"fork": "MAINNET_ALCHEMY_KEY=$(grep MAINNET_ALCHEMY_KEY .env | cut -d '=' -f2) && yarn hardhat node --fork \"https://eth-mainnet.alchemyapi.io/v2/$MAINNET_ALCHEMY_KEY\"",
```
This reads the API key from the `.env` file. As you can see, it is currently using `MAINNET_ALCHEMY_KEY`. Simply switch this for the key of the chain you wish to use, and change Alchemy's URL to reflect that too. (The Alchemy base URLs can be found in `hardhat.config.ts` in the various network key pairs.)