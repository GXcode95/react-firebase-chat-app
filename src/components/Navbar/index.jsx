import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { useAuth } from "hooks/useAuth"
import { Box, Button, Stack } from "@mui/material"
import { ThemeContext } from 'context/theme';

import './style.scss'

const Navbar = () => {
  const auth  = useAuth()
  const { theme, selectTheme } = useContext(ThemeContext)

  const handleLogout = async () => {
    auth.signout()
  }

  return (
    <Box className="Navbar" component="nav" borderColor="primary.main" >
      <div>
        <h3>
          <Link to="/">Messenger</Link>
        </h3>
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
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
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
