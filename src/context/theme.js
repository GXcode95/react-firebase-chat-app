import React, { createContext, useState, useLayoutEffect} from 'react'
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { themes } from 'styles/theme'

export const ThemeContext = createContext()

const ThemeContextProvider = (props) => {
  const [theme,setTheme] = useState(themes.ocean.theme) // default theme here

  const selectTheme = (themeName) => {
    setTheme(themes[themeName].theme)
    localStorage.setItem('userTheme', themeName)
  }

  useLayoutEffect(()=> {
    const userTheme = localStorage.getItem('userTheme')
    if (userTheme) selectTheme(userTheme)
  }, [])

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