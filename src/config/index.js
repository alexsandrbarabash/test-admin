const { configSchema } = require('./schema');
require('dotenv').config();

let config = null;

exports.getConfig = () => {
  if (config) {
    return config;
  }

  config = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminUser: process.env.ADMIN_USER,
    adminPassword: process.env.ADMIN_PASSWORD,
  };

  const result = configSchema.safeParse(config);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  return config;
};
