require('dotenv').config();

const { NODE_ENV, PORT, JWT_SECRET, CONNECT_DB } = process.env;

const config = {
  nodeEnv: NODE_ENV || 'development',
  port: PORT || 3000,
  jwtSecret: NODE_ENV === 'production' ? JWT_SECRET : 'super-secret',
  connectDbString: CONNECT_DB || 'mongodb://127.0.0.1:27017/mestodb'
};

module.exports = config;
