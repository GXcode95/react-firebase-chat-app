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
    messages: {
      main: "#f576a0",
      penpal: "#8320c9"
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
    messages: {
      main: "#149c44",
      penpal: "#4790c4"
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
    messages: {
      main: "#b03030",
      penpal: "#8db828"
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

export const glass = createTheme({
  glass: true,
  palette: {
    mode: 'dark',
    primary:{
      main: "#fff",
    },
    secondary: {
      main: "rgba(255, 0, 0, 0.32)",
    },
    messages: {
      main: "rgba(103, 185, 223, 0.42)",
      penpal: "rgba(223, 255, 69, 0.32)"
    },
    success: {
      main: '#00ff59',
    },
    error: {
      main: "#eb3434"
    },
    background: {
      paper: '#242424',
      default: "#121212",
      gradient: "linear-gradient(to right top, #6b9cd1, #799cdd, #8e9ae6, #a796eb, #c290eb, #dc8bdd, #f087cc, #ff85ba, #ff8f9c, #ffa47d, #ffc165, #fbe05f)",
    }
  },
  components: themeComponent
});