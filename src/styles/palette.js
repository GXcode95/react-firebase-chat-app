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
export const light = createTheme({
  palette: {
    mode: 'light',
    // primary: {
    //   main: '#283845',
    // },
    // secondary: {
    //   main: '#109eb3',
    //   light: '#26A7B8',
    // },
    // error: {
    //   main: '#ff3a3a',
    // },
    // info: {
    //   main: '#f576a0',
    // },
    // warning: {
    //   main: '#8622c3',
    // },
    // success: {
    //   main: '#43a047',
    // },
    // white: {
    //   main: "#fff"
    // },
    // black: {
    //   main: "#000"
    // },
    // grey: {
    //   main: "#cecece"
    // },
  },
  components: themeComponent
});

export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#45806e"
    },
    secondary: {
      main: "#f576a0"
    },
    message: {
      main: "#f576a0",
      penpal: "#4790c4"
    },
    success: {
      main: '#34eb58',
    },
    error: {
      main: "#eb3434"
    },
    info: {
      main: '#4db3bd',
    },
    background: {
      paper: '#242424',
      default: "#121212",
      alt: "#f576a0",
      gradient: "radial-gradient(circle, #232222, #1c1b1b, #151515, #0c0c0c, #000000)"
      
    }
  },
  components: themeComponent
});


export const darkGreen = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#00ff2f"
    },
    secondary: {
      main: "#149c44"
    },
    message: {
      main: "#149c44",
      penpal: "#8320c9"
    },
    success: {
      main: '#00ff59',
    },
    error: {
      main: "#eb3434"
    },
    info: {
      main: '#5f388c',
    },
    background: {
      paper: '#242424',
      default: "#121212",
      alt: "#149c44",
      gradient: "radial-gradient(circle, #232222, #1c1b1b, #151515, #0c0c0c, #000000)"   
    }
  },
  components: themeComponent
});

export const darkRed = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#45806e"
    },
    secondary: {
      main: "#b03030"
    },
    message: {
      main: "#b03030",
      penpal: "#c4852b"
    },
    success: {
      main: '#00ff59',
    },
    error: {
      main: "#7a7a7a"
    },
    info: {
      main: '#c1d10d',
    },
    background: {
      paper: '#242424',
      default: "#121212",
      alt: "#b03030",
      gradient: "radial-gradient(circle, #232222, #1c1b1b, #151515, #0c0c0c, #000000)"
      
    }
  },
  components: themeComponent
});