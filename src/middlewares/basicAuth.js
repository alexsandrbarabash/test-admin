const { getConfig } = require('../config');

function basicAuth(req, res, next) {
  const unauthorized = (res) => {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Authentication required.');
  };

  const auth = req.headers.authorization;

  if (!auth) {
    return unauthorized(res);
  }

  const [username, password] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');

  const { adminUser, adminPassword } = getConfig();

  if (username === adminUser && password === adminPassword) {
    return next();
  }

  return unauthorized(res);
}

module.exports = basicAuth;
