import React, { useContext } from "react";
import WalletButton from "./WalletButton/WalletButton";
import ClickAwayListener from "react-click-away-listener";
import { WalletContext } from "../../containers/WalletWrapper";

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
    wallet } = useContext(WalletContext);

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

export default React.memo(WalletModal);
