import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StoreProvider } from ".././store/store";
import { ThemeProvider } from ".././store/themeContext/themeContext";
import { Web3ReactProvider } from "@web3-react/core";
import { ContractProvider } from ".././store/contractContext/contractContext";
import { Web3Provider } from "@ethersproject/providers";
import WalletProvider from '.././containers/WalletWrapper';



function MyApp({ Component, pageProps }: AppProps) {

  function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }

  return (
    <ThemeProvider>
      <StoreProvider>
        <ContractProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <WalletProvider>
              <Component {...pageProps} />
            </WalletProvider>
          </Web3ReactProvider>
        </ContractProvider>
      </StoreProvider>
    </ThemeProvider>

  )
}
export default MyApp;
