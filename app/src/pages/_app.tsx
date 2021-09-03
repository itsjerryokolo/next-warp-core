import '../styles/globals.css'
import { AppProps } from 'next/app'
import { StoreProvider } from ".././store/store";
import { ThemeProvider } from ".././store/themeContext/themeContext";
import { Web3ReactProvider } from "@web3-react/core";
import { ContractProvider } from ".././store/contractContext/contractContext";
import WalletProvider from '../store/walletContext/WalletContext';
import Navbar from '../components/Navbar';
import { getLibrary } from '../wallets/utils';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider>
      <StoreProvider>
        <ContractProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <WalletProvider>
              <Navbar />
              <Component {...pageProps} />
            </WalletProvider>
          </Web3ReactProvider>
        </ContractProvider>
      </StoreProvider>
    </ThemeProvider>

  )
}
export default MyApp;
