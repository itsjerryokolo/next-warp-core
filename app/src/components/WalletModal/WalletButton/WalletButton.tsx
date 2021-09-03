import React from "react";
import styled from '@emotion/styled';
import { useTheme } from "../../../store/themeContext/themeContext";

export interface Props {
  name: string;
  connectFunction: () => void;
  selected: boolean;
  activating: boolean;
  active: boolean;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

function WalletButton(props: Props) {
  const { theme } = useTheme();
  const { Icon } = props;

  const handleClick = () => {
    props.connectFunction && props.connectFunction();
  };

  const label = props.activating ? "connecting..." : props.active ? "connected" : `connect ${props.name}`

  const Button = styled.button`
    background-color: white;
    width: 100%;
    height: 5rem;
    border-radius: 1rem;
    margin: 1rem 0;
    font: ${theme.typography.h1};
    text-transform: uppercase;
    color: black;
  `

  return (
    <Button {...props} onClick={handleClick} >
      <p>{label}</p>
      <Icon />
    </Button>
  );
}

export default WalletButton;
