import Head from 'next/head'
import { useContext } from 'react'
import Navbar from '../components/Navbar/Navbar'
import WalletModal from '../components/WalletModal/WalletModal'
import { WalletContext } from '../containers/WalletWrapper'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { showWalletModal } = useContext(WalletContext);
  return (
    <div className={styles.container}>
      <Head>
        <title>Next-Warp-Core</title>
        <meta name="description" content="Linum Labs - Multi page react app boiler plate" />
        <link rel="icon" href="/linum_labs.svg" color="#F1F4F8" />
      </Head>
      <Navbar />
      {showWalletModal && <WalletModal />}
    </div>
  )
}
