import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from "hooks/useAuth"
import { Box, IconButton, Typography } from "@mui/material"
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from 'react-router-dom'

import './style.scss'

const Navbar = () => {
  const auth  = useAuth()
  
  const navigate = useNavigate()
  const handleLogout = async () => {
    auth.signout()
  }

  return (
    <Box className="Navbar" component="nav" borderColor="primary.main" >
      <div className="scale-hover">
        <Typography variant="h5" className="highlight-hover" color="primary">
          <Link to="/">Chat</Link>
        </Typography>
      </div>
      <Box display="flex" gap="20px" alignItems="center">
        {auth.user ? 
          <>
            <IconButton className="highlight-hover scale-hover" 
              onClick={e => navigate("/profile")} 
              disableRipple
            >
              <ManageAccountsIcon color="primary"/>
            </IconButton>
            <IconButton className="highlight-hover scale-hover" 
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
