import React from 'react'
import './style.scss'
import { Link, useNavigate } from "react-router-dom"
import { auth, db} from 'services/firebase'
import { updateDoc, doc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import useAuth from 'hooks/useAuth'

const Navbar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await updateDoc(doc( db, 'users', auth.currentUser.uid), {
      isOnline: false,
    })
    await signOut(auth)
    navigate('/login')
  }

  return (
    <nav className="Navbar">
      <h3>
        <Link to="/">Messenger</Link>
      </h3>

      { user ? 
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
      {console.log("user",auth.currentUser)}
    </nav>
  )
}

export default Navbar;
