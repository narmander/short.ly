import { createGlobalStyle } from 'styled-components';

// COLOR CONSTANTS
export const TEAL = '#0DDAC7';
export const CREAM = '#fffbe3';
export const ORANGE = '#EF7E1E';
export const OFF_WHITE = '#fafafa';
export const GREY = '#cccccc';

// resetting browser default styles
export const GlobalStyles = createGlobalStyle`

html, body {
    min-width: 540px;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0px;
    overflow-x: hidden;
  }

  h1,h2,h3,h4,h5,h6,p,ul,li {
    margin: 0;
    padding: 0;
  }

  html {
    box-sizing: border-box;
  }

body {
    font-family: 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }

  a {
    color: ${TEAL};
  }

  img {
      width: 100%;
  }

  button {
    cursor: pointer;
    outline: none;
    border:none;
    border-radius: .3em;
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    font-family: 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

    :active {
    transform: translateY(5px);
    }
  }

  input {
    outline: none;
    border: none;
    font-family: sans-serif;
    font-weight: 100;

    ::placeholder { 
      color: ${GREY};

      }
  }

`;
