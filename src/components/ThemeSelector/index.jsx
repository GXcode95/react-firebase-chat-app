import React, { useContext } from 'react'
import { ThemeContext } from 'context/theme'
import { Button, Stack } from '@mui/material'

const ThemeSelector = () => {
const { selectTheme } = useContext(ThemeContext)
  
  
  return (
    <Stack direction="row" spacing={1}>
      <Button variant="contained" onClick={e => selectTheme(0)}>pink</Button>
      <Button variant="contained" onClick={e => selectTheme(1)}>green</Button>
      <Button variant="contained" onClick={e => selectTheme(2)}>red</Button>
      <Button variant="contained" onClick={e => selectTheme(3)}>glassmorph</Button>
      <Button variant="contained" onClick={e => selectTheme(4)}>glassmorph2</Button>
      <Button variant="contained" onClick={e => selectTheme(5)}>glass lakers</Button>
    </Stack>
  )
}

export default ThemeSelector