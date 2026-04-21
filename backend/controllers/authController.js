const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 注册
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // 检查用户是否已存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '用户已存在' });
    }
    
    // 创建新用户
    const user = new User({ email, password, name });
    await user.save();
    
    // 生成token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '7d'
    });
    
    res.status(201).json({ user: { _id: user._id, email: user.email, name: user.name }, token });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 登录
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '邮箱或密码错误' });
    }
    
    // 验证密码
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: '邮箱或密码错误' });
    }
    
    // 生成token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '7d'
    });
    
    res.status(200).json({ user: { _id: user._id, email: user.email, name: user.name }, token });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 获取当前用户信息
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      // 移除密码字段
      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } else {
      res.status(404).json({ message: '用户不存在' });
    }
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser
};