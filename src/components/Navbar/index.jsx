import React, { useContext } from 'react'
import './style.scss'
import { Link, useNavigate } from "react-router-dom"
import { auth, db} from 'services/firebase'
import { updateDoc, doc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { AuthContext } from 'context/auth'

const Navbar = () => {
  const { user } = useContext(AuthContext)
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
      {console.log("user2",user)}
    </nav>
  )
}

export default Navbar;
