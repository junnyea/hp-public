const util = require('util');
const publish = require('./../../lib/rmq/amqp-publish');
const {msgStatusSvc: txnActivity} = require('../msg-status');

async function purchase({MSG_ID, CUST_ID, PROD_ID, QUANTITY}){

  try{
    await tryPublish({MSG_ID, CUST_ID, PROD_ID, QUANTITY});
    return {CID: MSG_ID, STATUS : 'SUCCESS',  REMARKS: 'Message Published'};
  }catch(err){
    return {CID: MSG_ID, STATUS : 'FAILED', ERROR_MSG : err};
  }
}

async function tryPublish({MSG_ID, CUST_ID, PROD_ID, QUANTITY}){
  const orderObj = {MSG_ID, CUST_ID, PROD_ID, QUANTITY};
  try{
    const result = await publish({msg: orderObj});

    if(result){
      const STATUS = 'NEW'; 
      const CATEGORY = 'ORDER';
      return await txnActivity.createTxnActivity({MSG_ID, CUST_ID, PROD_ID, QUANTITY, CATEGORY, STATUS});
    }
    

  }catch(err){
    console.error('purchase error:' + util.inspect(err));
    throw `[PUBLISH FAILED]: ${util.inspect(err)}`;
  }
}




module.exports = { purchase};