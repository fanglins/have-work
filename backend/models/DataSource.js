class DataSource {
  constructor(data) {
    this._id = data._id || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.userId = data.userId;
    this.type = data.type;
    this.provider = data.provider;
    this.name = data.name;
    this.credentials = data.credentials;
    this.config = data.config || {};
    this.lastSync = data.lastSync;
    this.syncStatus = data.syncStatus || 'idle';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  save() {
    this.updatedAt = new Date();
    
    const existingIndex = global.memoryStore.dataSources.findIndex(ds => ds._id === this._id);
    if (existingIndex >= 0) {
      global.memoryStore.dataSources[existingIndex] = this;
    } else {
      global.memoryStore.dataSources.push(this);
    }
    return this;
  }

  // 静态方法
  static findOne(query) {
    if (query._id) {
      return global.memoryStore.dataSources.find(ds => ds._id === query._id);
    }
    if (query.userId) {
      return global.memoryStore.dataSources.find(ds => ds.userId === query.userId);
    }
    return null;
  }

  static find(query = {}) {
    return global.memoryStore.dataSources.filter(ds => {
      if (query.userId && ds.userId !== query.userId) return false;
      if (query.type && ds.type !== query.type) return false;
      return true;
    });
  }

  static deleteOne(query) {
    const initialLength = global.memoryStore.dataSources.length;
    global.memoryStore.dataSources = global.memoryStore.dataSources.filter(ds => {
      if (query._id && ds._id === query._id) return false;
      if (query.userId && ds.userId === query.userId) return false;
      return true;
    });
    return initialLength > global.memoryStore.dataSources.length;
  }
}

module.exports = DataSource;