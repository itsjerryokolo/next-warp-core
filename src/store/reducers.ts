import { Contracts } from "./helpers/contractBooter"
import types from "./actionTypes";
import { Contract } from "@ethersproject/contracts";

const initialContracts = {
  tokenContract: {} as Contract,
};
export interface State {
  provider: any;
  isWalletConnected: boolean;
  contracts: Contracts;
  userAddress: string;
  error: string;
}

const initialState: State = {
  provider: {},
  isWalletConnected: false,
  contracts: initialContracts,
  userAddress: "",
  error: "",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.SetWalletDisconnected.SET_WALLET_DISCONNECTED_SUCCESS:
      return {
        ...state,
        isWalletConnected: false,
        userAddress: "",
        provider: {},
      };
    case types.SetWalletConnected.SET_WALLET_CONNECTED_SUCCESS:
      return { ...state, isWalletConnected: true };
    case types.SetProvider.SET_PROVIDER_SUCCESS:
      return { ...state, provider: action.payload };
    case types.SetContracts.SET_CONTRACTS_SUCCESS:
      return {
        ...state,
        contracts: action.payload,
      };
    case types.SetWalletAddress.SET_WALLET_ADDRESS_SUCCESS:
      return { ...state, userAddress: action.payload };
    default:
      return state;
  }
};

export { initialState, reducer };
