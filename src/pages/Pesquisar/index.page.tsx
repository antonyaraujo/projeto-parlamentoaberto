import React from 'react';
import { Box, Select, Input, Flex, Button } from '@chakra-ui/react';

export default function Pesquisar() {
  return (
    <Box maxWidth="1440px" padding="64px 64px">
      <Flex flexDir="row">
        <Select placeholder="Select option" width="15%">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Input placeholder="Basic usage" width="70%" />
        <Button>Pesquisar</Button>
      </Flex>
      <Box>
        
      </Box>
    </Box>
  );
}
