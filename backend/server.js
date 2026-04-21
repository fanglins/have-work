const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const winston = require('winston');

// 加载环境变量
dotenv.config();

// 配置日志
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'work-info-aggregator' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// 内存存储
const memoryStore = {
  users: [],
  dataSources: [],
  workItems: [],
  reminders: []
};

// 注入内存存储到全局对象
global.memoryStore = memoryStore;

logger.info('使用内存存储模式');


// 初始化Express应用
const app = express();

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
const authRoutes = require('./routes/auth');
const dataSourceRoutes = require('./routes/dataSource');
const workItemRoutes = require('./routes/workItem');
const userRoutes = require('./routes/user');

app.use('/api/auth', authRoutes);
app.use('/api/data-sources', dataSourceRoutes);
app.use('/api/work-items', workItemRoutes);
app.use('/api/users', userRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// 错误处理
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`服务器运行在端口 ${PORT}`);
  console.log(`服务器运行在端口 ${PORT}`);
});