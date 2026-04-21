import React, { useState, useEffect } from 'react'

const WorkItems = () => {
  const [workItems, setWorkItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    type: '',
    priority: ''
  })

  useEffect(() => {
    fetchWorkItems()
  }, [filter])

  const fetchWorkItems = async () => {
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
          priority: 'medium',
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
          priority: 'high',
          startDate: new Date(Date.now() + 172800000).toISOString(), // 2天后
          endDate: new Date(Date.now() + 172800000 + 7200000).toISOString(), // 2天后+2小时
          tags: ['客户', '演示']
        },
        {
          _id: '6',
          title: '修复bug',
          type: 'task',
          status: 'in-progress',
          priority: 'high',
          description: '修复用户反馈的bug',
          startDate: new Date().toISOString(),
          tags: ['bug', '紧急']
        }
      ]
      
      // 应用过滤
      let filteredItems = mockWorkItems
      if (filter.type) {
        filteredItems = filteredItems.filter(item => item.type === filter.type)
      }
      if (filter.priority) {
        filteredItems = filteredItems.filter(item => item.priority === filter.priority)
      }
      
      setWorkItems(filteredItems)
    } catch (error) {
      console.error('获取工作信息失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddReminder = async (id) => {
    try {
      // 模拟添加提醒
      alert('提醒添加成功')
    } catch (error) {
      console.error('添加提醒失败:', error)
    }
  }

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>工作信息管理</h1>
        <div style={{ display: 'flex', gap: '16px' }}>
          <select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            style={{ padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
          >
            <option value="">所有类型</option>
            <option value="task">任务</option>
            <option value="meeting">会议</option>
            <option value="deadline">截止日期</option>
            <option value="notification">通知</option>
          </select>
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            style={{ padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
          >
            <option value="">所有优先级</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>
      </div>
      
      {workItems.length === 0 ? (
        <div className="dashboard-card">
          <div style={{ textAlign: 'center', padding: '48px' }}>
            暂无工作信息
          </div>
        </div>
      ) : (
        workItems.map(item => (
          <div key={item._id} className="work-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div className="work-item-title">{item.title}</div>
              <button className="button" onClick={() => handleAddReminder(item._id)}>
                添加提醒
              </button>
            </div>
            <div className="work-item-meta">
              <span>{item.type === 'task' ? '任务' : item.type === 'meeting' ? '会议' : item.type === 'deadline' ? '截止日期' : '通知'}</span>
              {item.startDate && <span>{new Date(item.startDate).toLocaleString()}</span>}
              {item.priority && <span>优先级: {item.priority === 'high' ? '高' : item.priority === 'medium' ? '中' : '低'}</span>}
              {item.status && <span>状态: {item.status}</span>}
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
        ))
      )}
    </div>
  )
}

export default WorkItems