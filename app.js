const express = require('express');
const env = require('dotenv').config().parsed;
const bodyParser = require('body-parser');
const compression = require('compression');

const planetRoutes = require('./api/routes/planets');
const middleware = require('./api/middleware/middleware.index');
const shared = require('./api/shared/shared.index');

const logger = shared.utils.logger;
const app = express();

app.use(compression());
app.use(bodyParser.urlencoded({
  extended: false
}));

middleware.logs.useLoggers(app);
app.use(express.json());
app.use('/planets', planetRoutes);
middleware.errorHandler.useErrorHandler(app, logger);



app.listen(env.PORT, env.HOST_NAME, () => {
  //console.log(`Server is running at http://${env.HOST_NAME}:${env.PORT}`);
  //logger.info(`Server is running at http://${env.HOST_NAME}:${env.PORT}`)
});

module.exports = app;