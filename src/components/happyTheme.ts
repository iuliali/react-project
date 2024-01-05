import { extendTheme } from '@chakra-ui/react'

const happyTheme = extendTheme({
  layerStyles: {
    cool:{
      bgGradient :'linear(to-r, green.200, pink.500)'},
    navLink: {
      bgGradient :'linear(to-r, blue.100, green.200)',
      fontWeight: 'bold',
      borderRadius: 'md',
      _hover: {
        bg: 'new.500',
      },
    },
  },
  colors: {
    new: {
      50: '#ffe4e6',
      100: '#ffb3b8',
      200: '#fc8388',
      300: '#f95358',
      400: '#f62329',
      500: '#dc0d0e',
      600: '#a4090a',
      700: '#740605',
      800: '#460201',
      900: '#1f0000',
    },
  },
})

export default happyTheme
