const express = require('express');
const app = express();
app.use(express.json());
const consumer = require('./services/consumer')

consumer.startOrderConsumer();


module.exports = app;