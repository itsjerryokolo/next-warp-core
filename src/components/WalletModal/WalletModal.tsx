import React from "react";
import { useWallets } from "../../store/walletContext/WalletContext";
import dynamic from 'next/dynamic'
const WalletButton = dynamic(() => import('./WalletButton/WalletButton'));
const ClickAwayListener = dynamic(() => import('react-click-away-listener'));
export interface Props {

}

function WalletModal(props: Props) {
  const { showWalletModal,
    setShowWalletModal,
    toggleWalletModal,
    disconnectWallet,
    wallets,
    handleConnect,
    activatingConnector,
    chainIdIsCorrect,
    wallet } = useWallets();

  const handleClickAway = () => {
    setShowWalletModal(false);
  };



  const buttons = wallets.map((wallet) => (
    <WalletButton
      key={wallet.name}
      connectFunction={wallet.connectFunction}
      selected={wallet.selected}
      activating={wallet.activating}
      active={wallet.active}
      name={wallet.name}
      Icon={wallet.icon}
    />
  ));

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div >
        {buttons}
        <div >
          <button
            disabled={false}
            onClick={() => handleConnect(wallet)}
          >
            Connect
          </button>
          <button onClick={() => disconnectWallet(wallet)}>
            Disconnect
          </button>
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default WalletModal;
