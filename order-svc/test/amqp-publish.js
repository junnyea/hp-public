var amqp = require('amqplib/callback_api');

async function publish({msg}){
  const msgStr = JSON.stringify(msg);

  return new Promise((resolve, reject) => {
    amqp.connect('amqps://admin:adminadmin2021%40%40@b-65fad49a-becc-45f3-b5fc-007da0ec0ccc.mq.ap-southeast-1.amazonaws.com:5671', function(error0, connection) {
      if (error0) {
        reject(error0);     
      }
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
  });
}

test();

async function test(){
  const result = await publish({msg: 'helloworld'});
  console.log('Publish status:' +result);
}
