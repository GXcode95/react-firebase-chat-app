import React, { useEffect } from 'react'
import 'styles/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'screens/Home';
import NotFound from 'screens/NotFound';
import Navbar from 'components/Navbar';
import Register from 'screens/Register';
import Login from 'screens/Login';
import PrivateRoute from 'components/PrivateRoute';
import Profile from 'screens/Profile';
import { ProvideAuth } from 'hooks/useAuth.js'
import { Box } from '@mui/material'
import { ThemeProvider, CssBaseline } from '@mui/material';
import {dark, light} from 'styles/palette'

const App = () => {
  const [theme, setTheme] = React.useState(light)
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App" bgcolor="background.main">

        <BrowserRouter>
          <ProvideAuth>
            <Navbar setTheme={setTheme}/>

            <Routes>
              <Route path="/" exact element={
                // <PrivateRoute>
                  <Home />
                // </PrivateRoute>
              }/>
              <Route path="/profile" exact element={
                // <PrivateRoute>
                  <Profile />
                // </PrivateRoute>
              }/>
              <Route path="/register" element={<Register />} exact />
              <Route path="/login" element={<Login />} exact />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </ProvideAuth>
        </BrowserRouter>
      
      </Box>
    </ThemeProvider>
  );
}

export default App;
