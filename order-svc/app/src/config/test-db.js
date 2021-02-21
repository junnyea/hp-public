const { Pool } = require('pg');
const dbProperties = require('./db');
const pool = new Pool(dbProperties);

const pgPool = require('./pg-pool');
pool.query(`SELECT * FROM "APP_USER"`, (err, res) => {
  console.log(err, res);
  pool.end();
});


//testQuery();
testInsertQuery();


async function testInsertQuery(){


  const sqlScripts = `INSERT INTO "APP_USER"(
	"ID", "FIRST_NAME", "LAST_NAME", "EMAIL")
  VALUES (uuid_generate_v4 (), $1, $2, $3)`;

  const values = ['hj', 'jun', 'xxx1@xxx1.com'];

  const result = await pgPool.query(sqlScripts, values);

  console.log('Async query:'  + JSON.stringify(result.rowCount));
}