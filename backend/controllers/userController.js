const User = require('../models/User');

// 获取用户设置
const getUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('preferences');
    res.status(200).json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 更新用户设置
const updateUserSettings = async (req, res) => {
  try {
    const updates = req.body;
    
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { preferences: updates } },
      { new: true }
    );
    
    res.status(200).json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

module.exports = {
  getUserSettings,
  updateUserSettings
};