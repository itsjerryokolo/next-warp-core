import { AbiItem } from "web3-utils";
import { Contract, ContractInterface } from "ethers";
import Web3 from "web3";
import * as ABIs from "../../interfaces";

export const checksumAddress = (address: string) =>
  Web3.utils.toChecksumAddress(address);

export interface Contracts {
  tokenContract: Contract;
}


// ? To "Boot" up a set of contracts, call this function and pass in a provider/web3 instance

export function getWeb3Contracts(web3: any) {
  // example contract creations
  const tokenContract = new web3.eth.Contract(
    ABIs.TokenABI.abi as AbiItem[],
    checksumAddress(process.env.REACT_APP_TOKEN as string)
  );

  const contracts = {
    tokenContract,
  };
  return contracts;
}

export function getEthersContracts(provider: any) {
  // example contract creations
  const tokenContract = new Contract(
    checksumAddress(process.env.REACT_APP_TOKEN as string),
    ABIs.TokenABI.abi as ContractInterface,
    provider
  );

  const contracts = {
    tokenContract,
  };
  return contracts;
}
