import { AppContext } from 'next/app';
import Head from 'next/head'
import WalletModal from '../components/WalletModal/WalletModal'
import { useWallets } from '../store/walletContext/WalletContext';
import styles from '../styles/Home.module.css'

export default function Home() {
  const { showWalletModal } = useWallets();
  return (
    <div className={styles.container}>
      <Head >
        <title key="title">Next-Warp-Core</title>
        <meta key="description" name="description" content="Linum Labs - Multi page react app boiler plate" />
        <link key="favicon" rel="icon" href="/linum_labs.svg" color="#F1F4F8" />
      </Head>
      {showWalletModal && <WalletModal />}
    </div>
  )
}

export async function getServerSideProps(appContext: AppContext) {
  return {
    props: {},
  }
}
