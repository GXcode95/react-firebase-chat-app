import {createTheme} from '@mui/material'


const themeComponent = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
      },
    },
  }, 
  // MuiCssBaseline: {
  //   styleOverrrides: {

  //     '@global': {
  //       root: {
  //         background: 'red',
  //         // background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
  //         backgroundRepeat: "no-repeat",
  //         backgroundAttachment: "fixed",
  //       }
  //     }
  //   }
  // }
}
const darkBasePalette = {
  mode: 'dark',
  success: {
    main: '#00ff59',
  },
  error: {
    main: "#eb3434"
  },
  background: {
    paper: '#242424',
    default: "#121212",
    gradient: "radial-gradient(circle, #232222, #1c1b1b, #151515, #0c0c0c, #000000)"
  }
}
export const light = createTheme({
  palette: {
    mode: 'light',
  
  },
  components: themeComponent
});

export const dark = createTheme({
  palette: {
    ...darkBasePalette,
    primary: {
      main: "#f576a0"
    },
    secondary: {
      main: "#8320c9"
    },
    info: {
      main: '#aa39cc',
    },
  },
  components: themeComponent
});


export const darkGreen = createTheme({
  palette: {
    ...darkBasePalette,
    primary: {
      main: "#149c44"
    },
    secondary: {
      main: "#4790c4"
    },
    success: {
      main: '#2c81a3',
    },
    info: {
      main: '#45bbbf',
    },
  },
  components: themeComponent
});

export const darkRed = createTheme({
  palette: {
    ...darkBasePalette,
    primary: {
      main: "#b03030"
    },
    secondary: {
      main: "#8db828"
    },
    error: {
      main: "#e39c22"
    },
    info: {
      main: '#533669',
    },
  },
  components: themeComponent
});