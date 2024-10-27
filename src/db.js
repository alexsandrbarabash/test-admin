const mongoose = require('mongoose');
const { getConfig } = require('./config');

const connect = async () => {
  const config = await getConfig();

  await mongoose.connect(config.mongoUrl);
};

module.exports = { connect };
