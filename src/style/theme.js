import { createTheme } from "@mui/material";
import breakpoints from "../utils/contants/breakpoints";

const { mobile, tablet, laptop, desktop } = breakpoints;
const theme = createTheme({
  primary: {
    white: "white"
  },
  typography: {
    fontFamily: "Inter",
    button: {
      fontFamily: "Inter"
    }
  },
  breakpoints: {
    values: {
      mobile: mobile,
      tablet: tablet,
      laptop: laptop,
      desktop: desktop
    }
  }
});

// background: #ECEBE7;
//#404040
//FFD662
// 050505

//brandPage
// background : #F0F0F0
// #0F56B3

export default theme;
