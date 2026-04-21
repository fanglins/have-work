class WorkItem {
  constructor(data) {
    this._id = data._id || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.userId = data.userId;
    this.dataSourceId = data.dataSourceId;
    this.type = data.type;
    this.title = data.title;
    this.description = data.description;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.priority = data.priority;
    this.status = data.status;
    this.tags = data.tags || [];
    this.sourceId = data.sourceId;
    this.sourceUrl = data.sourceUrl;
    this.metadata = data.metadata || {};
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  save() {
    this.updatedAt = new Date();
    
    const existingIndex = global.memoryStore.workItems.findIndex(wi => wi._id === this._id);
    if (existingIndex >= 0) {
      global.memoryStore.workItems[existingIndex] = this;
    } else {
      global.memoryStore.workItems.push(this);
    }
    return this;
  }

  // 静态方法
  static findOne(query) {
    if (query._id) {
      return global.memoryStore.workItems.find(wi => wi._id === query._id);
    }
    return null;
  }

  static find(query = {}) {
    return global.memoryStore.workItems.filter(wi => {
      if (query.userId && wi.userId !== query.userId) return false;
      if (query.dataSourceId && wi.dataSourceId !== query.dataSourceId) return false;
      if (query.type && wi.type !== query.type) return false;
      if (query.status && wi.status !== query.status) return false;
      return true;
    });
  }

  static deleteOne(query) {
    const initialLength = global.memoryStore.workItems.length;
    global.memoryStore.workItems = global.memoryStore.workItems.filter(wi => {
      if (query._id && wi._id === query._id) return false;
      if (query.userId && wi.userId === query.userId) return false;
      return true;
    });
    return initialLength > global.memoryStore.workItems.length;
  }
}

module.exports = WorkItem;