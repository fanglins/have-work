import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Layout, ConfigProvider } from 'antd'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DataSources from './pages/DataSources.jsx'
import WorkItems from './pages/WorkItems.jsx'
import Settings from './pages/Settings.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'

const { Header, Content, Sider } = Layout

// 私有路由组件
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  return children
}

// 主布局组件
const MainLayout = ({ children }) => {
  const { user, logout } = useAuth()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '0 24px' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>工作信息汇总</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '16px' }}>{user?.name}</span>
          <button onClick={logout} style={{ padding: '4px 12px', borderRadius: '4px', border: '1px solid #d9d9d9' }}>退出</button>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <div style={{ padding: '16px', fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #f0f0f0' }}>菜单</div>
          <div style={{ padding: '16px 0' }}>
            <a href="/dashboard" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none', color: '#333' }}>仪表盘</a>
            <a href="/data-sources" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none', color: '#333' }}>数据源</a>
            <a href="/work-items" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none', color: '#333' }}>工作信息</a>
            <a href="/settings" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none', color: '#333' }}>设置</a>
          </div>
        </Sider>
        <Content style={{ padding: '24px', background: '#f0f2f5' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

// 应用组件
function App() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><MainLayout><Dashboard /></MainLayout></PrivateRoute>} />
            <Route path="/data-sources" element={<PrivateRoute><MainLayout><DataSources /></MainLayout></PrivateRoute>} />
            <Route path="/work-items" element={<PrivateRoute><MainLayout><WorkItems /></MainLayout></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><MainLayout><Settings /></MainLayout></PrivateRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  )
}

export default App