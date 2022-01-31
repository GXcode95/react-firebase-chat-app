import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { useAuth } from "hooks/useAuth"
import { Box, Button, IconButton, Stack, Typography } from "@mui/material"
import { ThemeContext } from 'context/theme';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import './style.scss'

const Navbar = () => {
  const auth  = useAuth()
  const { selectTheme } = useContext(ThemeContext)

  const handleLogout = async () => {
    auth.signout()
  }

  return (
    <Box className="Navbar" component="nav" borderColor="primary.main" >
      <div className="scale-hover">
        <Typography variant="h5" color="primary">
          <Link to="/">Chat</Link>
        </Typography>
      </div>
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={e => selectTheme(0)}>pink</Button>
        <Button variant="contained" onClick={e => selectTheme(1)}>green</Button>
        <Button variant="contained" onClick={e => selectTheme(2)}>red</Button>
      </Stack>
      <Box display="flex" gap="20px" alignItems="center">
        {auth.user ? 
          <>
            <Link to="/profile">Profile</Link>
            <IconButton className="power-btn scale-hover" 
              onClick={handleLogout} 
              disableRipple
            >
              <PowerSettingsNewIcon color="error"/>
            </IconButton>
          </>
          :
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
      }
      </Box>
    </Box>
  )
}

export default Navbar;
