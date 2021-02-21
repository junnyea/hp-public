const getConnection = require('./../../lib/rmq/amqp-conn');
let connection =  null; 
const {orderSvc} = require('../order');
const {txnActivity} = require('../txn-activity');
let channel = null;
async function consume(){

  if(connection == null){
    connection = await getConnection();
    channel = await createConfirmChannel(connection);
  }

  startConsume();

}

async function createConfirmChannel(conn){
  return new Promise((resolve, reject)=>{
    try{
      conn.createConfirmChannel(function (error, channel) {
        resolve(channel);
      });
    }catch(err){
      reject(err);
    }
  });
}
module.exports = consume;

async function startConsume() {

  channel.on('error', function (err) {
    console.log(`On error` + err);
  });


  var queue = 'ORDER_Q1';
  channel.prefetch(1);
  channel.consume(queue, async function (msg) {
    //console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
    const orderObj = JSON.parse(msg.content);
    const result = await orderSvc.purchase(orderObj);
    console.log('received msg:' + JSON.stringify(orderObj));

    try {
      if (result.STATUS == 'SUCCESS') {
        const STATUS = 'SUCCESS';
        await txnActivity.updateTxnActivity({ MSG_ID : result.CID, TXN_ID : result.RESULT.ORDER_ID, STATUS });        channel.ack(msg);
        console.log(`ACK MSG_ID(${orderObj.MSG_ID})`);
      }
      else {
        //Move to dead letter queue or failed txn
        const STATUS = 'FAILED';
        await txnActivity.updateTxnActivity({ MSG_ID : result.CID, TXN_ID : result.RESULT.ORDER_ID, STATUS });
        console.log('NACK, FAILED TO PROCESS');
        channel.ack(msg);
      }
    }
    catch (err) {
      //Critical case, Move to dead letter queue or failed txn
      console.log('NACK, FAILED TO PROCESS');
      channel.nack(msg, false, false);
    }

  }, {
    noAck: false,
    exclusive: false
  });
  console.log('Order Consumer Started');

}
