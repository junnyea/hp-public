const getConnection = require('./amqp-conn');
let connection =  null; 


async function publish({msg}){

  if(connection == null){
    connection = await getConnection();
  }
  const msgStr = JSON.stringify(msg);

  return new Promise((resolve, reject) => {
    connection.createConfirmChannel(function(error, channel) {
      
      if (error) {
        reject(error);
      }
      
      var exchange = 'ORDER';
      channel.publish(exchange, '1', Buffer.from(msgStr));
      channel.waitForConfirms(function(err){
        if(!err){
          console.log('Order Submitted');
        }

        resolve('ok');
      });
      
    });
  });

}

module.exports = publish;