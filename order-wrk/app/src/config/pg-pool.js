const { Pool } = require('pg');
const dbProperties = require('./db');
module.exports =  new Pool(dbProperties);
