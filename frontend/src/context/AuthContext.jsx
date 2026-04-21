import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 初始化时检查本地存储的token
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')
      if (token && userData) {
        try {
          setUser(JSON.parse(userData))
          setIsAuthenticated(true)
        } catch (error) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setIsAuthenticated(false)
          setUser(null)
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  // 登录
  const login = async (email, password) => {
    try {
      // 模拟登录
      if (email && password) {
        const mockUser = {
          _id: '1',
          email: email,
          name: email.split('@')[0]
        }
        const mockToken = 'mock-token-' + Date.now()
        localStorage.setItem('token', mockToken)
        localStorage.setItem('user', JSON.stringify(mockUser))
        setUser(mockUser)
        setIsAuthenticated(true)
        return { success: true }
      } else {
        return { success: false, message: '请输入邮箱和密码' }
      }
    } catch (error) {
      return { success: false, message: '登录失败' }
    }
  }

  // 注册
  const register = async (email, password, name) => {
    try {
      // 模拟注册
      if (email && password && name) {
        const mockUser = {
          _id: '1',
          email: email,
          name: name
        }
        const mockToken = 'mock-token-' + Date.now()
        localStorage.setItem('token', mockToken)
        localStorage.setItem('user', JSON.stringify(mockUser))
        setUser(mockUser)
        setIsAuthenticated(true)
        return { success: true }
      } else {
        return { success: false, message: '请填写所有字段' }
      }
    } catch (error) {
      return { success: false, message: '注册失败' }
    }
  }

  // 退出登录
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}