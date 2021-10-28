import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import { HardhatUserConfig } from 'hardhat/types';
import * as dotenv from "dotenv";

dotenv.config();


/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  solidity: {
    compilers: [{ version: "0.8.9", settings: {} }],
  },
  networks: {
    localhost: {
      url: "http://localhost:8545",
      /*
        notice no env vars here? it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)
      */
    },
    // networks without env vars set need to be commented out or they'll crash the script 
    // so only uncomment if the .env has been set
    // rinkeby: {
    //   url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.RINKEBY_ALCHEMY_KEY}`,
    //   accounts: [`${process.env.RINKEBY_DEPLOYER_PRIV_KEY}`],
    // },
    // mainnet: {
    //   url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.MAINNET_ALCHEMY_KEY}`,
    //   accounts: [`${process.env.MAINNET_DEPLOYER_PRIV_KEY}`],
    // },
    // kovan: {
    //   url: `https://eth-kovan.alchemyapi.io/v2/${process.env.KOVAN_ALCHEMY_KEY}`,
    //   accounts: [`${process.env.KOVAN_DEPLOYER_PRIV_KEY}`],
    // },
    // ropsten: {
    //   url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ROPSTEN_ALCHEMY_KEY}`,
    //   accounts: [`${process.env.ROPSTEN_DEPLOYER_PRIV_KEY}`],
    // },
    // goerli: {
    //   url: `https://eth-goerli.alchemyapi.io/v2/${process.env.GOERLI_ALCHEMY_KEY}`,
    //   accounts: [`${process.env.GOERLI_DEPLOYER_PRIV_KEY}`],
    // },
    // xdai: {
    //   url: 'https://dai.poa.network',
    //   gasPrice: 1000000000,
    //   accounts: [`${process.env.XDAI_DEPLOYER_PRIV_KEY}`],
    // },
    // mumbai: {
    //   url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_ALCHEMY_API}`,
    //   accounts: [`${process.env.MUMBAI_DEPLOYER_PRIV_KEY}`],
    //   chainId: 80001,
    // },
    // optimism: {
    //   url: `https://opt-mainnet.g.alchemy.com/v2/${process.env.OPTIMISM_ALCHEMY_API}`,
    //   accounts: [`${process.env.OPTIMISM_DEPLOYER_PRIV_KEY}`],
    //   chainId: 10,
    // },
    // optimism-kovan: {
    //   url: `https://opt-kovan.g.alchemy.com/v2/${process.env.OPTIMISM_TEST_ALCHEMY_API}`,
    //   accounts: [`${process.env.OPTIMISM_TEST_DEPLOYER_PRIV_KEY}`],
    //   chainId: 69,
    // },
    // arbitrum: {
    //   url: `https://arb-mainnet.g.alchemy.com/v2/${process.env.ARBITRUM_ALCHEMY_API}`,
    //   accounts: [`${process.env.ARBITRUM_DEPLOYER_PRIV_KEY}`],
    //   chainId: 42161,
    // },
    // arbitrum-rinkeby: {
    //   url: `https://arb-rinkeby.g.alchemy.com/v2/${process.env.ARBITRUM_TEST_ALCHEMY_API}`,
    //   accounts: [`${process.env.ARBITRUM_TEST_DEPLOYER_PRIV_KEY}`],
    //   chainId: 421611,
    // },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  // mocha options can be set here
  mocha: {
    // timeout: "300s",
  },
};
export default config;