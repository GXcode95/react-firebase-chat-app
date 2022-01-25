import './style.scss'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from 'services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, Timestamp, doc } from 'firebase/firestore';

const Register = () => {
  const initialData = {
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  }
  const [data, setData] = useState(initialData)
  const { name, email, password, error, loading } = data;
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setData({...data, error: null, loading: true})
    if (!name || !email || !password) {
      setData({...data, error: "all fields are requiered", loading: false})
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      })
      setData(initialData)
      navigate("/")
    } catch (err) {
      // console.log(err)
    }
  }

  return (
    <section className="Register">
      <h3>Create Acount</h3>
      <form className="form" onSubmit={handleSubmit}>

        <div className="input_container">
          <label htmlFor="name" name="name">Name</label>
          <input type="text" name="name" onChange={handleChange}/>
        </div>

        <div className="input_container">
          <label htmlFor="email" name="email">Email</label>
          <input type="text" name="email" onChange={handleChange}/>
        </div>

        <div className="input_container">
          <label htmlFor="password" name="password">Password</label>
          <input type="password" name="password" onChange={handleChange}/>
        </div>
        
        <div className="btn-container">
          <button type="submit" disabled={loading}>Register</button>
        </div>

      </form>
      <p className="error">{error}</p>
    </section>
  )   
}

export default Register
