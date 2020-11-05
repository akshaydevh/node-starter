'use strict';
import express from 'express';
import routes from '../router/route';
import config from '../config'
import errorHandler from 'express-error-handler'
import { dbConnect } from './dbconnector';
import logger from './utils/logger'

require('log-timestamp');

const dbURI = 'mongodb://127.0.0.1:27017/database';


var app = express();
app.use(express.json());

const port = config.port;

const server = app.listen(port);
server.on('listening', () =>
  console.log(`server Started at http://${config.host}:${port}`)
)
dbConnect(config.dbURI)
routes(app)
app.use(errorHandler({ logger }))
app.use(function (req, res) {
  res.status(404).send({ error: 'not found' });
});
