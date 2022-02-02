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
  },
}
const glassBase = {
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
      success: {
        main: '#00ff59',
      },
      error: {
        main: "#eb3434"
      },
    },
    components: themeComponent
}

//* ******************* *//
//* ***** THEMES ****** *//
//* ******************* *//

const light = createTheme({
  palette: {
    mode: 'light',
  
  },
  components: themeComponent
});

// ------ DARK -------
const darkGreen = "0, 255, 0"
const darkRed = "176, 48, 48"
const darkPink = "245, 118, 160"
const darkBlue = "28, 74, 166"

// const pinky = createTheme({
//   palette: {
//     ...darkBasePalette,
//     primary: {
//       main: `rgb(${darkPink})`,
//       alt: `rgba(${darkPink}, 0.7)`
//     },
//     secondary: {
//       main: "#8320c9"
//     },
//     messages: {
//       main: `rgba(${darkPink}, 0.7)`,
//       penpal: "rgba(131, 32, 201, 0.7)"
//     },
//     info: {
//       main: '#aa39cc',
//     },
//   },
//   bgAnimation: "Stars",
//   components: themeComponent
// });

const spaceship = createTheme({
  palette: {
    ...darkBasePalette,
    primary: {
      main: `rgb(${darkBlue})`,
      alt: `rgba(${darkBlue}, 0.7)`
    },
    secondary: {
      main: "#8320c9"
    },
    messages: {
      main: `rgba(${darkBlue}, 0.7)`,
      penpal: "rgba(49, 214, 85, 0.7)"
    },
    info: {
      main: '#aa39cc',
    },
  },
  bgAnimation: "Stars",
  components: themeComponent
});
const matrix = createTheme({
  glass:true,
  palette: {
    ...darkBasePalette,
    primary: {
      main: `rgb(${darkGreen})`,
      alt: `rgba(${darkGreen}, 0.7)`
    },
    secondary: {
      main: "#4790c4"
    },
    messages: {
      main: `rgba(${darkGreen}, 0.5)`,
      penpal: "rgba(150,150,150, 0.3)"
    },
    success: {
      main: '#2c81a3',
    },
    info: {
      main: '#45bbbf',
    },
  },
  bgAnimation: 'Matrix',
  components: themeComponent
});

const blood = createTheme({
  palette: {
    ...darkBasePalette,
    primary: {
      main: `rgb(${darkRed})`,
      alt: `rgba(${darkRed}, 0.7)`
    },
    secondary: {
      main: "#8db828"
    },
    messages: {
      main: `rgba(${darkRed}, 0.7)`,
      penpal: "rgba(141, 184, 40, 0.7)"
    },
    error: {
      main: "#e39c22"
    },
    info: {
      main: '#533669',
    },
  },
  bgAnimation: "Hearth",
  components: themeComponent
});

// ------ GLASS -------
const sunrise = createTheme({
  ...glassBase,
  palette: {
    ...glassBase.palette,
    messages: {
      main: "rgba(255, 255, 255, 0.12)",
      penpal: "rgba(235, 59, 126, 0.12)",
    },
    success: {
      main: '#00ff59',
    },
    error: {
      main: "#eb3434",
    },
    background: {
      paper: '#242424',
      default: "#121212",
      gradient: "linear-gradient(to right top, #da8e54, #e7755f, #e95c78, #db4e9a, #b551be)",
    }
  },
  bgAnimation: 'Bokeh'
});

const ocean = createTheme({
  ...glassBase,
  palette: {
    ...glassBase.palette,
    messages: {
      main: "rgba(75, 115, 237, 0.22)",
      penpal: "rgba(75, 237, 109, 0.42)",
    },
    background: {
      paper: '#242424',
      default: "#121212",
      gradient: "radial-gradient(circle, #15bc98, #00aebb, #009be4, #0080fb, #1254eb)",
    }
  },
  bgAnimation: "Bubbles",
  xavier: "bubbules"
});

const lakers = createTheme({
  ...glassBase,
  palette: {
    ...glassBase.palette,
    messages: {
      main: "rgba(70, 7, 125, 0.72)",
      penpal: "rgba(201, 200, 8, 0.62)",
    },
    background: {
      paper: '#242424',
      default: "#121212",
      gradient: "linear-gradient(to bottom right,rgb(173, 59, 235),rgb(79, 10, 116) 50%,rgb(226, 124, 7) 51%,rgb(251, 255, 17))",
    }
  },
});

const rainbowtrix = createTheme({
  ...matrix,
  bgAnimation: 'Rainbowtrix',
  gradientMode: "true"
});

//* ***** EXPORT ****** *//
export const themes = {
  // light: {
  //   theme: light,
  //   name: "light",
  // },
  sunrise: {
    theme: sunrise,
    name: "sunrise",
  },
  ocean: {
    theme: ocean,
    name: "ocean",
  },
  lakers: {
    theme: lakers,
    name: "lakers",
  },
  spaceship: {
    theme: spaceship,
    name: "spaceship",
  },
  blood: {
    theme: blood,
    name: "blood",
  },
  matrix: {
    theme: matrix,
    name: "matrix",
  },
  rainbowtrix: {
    theme: rainbowtrix,
    name: "rainbowtrix",
  },
}
