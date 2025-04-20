import http from 'http';
import app from './app';
import { initSocketServer } from './socket';
import { sequelize } from './config/database.config';

const server = http.createServer(app);
initSocketServer(server);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('🔗 DB connected');
    server.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ DB connection failed:', err);
  }
})();