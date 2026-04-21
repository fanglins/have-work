const DataSource = require('../models/DataSource');

// 获取用户的数据源列表
const getDataSourceList = async (req, res) => {
  try {
    const dataSources = await DataSource.find({ userId: req.user._id });
    res.status(200).json(dataSources);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 添加新的数据源
const addDataSource = async (req, res) => {
  try {
    const { type, provider, name, credentials, config } = req.body;
    
    const dataSource = new DataSource({
      userId: req.user._id,
      type,
      provider,
      name,
      credentials,
      config
    });
    
    await dataSource.save();
    res.status(201).json(dataSource);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 更新数据源配置
const updateDataSource = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const dataSource = await DataSource.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      updates,
      { new: true }
    );
    
    if (!dataSource) {
      return res.status(404).json({ message: '数据源不存在' });
    }
    
    res.status(200).json(dataSource);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 删除数据源
const deleteDataSource = async (req, res) => {
  try {
    const { id } = req.params;
    
    const dataSource = await DataSource.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });
    
    if (!dataSource) {
      return res.status(404).json({ message: '数据源不存在' });
    }
    
    res.status(200).json({ message: '数据源删除成功' });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 手动同步数据源
const syncDataSource = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 这里应该调用具体的同步服务
    // 暂时只更新同步状态和时间
    const dataSource = await DataSource.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { 
        lastSync: new Date(),
        syncStatus: 'completed'
      },
      { new: true }
    );
    
    if (!dataSource) {
      return res.status(404).json({ message: '数据源不存在' });
    }
    
    res.status(200).json(dataSource);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

module.exports = {
  getDataSourceList,
  addDataSource,
  updateDataSource,
  deleteDataSource,
  syncDataSource
};