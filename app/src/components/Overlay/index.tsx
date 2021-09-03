import React from "react";
import styled from "@emotion/styled";
import ClickAwayListener from "react-click-away-listener";
import { useTheme } from "../../store/themeContext/themeContext";

export interface Props {
	handleClickAway: () => void;
	children: React.ReactElement<any>;
}

function Overlay(props: Props) {
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
	`

	return (
		<OverlayContainer {...props} >
			<ClickAwayListener onClickAway={props.handleClickAway}>
				{props.children}
			</ClickAwayListener>
		</OverlayContainer>
	);
}

export default React.memo(Overlay);
