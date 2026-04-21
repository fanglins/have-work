import React, { useState, useEffect } from 'react'

const Dashboard = () => {
  const [workItems, setWorkItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    upcomingMeetings: 0,
    pendingDeadlines: 0
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 模拟数据
        const mockWorkItems = [
          {
            _id: '1',
            title: '完成项目规划',
            type: 'task',
            status: 'completed',
            priority: 'high',
            description: '完成产品的整体规划和功能设计',
            startDate: new Date().toISOString(),
            tags: ['重要', '紧急']
          },
          {
            _id: '2',
            title: '团队周会',
            type: 'meeting',
            status: 'pending',
            startDate: new Date(Date.now() + 86400000).toISOString(), // 明天
            endDate: new Date(Date.now() + 86400000 + 3600000).toISOString(), // 明天+1小时
            tags: ['团队', '周会']
          },
          {
            _id: '3',
            title: '提交项目报告',
            type: 'deadline',
            status: 'pending',
            priority: 'medium',
            endDate: new Date(Date.now() + 259200000).toISOString(), // 3天后
            tags: ['报告', '截止日期']
          },
          {
            _id: '4',
            title: '代码审查',
            type: 'task',
            status: 'in-progress',
            priority: 'medium',
            description: '审查团队成员提交的代码',
            startDate: new Date().toISOString(),
            tags: ['代码', '审查']
          },
          {
            _id: '5',
            title: '客户演示',
            type: 'meeting',
            status: 'pending',
            startDate: new Date(Date.now() + 172800000).toISOString(), // 2天后
            endDate: new Date(Date.now() + 172800000 + 7200000).toISOString(), // 2天后+2小时
            tags: ['客户', '演示']
          }
        ]
        
        setWorkItems(mockWorkItems)
        
        // 计算统计数据
        const totalTasks = mockWorkItems.filter(item => item.type === 'task').length
        const completedTasks = mockWorkItems.filter(item => item.type === 'task' && item.status === 'completed').length
        const upcomingMeetings = mockWorkItems.filter(item => item.type === 'meeting' && new Date(item.startDate) > new Date()).length
        const pendingDeadlines = mockWorkItems.filter(item => item.type === 'deadline' && new Date(item.endDate) > new Date()).length
        
        setStats({
          totalTasks,
          completedTasks,
          upcomingMeetings,
          pendingDeadlines
        })
      } catch (error) {
        console.error('获取数据失败:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>仪表盘</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="dashboard-card">
          <div className="card-title">总任务数</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalTasks}</div>
        </div>
        <div className="dashboard-card">
          <div className="card-title">已完成任务</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>{stats.completedTasks}</div>
        </div>
        <div className="dashboard-card">
          <div className="card-title">即将到来的会议</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.upcomingMeetings}</div>
        </div>
        <div className="dashboard-card">
          <div className="card-title">待处理的截止日期</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.pendingDeadlines}</div>
        </div>
      </div>
      
      <div className="dashboard-card">
        <div className="card-title">最近的工作信息</div>
        {workItems.slice(0, 5).map(item => (
          <div key={item._id} className="work-item">
            <div className="work-item-title">{item.title}</div>
            <div className="work-item-meta">
              <span>{item.type === 'task' ? '任务' : item.type === 'meeting' ? '会议' : item.type === 'deadline' ? '截止日期' : '通知'}</span>
              {item.startDate && <span>{new Date(item.startDate).toLocaleString()}</span>}
              {item.priority && <span>优先级: {item.priority === 'high' ? '高' : item.priority === 'medium' ? '中' : '低'}</span>}
            </div>
            {item.description && <div className="work-item-description">{item.description}</div>}
            {item.tags.length > 0 && (
              <div className="work-item-tags">
                {item.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
        {workItems.length === 0 && <div style={{ textAlign: 'center', padding: '24px' }}>暂无工作信息</div>}
      </div>
    </div>
  )
}

export default Dashboard