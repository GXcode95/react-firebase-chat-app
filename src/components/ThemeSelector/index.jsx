import React, { useContext } from 'react'
import { ThemeContext } from 'context/theme'
import { Button, Stack } from '@mui/material'
import { themes } from 'styles/palette'

const ThemeSelector = () => {
  const { selectTheme } = useContext(ThemeContext)

  return (
    <Stack direction="row" spacing={1}>
      {/* can't map on object, so i create an array of theme template.
        entry 0 is the themes key,
        entry 1 is the template object (theme + name) 
      */}
      {Object.entries(themes).map(entry => 
        <Button variant="contained" onClick={e => selectTheme(entry[1].name)}> 
          {entry[1].name}
        </Button>
      )}
    </Stack>
  )
}

export default ThemeSelector
