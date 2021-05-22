import React, { useContext, useState } from "react";
import { Linum } from "../Icons";
import styles from "../../styles/Navbar.module.css";
import Link from 'next/link'
import { useWallets } from "../../store/walletContext/WalletContext";



function Navbar() {
  const {
    setShowWalletModal,
    showWalletModal
  } = useWallets();


  // const shortAddress = `${address.slice(0, 6)}...${address.slice(
  //   address.length - 5
  // )}`;

  return (
    <div className={styles.Navbar} >
      <Link href="/">
        <a className="inner_link"><Linum className={styles.logo} /></a>
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

export default Navbar;


