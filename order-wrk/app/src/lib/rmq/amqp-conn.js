var amqp = require('amqplib/callback_api');


async function getConnection(){
  return new Promise((resolve, reject) => {
    amqp.connect(process.env.URI, function(error0, connection) {
      if (error0) {
        reject(error0);     
      }
      resolve(connection);
    });
  });
}

module.exports = getConnection;