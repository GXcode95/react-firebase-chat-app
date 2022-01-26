import './style.scss'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from 'services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';

const Login = () => {
  const initialData = {
    email: "",
    password: "",
    error: null,
    loading: false,
  }
  const [data, setData] = useState(initialData)
  const { email, password, error, loading } = data;
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setData({...data, error: null, loading: true})
    if (!email || !password) {
      setData({...data, error: "all fields are requiered", loading: false})
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      await updateDoc(doc(db, 'users', res.user.uid), {
        isOnline: true,
      })
      setData(initialData)
      navigate("/")
    } catch (err) {
      // console.log(err)
      setData({...data, loading: false})
    }
  }

  return (
    <section className="Login">
      <h3>Login to your Acount</h3>
      <form className="form" onSubmit={handleSubmit}>

        <div className="input_container">
          <label htmlFor="email" name="email">Email</label>
          <input type="text" name="email" onChange={handleChange}/>
        </div>

        <div className="input_container">
          <label htmlFor="password" name="password">Password</label>
          <input type="password" name="password" onChange={handleChange}/>
        </div>
        
        <div className="btn_container">
          <button type="submit" disabled={loading}>
            {loading ? "Logging in ..." : "Login"}
          </button>
        </div>

      </form>
      <p className="error">{error}</p>
    </section>
  )   
}

export default Login
