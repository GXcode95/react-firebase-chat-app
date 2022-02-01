import React, { useContext } from 'react'
import 'styles/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'screens/Home';
import NotFound from 'screens/NotFound';
import Navbar from 'components/Navbar';
import Register from 'screens/Register';
import Login from 'screens/Login';
// import PrivateRoute from 'components/PrivateRoute';
import Profile from 'screens/Profile';
import { ProvideAuth } from 'hooks/useAuth.js'
import { Box } from '@mui/material'
import { ThemeContext } from 'context/theme';
import 'styles/stars.scss'
import BackgroundAnimation from 'components/BackgroundAnimation'

const App = () => {
  const { theme } = useContext(ThemeContext)
  const bgGradient = theme.palette.background.gradient
  return (
      <Box className="App" sx={{background: bgGradient}}>

        <BackgroundAnimation />
        <BrowserRouter>
          <ProvideAuth>
            <Navbar/>

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
  );
}

export default App;
