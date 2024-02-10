import { extendTheme } from '@chakra-ui/react'

const happyTheme = extendTheme({
  fonts: {
    heading: "Dancing Script",
    myFont2: "Roboto",
  },
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
      50: '#e0dbcc',
      100: '#bddbc0',
      200: '#bddbd7',
      300: '#d16c47',
      400: '#a28cc2',
      500: '#6a41a3',
      600: '#a34193',
      700: '#c97b96',
      800: '#b57d22',
      900: '#296e2f',
    },
  },
})

export default happyTheme
