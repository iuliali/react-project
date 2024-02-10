import { extendTheme } from '@chakra-ui/react'

const sadTheme = extendTheme({
    fonts: {
      heading: "Dancing Script",
      myFont2: "Roboto",
    },
    layerStyles: {
      cool:{
        bgGradient :'linear(to-r, blue.200, green.900)'},
        navLink: {
            bgGradient :'linear(to-r, blue.100, purple.200)',
            fontWeight: 'bold',
            borderRadius: 'md',
            _focus: {
              boxShadow: 'outline',
            },
          },
      },
    colors: {
      new: {
        50: '#806d67',
        100: '#54635e',
        200: '#3d4a61',
        300: '#4d3d61',
        400: '#613d60',
        500: '#5c2c3f',
        600: '#221c36',
        700: '#2d3b32',
        800: '#d1b547',
        900: '#b0a9d6',
      },
    },
    })
export default sadTheme