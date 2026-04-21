const WorkItem = require('../models/WorkItem');
const Reminder = require('../models/Reminder');

// 获取工作信息列表
const getWorkItemList = async (req, res) => {
  try {
    const { type, priority, status, startDate, endDate } = req.query;
    
    const filter = { userId: req.user._id };
    
    if (type) filter.type = type;
    if (priority) filter.priority = priority;
    if (status) filter.status = status;
    if (startDate) filter.startDate = { $gte: new Date(startDate) };
    if (endDate) filter.endDate = { $lte: new Date(endDate) };
    
    const workItems = await WorkItem.find(filter);
    res.status(200).json(workItems);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 获取工作信息详情
const getWorkItemDetail = async (req, res) => {
  try {
    const { id } = req.params;
    
    const workItem = await WorkItem.findOne({ _id: id, userId: req.user._id });
    if (!workItem) {
      return res.status(404).json({ message: '工作信息不存在' });
    }
    
    res.status(200).json(workItem);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 更新工作信息
const updateWorkItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const workItem = await WorkItem.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      updates,
      { new: true }
    );
    
    if (!workItem) {
      return res.status(404).json({ message: '工作信息不存在' });
    }
    
    res.status(200).json(workItem);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 添加提醒
const addReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, time, method } = req.body;
    
    // 检查工作信息是否存在
    const workItem = await WorkItem.findOne({ _id: id, userId: req.user._id });
    if (!workItem) {
      return res.status(404).json({ message: '工作信息不存在' });
    }
    
    // 创建提醒
    const reminder = new Reminder({
      userId: req.user._id,
      workItemId: id,
      type,
      time,
      method
    });
    
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

module.exports = {
  getWorkItemList,
  getWorkItemDetail,
  updateWorkItem,
  addReminder
};