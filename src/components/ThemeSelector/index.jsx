import React, { useContext } from 'react'
import { ThemeContext } from 'context/theme'
import { Button, Stack } from '@mui/material'
import { themes } from 'styles/theme'

const ThemeSelector = () => {
  const { selectTheme } = useContext(ThemeContext)

  return (
    <Stack direction="row" spacing={1}>
      {/* can't map on object, so i create an array of theme template.
        entry 0 is the themes key, entry 1 is the template object.
        To add a theme just create it in in the styles/theme.js file.
      */}
      {Object.entries(themes).map(entry => 
        <Button key={entry[0]} variant="contained" onClick={e => selectTheme(entry[1].name)}> 
          {entry[1].name}
        </Button>
      )}
    </Stack>
  )
}

export default ThemeSelector
