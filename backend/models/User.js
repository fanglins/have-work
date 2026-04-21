const bcrypt = require('bcryptjs');

class User {
  constructor(data) {
    this._id = data._id || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.avatar = data.avatar || '';
    this.preferences = data.preferences || {
      theme: 'light',
      timezone: 'Asia/Shanghai',
      notificationSettings: {
        email: true,
        app: true
      }
    };
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // 密码加密
  async save() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    this.updatedAt = new Date();
    
    const existingUserIndex = global.memoryStore.users.findIndex(u => u._id === this._id);
    if (existingUserIndex >= 0) {
      global.memoryStore.users[existingUserIndex] = this;
    } else {
      global.memoryStore.users.push(this);
    }
    return this;
  }

  // 验证密码
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // 静态方法
  static async findOne(query) {
    if (query._id) {
      return global.memoryStore.users.find(u => u._id === query._id);
    }
    if (query.email) {
      return global.memoryStore.users.find(u => u.email === query.email);
    }
    return null;
  }

  static async find() {
    return global.memoryStore.users;
  }

  static async findById(id) {
    return global.memoryStore.users.find(u => u._id === id);
  }

  static async deleteOne(query) {
    const initialLength = global.memoryStore.users.length;
    global.memoryStore.users = global.memoryStore.users.filter(u => {
      if (query._id && u._id === query._id) return false;
      if (query.email && u.email === query.email) return false;
      return true;
    });
    return initialLength > global.memoryStore.users.length;
  }
}

module.exports = User;