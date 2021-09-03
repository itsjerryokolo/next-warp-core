import { typography, Typography } from "./typography";

export interface Theme {
  name: string;
  textColor: string;
  background1: string;
  background2: string;
  typography: Typography;
}

export const themes = {
  dark: {
    name: "dark",
    textColor: "white",
    background1: "black",
    background2: "grey",
    typography,
  },
  light: {
    name: "light",
    textColor: "black",
    background1: "white",
    background2: "grey",
    typography,
  },
};
