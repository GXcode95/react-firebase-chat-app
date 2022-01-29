import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from "hooks/useAuth"
import { Box, Button } from "@mui/material"

const Navbar = () => {
  const auth  = useAuth()

  const navStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "70px",
    padding: "0 20px",
    borderBottom: "1px solid",
    borderColor: "grey.600"
  }

  const handleLogout = async () => {
    auth.signout()
  }

  return (
    <Box component="nav" sx={navStyle} >
      <h3>
        <Link to="/">Messenger</Link>
      </h3>

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
