import React, { useState, useEffect } from 'react'

const DataSources = () => {
  const [dataSources, setDataSources] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDataSource, setNewDataSource] = useState({
    type: 'email',
    provider: 'gmail',
    name: '',
    credentials: {}
  })

  useEffect(() => {
    fetchDataSources()
  }, [])

  const fetchDataSources = async () => {
    try {
      // 模拟数据
      const mockDataSources = [
        {
          _id: '1',
          name: '个人Gmail',
          type: 'email',
          provider: 'gmail',
          lastSync: new Date().toISOString(),
          syncStatus: 'idle'
        },
        {
          _id: '2',
          name: '公司Outlook',
          type: 'email',
          provider: 'outlook',
          lastSync: new Date(Date.now() - 3600000).toISOString(), // 1小时前
          syncStatus: 'idle'
        },
        {
          _id: '3',
          name: '项目Jira',
          type: 'project',
          provider: 'jira',
          lastSync: new Date(Date.now() - 7200000).toISOString(), // 2小时前
          syncStatus: 'idle'
        }
      ]
      setDataSources(mockDataSources)
    } catch (error) {
      console.error('获取数据源失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddDataSource = async (e) => {
    e.preventDefault()
    try {
      // 模拟添加
      const newSource = {
        _id: Date.now().toString(),
        ...newDataSource,
        lastSync: new Date().toISOString(),
        syncStatus: 'idle'
      }
      setDataSources([...dataSources, newSource])
      setShowAddForm(false)
      setNewDataSource({
        type: 'email',
        provider: 'gmail',
        name: '',
        credentials: {}
      })
    } catch (error) {
      console.error('添加数据源失败:', error)
    }
  }

  const handleSyncDataSource = async (id) => {
    try {
      // 模拟同步
      setDataSources(dataSources.map(source => 
        source._id === id 
          ? { ...source, lastSync: new Date().toISOString(), syncStatus: 'idle' }
          : source
      ))
    } catch (error) {
      console.error('同步数据源失败:', error)
    }
  }

  const handleDeleteDataSource = async (id) => {
    if (window.confirm('确定要删除这个数据源吗？')) {
      try {
        // 模拟删除
        setDataSources(dataSources.filter(source => source._id !== id))
      } catch (error) {
        console.error('删除数据源失败:', error)
      }
    }
  }

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>数据源管理</h1>
        <button className="button button-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? '取消' : '添加数据源'}
        </button>
      </div>
      
      {showAddForm && (
        <div className="dashboard-card" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>添加数据源</h3>
          <form onSubmit={handleAddDataSource}>
            <div className="form-item">
              <label className="form-label">类型</label>
              <select
                className="form-input"
                value={newDataSource.type}
                onChange={(e) => setNewDataSource({ ...newDataSource, type: e.target.value })}
              >
                <option value="email">邮件</option>
                <option value="calendar">日历</option>
                <option value="project">项目管理</option>
                <option value="task">任务</option>
              </select>
            </div>
            <div className="form-item">
              <label className="form-label">提供商</label>
              <select
                className="form-input"
                value={newDataSource.provider}
                onChange={(e) => setNewDataSource({ ...newDataSource, provider: e.target.value })}
              >
                <option value="gmail">Gmail</option>
                <option value="outlook">Outlook</option>
                <option value="jira">Jira</option>
                <option value="trello">Trello</option>
                <option value="todoist">Todoist</option>
              </select>
            </div>
            <div className="form-item">
              <label className="form-label">名称</label>
              <input
                type="text"
                className="form-input"
                value={newDataSource.name}
                onChange={(e) => setNewDataSource({ ...newDataSource, name: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="button button-primary">添加</button>
          </form>
        </div>
      )}
      
      {dataSources.length === 0 ? (
        <div className="dashboard-card">
          <div style={{ textAlign: 'center', padding: '48px' }}>
            还没有添加数据源，点击上方按钮添加
          </div>
        </div>
      ) : (
        dataSources.map(source => (
          <div key={source._id} className="data-source-item">
            <div className="data-source-header">
              <div>
                <div className="data-source-name">{source.name}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {source.type === 'email' ? '邮件' : source.type === 'calendar' ? '日历' : source.type === 'project' ? '项目管理' : '任务'} - {source.provider}
                </div>
              </div>
              <div className="data-source-actions">
                <button className="button" onClick={() => handleSyncDataSource(source._id)}>
                  同步
                </button>
                <button className="button" style={{ color: '#ff4d4f', borderColor: '#ff4d4f' }} onClick={() => handleDeleteDataSource(source._id)}>
                  删除
                </button>
              </div>
            </div>
            {source.lastSync && (
              <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
                最后同步: {new Date(source.lastSync).toLocaleString()}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default DataSources