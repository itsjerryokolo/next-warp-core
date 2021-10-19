import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '../../store/themeContext/themeContext';
import useOnClickOutside from '../../hooks/useClickOutside';

export interface Props {
  children: React.ReactNode;
}

function Overlay({ children, ...props }: Props) {
  const { theme } = useTheme();

  const OverlayContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.background1};
    z-index: 6;
  `;

  return <OverlayContainer {...props}>{children}</OverlayContainer>;
}

export default React.memo(Overlay);
