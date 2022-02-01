import React, { createContext, useState } from 'react'
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { themes } from 'styles/palette'

export const ThemeContext = createContext()

const ThemeContextProvider = (props) => {
  const [theme,setTheme] = useState(themes.ocean.theme) // default theme

  const selectTheme = (themeName) => {
    setTheme(themes[themeName].theme)
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