import {createGlobalStyle, CustomTheme} from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  a {
    text-decoration: none;
  }
`

export const theme: CustomTheme = {
    default: {border: "", height: "", width: ""},
    mobile: {border: "1px solid black", height: "736px", width: "414px"}
}

export default GlobalStyles;