const { getConfig } = require('./config');
const app = require('./app');
const { connect } = require('./db');

const main = async () => {
  const config = await getConfig();

  await connect();

  app.listen(config.port, () => {
    console.log('Server is running on port 3000');
  });
};

main();
