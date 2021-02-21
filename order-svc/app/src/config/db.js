
const dbCredentials = {
  database: process.env.DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};
console.log('Db Credentials' + JSON.stringify(dbCredentials));
module.exports =  dbCredentials;