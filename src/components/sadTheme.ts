import { extendTheme } from '@chakra-ui/react'

const sadTheme = extendTheme({
    layerStyles: {
      cool:{
        bgGradient :'linear(to-r, blue.200, green.900)'},
        navLink: {
            bgGradient :'linear(to-r, blue.200, green.900)',
            fontWeight: 'bold',
            borderRadius: 'md',
            _focus: {
              boxShadow: 'outline',
            },
          },
      },
    colors: {
      new: {
        50: '#e4e6ff',
        100: '#b3b8ff',
        200: '#8388fc',
        300: '#5358f9',
        400: '#2329f6',
        500: '#0d0edc',
        600: '#090aa4',
        700: '#060574',
        800: '#020146',
        900: '#00001f',
      },
    },
    })
export default sadTheme