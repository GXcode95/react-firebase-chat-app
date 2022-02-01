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
      main: "#f576a0",
      alt: "rgba(245, 118, 160, 0.7)"
    },
    secondary: {
      main: "#8320c9"
    },
    messages: {
      main: "rgba(245, 118, 160, 0.7)",
      penpal: "rgba(131, 32, 201, 0.7)"
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
      main: "#149c44",
      alt: "rgba(20, 156, 68, 0.7)"
    },
    secondary: {
      main: "#4790c4"
    },
    messages: {
      main: "rgba(20, 156, 68, 0.7)",
      penpal: "rgba(71, 144, 196, 0.7)"
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
      main: "#b03030",
      alt: "rgba(176, 48, 48, 0.7)"
    },
    secondary: {
      main: "#8db828"
    },
    messages: {
      main: "rgba(176, 48, 48, 0.7)",
      penpal: "rgba(141, 184, 40, 0.7)"
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
      alt: '#fff'
    },
    secondary: {
      main: "rgba(255, 0, 0, 0.32)",
    },
    messages: {
      main: "rgba(255, 255, 255, 0.12)",
      penpal: "rgba(235, 59, 126, 0.12)",
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
      gradient: "linear-gradient(to right top, #da8e54, #e7755f, #e95c78, #db4e9a, #b551be)",
    }
  },
  components: themeComponent
});

export const glass2 = createTheme({
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
      main: "rgba(75, 115, 237, 0.22)",
      penpal: "rgba(75, 237, 109, 0.42)",
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
      gradient: "radial-gradient(circle, #15bc98, #00aebb, #009be4, #0080fb, #1254eb)",
    }
  },
  components: themeComponent
});

export const glass3 = createTheme({
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
      main: "rgba(70, 7, 125, 0.72)",
      penpal: "rgba(201, 200, 8, 0.62)",
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
      gradient: "linear-gradient(to bottom right,rgb(173, 59, 235),rgb(79, 10, 116) 50%,rgb(226, 124, 7) 51%,rgb(251, 255, 17))",
    }
  },
  components: themeComponent
});


//! violet
// penpal: "rgba(222, 99, 235, 0.72)"

