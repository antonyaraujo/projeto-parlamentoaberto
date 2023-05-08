import React from 'react';
import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
import Pesquisar from './pages/Pesquisar/index.page';

function App() {
  return (
    <ChakraProvider>
      <Pesquisar />
    </ChakraProvider>
  );
}

export default App;
