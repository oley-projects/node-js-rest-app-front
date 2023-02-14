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
    display: inline-block;
    text-decoration: none;
    text-transform: capitalize;
    color: #fff;
    border-radius: 0.5rem;
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
  button {
    padding: 1rem 1.5rem;
  }

  input, textarea {
    padding: 0.75rem 1rem;
    width: 100%;
    outline: none;
    border: 0.1rem solid rgb(239, 239, 239);
    font-size: 1.3rem;
    line-height: 1rem;
    color: #888;
    &:focus, &:active {
      border-color: rgba(0, 0, 0, 0.2);
    }
    &.invalid {
      border-color: rgba(200, 25, 25, 0.5);
    }
    &::placeholder {
      font-size: 1rem;
      color: #bbb;
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

  a, button {
    &:disabled,
    &[disabled] {
      color: #bbb;
      cursor: not-allowed;
      transition: all 0.2s;
      &:hover, &:active {
        color: #ccc;
        background: rgb(239, 239, 239);
        border-color: rgb(239, 239, 239);
      }
    }
  }

  .container {
    margin-top: 5rem;
    padding: 3rem 2rem;
    min-height: calc(100vh - 10rem);
    background-color: #fafaf1;
    @media (min-width: 960px) {
      padding: 3rem 5rem;
    }
  }

  .margin-left {
    @media (min-width: 460px) {
      margin-left: 0.5rem;
    }
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