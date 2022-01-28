import './style.scss'
import React, { useState } from 'react'
import { useAuth } from 'hooks/useAuth';

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
          <button type="submit" disabled={loading}>{loading ? "..." : "Register" }</button>
        </div>

      </form>
      <p className="error">{error}</p>
    </section>
  )   
}

export default Register
