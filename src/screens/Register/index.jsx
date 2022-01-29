import './style.scss'
import React, { useState } from 'react'
import { useAuth } from 'hooks/useAuth';
import { Box, Container, Button, TextField, Typography} from '@mui/material'

const Register = () => {
  const auth = useAuth()

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  })
  const { name, email, password, error, loading } = data;
  
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setData({...data, error: null, loading: true})
    if (!name || !email || !password) {
      setData({...data, error: "all fields are requiered", loading: false})
    } else {
      auth.register(name, email, password)
      setData({...data, loading: false})
    }
      
  }

  return (
      <Container 
      sx={{display:"flex", flexDirection: "column", alignItems:"center" }} 
      >
      <h3>Create Acount</h3>
      <Typography variant="h3" my={5}>Login</Typography>
      <Box 
        component="form" 
        width="80%" 
        maxWidth="500px"
        minWidth="200px"
        onSubmit={handleSubmit}
      >

        <Box mb={4} fontSize="26px"> {/* Email */}
          <label htmlFor="email" name="email">Email</label>
          <TextField 
            variant="standard" 
            color="primary"
            type="email"
            name="email" 
            margin="normal"
            fullWidth
            required
            autofocus
            onChange={handleChange}
            InputProps={{style: {fontSize: "22px", padding: " 5px 0"}}}
          />
        </Box>

        <Box mb={4} fontSize="26px"> {/* Password */}
          <label htmlFor="password" name="password">Password</label>
          <TextField 
            variant="standard" 
            color="primary"
            type="password"
            name="password" 
            margin="normal"
            fullWidth
            required
            onChange={handleChange}
            InputProps={{style: {fontSize: "22px", padding: "5px 0"}}}
          />
        </Box>

        <Box mb={4} fontSize="26px"> {/* name */}
          <label htmlFor="name" name="name">Name</label>
          <TextField 
            variant="standard" 
            color="primary"
            name="name" 
            margin="normal"
            fullWidth
            required
            onChange={handleChange}
            InputProps={{style: {fontSize: "22px", padding: "5px 0"}}}
          />
        </Box>

        <Box textAlign="center">
          <Button variant="outlined" type="submit" disabled={loading}>
            Register
          </Button>
        </Box>

      </Box>
      <p className="error">{error}</p>
    </Container>
  )   
}

export default Register
