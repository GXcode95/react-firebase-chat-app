import './style.scss'
import React, { useState } from 'react'
import { useAuth } from 'hooks/useAuth'

const Login = () => {
  const auth = useAuth()
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  })
  const { email, password, error, loading } = data;
  
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setData({...data, error: null, loading: true})
    if (!email || !password) {
      setData({...data, error: "all fields are requiered", loading: false})
    } else {
      auth.signin(email, password)
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
          <button className='btn' type="submit" disabled={loading}>
            Login
          </button>
        </div>

      </form>
      <p className="error">{error}</p>
    </section>
  )   
}

export default Login
