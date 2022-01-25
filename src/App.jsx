import React, { useState } from 'react'
import 'styles/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'screens/Home';
import NotFound from 'screens/NotFound';
import Navbar from 'components/Navbar';
import Register from 'screens/Register';
import Login from 'screens/Login';
import AuthProvider from 'context/auth';
import PrivateRoute from 'components/PrivateRoute';

const App = () => {
  
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route  path="/" exact element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }/>
            <Route path="/register" element={<Register />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}

export default App;
