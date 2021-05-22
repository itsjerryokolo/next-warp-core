import { InjectedConnector } from "@web3-react/injected-connector";
import { PortisConnector } from "@web3-react/portis-connector";

export const supportedChains = {
  0: "Not connected",
  //1: "mainnet",
  4: "rinkeby",
  5: "goerli",
  1337: "development",
  31337: "hardhat",
};

export const chainIDToNetwork = {
  "0": "Not connected",
  "1": "Ethereum Mainnet",
  "4": "Rinkeby Testnet",
  "5": "Goerli Testnet",
  "77": "Sokol Testnet",
  "100": "xDai"
}

export const chainIDToEndpoint = {
  "0": "",
  "1": process.env.REACT_APP_INFURA_ENDPOINT, // ethereum Mainnet
  "4": process.env.REACT_APP_INFURA_ENDPOINT, // ethereum Rinkeby
  "5": process.env.REACT_APP_INFURA_ENDPOINT, // ethereum Goerli
  "77": "https://sokol.poa.network",
  "100": "https://rpc.xdaichain.com/"
}

// this will handle injected wallets such as MetaMask
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainnet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
    31337, // devChain
  ],
});

// const initOptions = {
//   enableLogging: process.env.NODE_ENV === 'production' ? false : true,
//   network: {
//     host: chainIDToEndpoint[process.env.REACT_APP_CHAIN_ID as string],
//     chainId: parseInt(process.env.REACT_APP_CHAIN_ID as string),
//     networkName: chainIDToNetwork[process.env.REACT_APP_CHAIN_ID as string]
//   }
// }

// const constructorOptions = {
//   buttonPosition: "bottom-right"
// }

// const loginOptions = {

// }

// export const torus = new TorusConnector({ chainId: parseInt(process.env.REACT_APP_CHAIN_ID), initOptions, constructorOptions, loginOptions });


// local chain IDs like 1337 are not supported by default by web3-react's portis connector (kak dom).
// You must pass in the url and chain id for your local chain/node as third config argument in constructor.
const infuraProvider = {
  nodeUrl: process.env.REACT_APP_INFURA_ENDPOINT as string,
  chainId: 5,
};

export const portis = new PortisConnector({
  dAppId: process.env.REACT_APP_PORTIS_DAPP_ID as string,
  networks: [5],
  config: infuraProvider,
});
