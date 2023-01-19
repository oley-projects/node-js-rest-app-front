import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
  }

  .button {
    font: inherit;
    border: 1px solid #3b0062;
    color: #3b0062;
    background: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none;
  }
`;

export default GlobalStyle;