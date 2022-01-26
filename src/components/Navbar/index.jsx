import React from 'react'
import './style.scss'
import { Link, useNavigate } from "react-router-dom"
import {  db} from 'services/firebase'
import { updateDoc, doc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { useAuth } from "hooks/useAuth"

const Navbar = () => {
  const auth  = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {


    auth.signout()
  }

  return (
    <nav className="Navbar">
      <h3>
        <Link to="/">Messenger</Link>
      </h3>

      { auth.user ? 
        <div>
          <Link to="/profile">Profile</Link>
          <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
        :
        <div>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      }
    </nav>
  )
}

export default Navbar;
