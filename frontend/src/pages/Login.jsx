import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    const result = await login(email, password)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="login-container">
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>登录</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label className="form-label">邮箱</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-item">
          <label className="form-label">密码</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">登录</button>
      </form>
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        还没有账号？ <Link to="/register">注册</Link>
      </div>
    </div>
  )
}

export default Login