import React, { createContext, useState, useContext } from 'react'
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { dark, light } from 'styles/palette'

export const ThemeContext = createContext()

export const ProvideTheme = (props) => {
  const { theme, toggleTheme } = useProvideTheme()

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <ThemeProvider theme={theme ? dark : light}>
        <CssBaseline />

        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext)
}

const useProvideTheme = () => {
  const [theme,setTheme] = useState(true)
  
  const toggleTheme = () => {
    setTheme(!theme)
  }

  return {
    theme, 
    toggleTheme
  }
}