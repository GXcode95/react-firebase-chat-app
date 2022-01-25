import { AuthContext } from 'context/auth';
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import './style.scss'

const PrivateRoute = ({children}) => {
  const { user } = useContext(AuthContext)
  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute;
