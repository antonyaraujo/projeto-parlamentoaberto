import { chakra, Flex, Button } from '@chakra-ui/react';

export const InsideContainer = chakra(Flex, {
    baseStyle: {
      maxWidth: '1440px',
      width: '100%',
      margin: 'auto',
      align: 'center',
    }
});

export const MenuOption = chakra(Button, {
    baseStyle: {
      color: 'white',
      fontSize: '16px',
      bg: 'black',      
    }
});