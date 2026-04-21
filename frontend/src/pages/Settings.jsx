import React, { useState, useEffect } from 'react'

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    timezone: 'Asia/Shanghai',
    notificationSettings: {
      email: true,
      app: true
    }
  })
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      // 模拟获取设置
      // 从本地存储获取设置，如果没有则使用默认值
      const savedSettings = localStorage.getItem('userSettings')
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
    } catch (error) {
      console.error('获取设置失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateSettings = async (e) => {
    e.preventDefault()
    try {
      // 模拟更新设置
      // 保存到本地存储
      localStorage.setItem('userSettings', JSON.stringify(settings))
      setMessage('设置更新成功')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('更新设置失败:', error)
      setMessage('更新失败')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>设置</h1>
      {message && <div className="text-green-500 mb-4">{message}</div>}
      <div className="dashboard-card">
        <form onSubmit={handleUpdateSettings}>
          <div className="form-item">
            <label className="form-label">主题</label>
            <select
              className="form-input"
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
            >
              <option value="light">浅色</option>
              <option value="dark">深色</option>
            </select>
          </div>
          <div className="form-item">
            <label className="form-label">时区</label>
            <select
              className="form-input"
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
            >
              <option value="Asia/Shanghai">亚洲/上海</option>
              <option value="America/New_York">美国/纽约</option>
              <option value="Europe/London">欧洲/伦敦</option>
              <option value="Asia/Tokyo">亚洲/东京</option>
            </select>
          </div>
          <div className="form-item">
            <label className="form-label">通知设置</label>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={settings.notificationSettings.email}
                  onChange={(e) => setSettings({
                    ...settings,
                    notificationSettings: {
                      ...settings.notificationSettings,
                      email: e.target.checked
                    }
                  })}
                />
                <label>邮件通知</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={settings.notificationSettings.app}
                  onChange={(e) => setSettings({
                    ...settings,
                    notificationSettings: {
                      ...settings.notificationSettings,
                      app: e.target.checked
                    }
                  })}
                />
                <label>应用内通知</label>
              </div>
            </div>
          </div>
          <button type="submit" className="button button-primary">保存设置</button>
        </form>
      </div>
    </div>
  )
}

export default Settings