class Reminder {
  constructor(data) {
    this._id = data._id || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.userId = data.userId;
    this.workItemId = data.workItemId;
    this.type = data.type;
    this.time = data.time;
    this.method = data.method;
    this.status = data.status || 'pending';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  save() {
    this.updatedAt = new Date();
    
    const existingIndex = global.memoryStore.reminders.findIndex(r => r._id === this._id);
    if (existingIndex >= 0) {
      global.memoryStore.reminders[existingIndex] = this;
    } else {
      global.memoryStore.reminders.push(this);
    }
    return this;
  }

  // 静态方法
  static findOne(query) {
    if (query._id) {
      return global.memoryStore.reminders.find(r => r._id === query._id);
    }
    return null;
  }

  static find(query = {}) {
    return global.memoryStore.reminders.filter(r => {
      if (query.userId && r.userId !== query.userId) return false;
      if (query.workItemId && r.workItemId !== query.workItemId) return false;
      if (query.status && r.status !== query.status) return false;
      return true;
    });
  }

  static deleteOne(query) {
    const initialLength = global.memoryStore.reminders.length;
    global.memoryStore.reminders = global.memoryStore.reminders.filter(r => {
      if (query._id && r._id === query._id) return false;
      if (query.userId && r.userId === query.userId) return false;
      return true;
    });
    return initialLength > global.memoryStore.reminders.length;
  }
}

module.exports = Reminder;