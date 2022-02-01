import React, { createContext, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {dark, darkGreen, darkRed, light, glass} from 'styles/palette'
const themes = [dark,darkGreen,darkRed,glass]
export const ThemeContext = createContext()

const ThemeContextProvider = (props) => {
  const [theme,setTheme] = useState(glass)

  const selectTheme = (themeNum) => {
    setTheme(themes[themeNum])
  }

  return (
    <ThemeContext.Provider value={{theme, selectTheme}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider