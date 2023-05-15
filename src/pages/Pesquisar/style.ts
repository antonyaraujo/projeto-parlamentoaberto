import { chakra, Flex, Button, Box } from '@chakra-ui/react';

export const InsideContainer = chakra(Flex, {
  baseStyle: {
    maxWidth: '1440px',
    width: '100%',
    margin: 'auto',
    align: 'center',
  },
});

export const MenuOption = chakra(Button, {
  baseStyle: {
    color: 'white',
    fontSize: '16px',
    bg: 'black',
  },
});

export const SearchPanel = chakra(Flex, {
  baseStyle: {
    border: '1px solid #E6E6E6',
    borderRadius: '24px',
    height: '10%',
    width: '100%',
  },
});

export const ButtonSearch = chakra(Button, {
  baseStyle: {
    backgroundColor: 'black',
    color: 'white',
    border: '2px solid black',
  },
});

export const Content = chakra(Flex, {
  baseStyle: {
    flexDir: 'row',
    minH: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
