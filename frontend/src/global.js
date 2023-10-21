import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}
  body {

   
    font-family: 'Poppins', sans-serif;
    background-image:url('https://c0.wallpaperflare.com/preview/350/716/16/bunch-of-vegetables.jpg');
    
  }
`;

function App() {
  return (
    <div>
      <GlobalStyles />
    </div>
  );
}

export default App;
