import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    // min-height:100%;
    height: 100%;
    width: 100%;
    // line-height: 1.5;
  }

  body {
    // font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-family: 'IBM Plex Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    // font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-family: 'IBM Plex Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  #app {
    background-color: #FCFCFC;
    min-width: 100%;
    width: 100%;
    display:flex;
    overflow:hidden
    // min-height: 100%;
    // margin-bottom:-40px;
    // padding-bottom:40px;
    // height: 100vh;
  }
  
  p,
  label {
    // font-family: Georgia, Times, 'Times New Roman', serif;
    font-family: 'IBM Plex Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    // line-height: 1.5em;
  }
`;

export default GlobalStyle;
