import {createTheme} from '@mui/material'


const themeComponent = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
      },
    },
  }, 
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
      penpal: "#168c3e"
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
      main: '#242424',
      alt: "#f576a0"
    }
  },
  components: themeComponent
});