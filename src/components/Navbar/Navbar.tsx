import React, { useContext, useState } from "react";
import { Linum } from "../Icons";
import styles from "../../styles/Navbar.module.css";
import Link from 'next/link'
import { WalletContext } from "../../containers/WalletWrapper";

export interface Props {
}

function Navbar(props: Props) {
  const {
    setShowWalletModal,
    showWalletModal
  } = useContext(WalletContext);


  // const shortAddress = `${address.slice(0, 6)}...${address.slice(
  //   address.length - 5
  // )}`;


  return (
    <div className={styles.Navbar} >
      <Link href="/">
        <Linum className={styles.logo} />
      </Link>
      <button
        className={styles.walletConnectButton}
        onClick={() => setShowWalletModal(!showWalletModal)}
      >
        Open Wallet Modal
        </button>
    </div>
  );
}

export default React.memo(Navbar);


