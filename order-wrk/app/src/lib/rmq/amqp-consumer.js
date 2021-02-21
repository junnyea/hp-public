const getConnection = require('./amqp-conn');
let connection =  null; 
const {orderSvc} = require('./../../services/order')

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
      
      var queue = 'ORDER_Q1';
      channel.consume(queue, function(msg) {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
        const orderObj = JSON.parse(msg.content);
        
        const result = await orderSvc.purchase(orderObj);

        if(result.STATUS == 'SUCCESS'){
          channel.ack(msg);
        }else{
          //Move to dead letter queue
        }
      }, {
        noAck: true
      })
      
    });
  });

}

module.exports = publish;