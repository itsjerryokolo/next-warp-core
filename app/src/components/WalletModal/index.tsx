import React from "react";
import styled from '@emotion/styled';
import { useWallets } from "../../store/walletContext/WalletContext";
import dynamic from 'next/dynamic'
const WalletButton = dynamic(() => import('./WalletButton/WalletButton'));
const Overlay = dynamic(() => import('../Overlay'));

function WalletModal() {
  const { wallets, setShowWalletModal } = useWallets();

  const handleClickAway = () => {
    setShowWalletModal(false);
  };

  const ModalContainer = styled.div`
    background-color: transparent;
    border: 1px solid grey;
    width: 40rem;
    height: 40rem;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    position: absolute;
    top: calc(50% - 20rem);
    left: calc(50% - 20rem);
    z-index: 5;
  `

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
    <Overlay handleClickAway={handleClickAway}>
      <ModalContainer>
        {buttons}
      </ModalContainer>
    </Overlay>
  );
}

export default WalletModal;
