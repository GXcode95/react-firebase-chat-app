import React, { createContext, useState } from 'react'
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {dark, darkGreen, darkRed, glass3, glass, glass2} from 'styles/palette'
const themes = [dark,darkGreen,darkRed,glass, glass2, glass3]
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