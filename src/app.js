const express = require('express');
const { engine } = require('express-handlebars');
const { homeRouter, carRouter, categoryRouter, adminRouter } = require('./api');
const path = require('node:path');
const { errorHandler, basicAuth } = require('./middlewares');
const helpers = require('./helpers');
const { getConfig } = require('./config');

const app = express();

app.engine('hbs', engine({ defaultLayout: 'main.hbs', helpers }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', homeRouter);
app.use('/car', carRouter);
app.use('/category', categoryRouter);

const { adminUser, adminPassword } = getConfig();
app.use('/admin', basicAuth, adminRouter);

app.use(errorHandler);

module.exports = app;
