import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    color: #777;
    font-size: 1.3rem;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  a, button {
    text-decoration: none;
    color: #fff;
    border-radius: 0.5rem;
    transition: all 0.2s;
    outline: none;
    border: 0;
    font-size: 1.3rem;
    line-height: 1rem;
    cursor: pointer;
    &:hover, &:active {
      color: #fcfcfa;
      background: #aaa2a1;
    }
  }

  input, textarea {
    padding: 0.75rem 1rem;
    width: 100%;
    outline: none;
    border: 0.1rem solid rgb(239, 239, 239);
    // border-top-left-radius: 0.5rem;
    // border-bottom-left-radius: 0.5rem;
    font-size: 1.3rem;
    line-height: 1rem;
    color: #888;
    &:focus, &:active {
      border-color: rgba(0, 0, 0, 0.2);
    }
  }

  textarea {
    resize: vertical;
    min-height: 2.7rem;
    max-height: 12rem;
    height: 7rem;
  }

  hr {
    margin: 2rem 0;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  }

  .container {
    padding: 3rem 2rem;
    min-height: calc(100vh - 10rem);
    background-color: #fafaf1;
    @media (min-width: 960px) {
      padding: 3rem 5rem;
    }
  }

  .margin-left {
    margin-left: 0.5rem;
  }

  .center {
    display: flex;
    justify-content: center;
  }
  
  .right {
    display: flex;
    justify-content: right;
  }

  .overflow-hidden {
    overflow: hidden;
  }
`;

export default GlobalStyle;