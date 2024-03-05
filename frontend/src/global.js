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
    background-image:url('http://localhost:5000/backend/uploads/background.jpg');
    background-size: cover; /* Cover ensures the image covers the entire background without cropping */
    background-position: center; /* Center the background image */
    background-attachment: fixed; /* Keeps the background image fixed while the content scrolls */
    
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
