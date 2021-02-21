const pgPool = require('../../config/pg-pool');
const util = require('util');
const publish = require('./../../lib/rmq/amqp-publish');

async function createTxnActivity({MSG_ID, CUST_ID, PROD_ID, QUANTITY, PROCESSING_STATUS, CATEGORY}){

  try{
    let insertTxnActivitySql = `INSERT INTO HP_MSG_STATUS(
        ID, MSG_ID, CATEGORY, STATUS,
        IS_DELETED, CREATED_BY, CREATED_DT, MODIFIED_BY, MODIFIED_DT)
        VALUES (uuid_generate_v4(),
            $1, 
            $2,
            $3,
            false, 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP) RETURNING MSG_ID`;
  
  
    let txnActivitResult = await pgPool.query(insertTxnActivitySql, [MSG_ID, CATEGORY, PROCESSING_STATUS]);

    if(txnActivitResult){
      const msg_id = txnActivitResult.rows[0].msg_id;
      console.log(`MsgId(${msg_id})`);  
      return true;
    }
      
  
  }catch(err){
    console.error('purchase error:' + util.inspect(err));
    throw err;
  }
}
  
async function updateTxnActivity({MSG_ID, TXN_ID, STATUS}){

  try{
    let insertTxnActivitySql = `UPDATE HP_MSG_STATUS SET 
        TXN_ID = $1 ,
        STATUS = $2 ,
        MODIFIED_BY = 'admin' , 
        MODIFIED_DT  = CURRENT_TIMESTAMP
        WHERE MSG_ID = $3
        RETURNING MSG_ID`;
  
  
    let txnActivitResult = await pgPool.query(insertTxnActivitySql, [TXN_ID, STATUS, MSG_ID]);

    if(txnActivitResult){
      const msg_id = txnActivitResult.rows[0].msg_id;
      console.log(`MsgId(${msg_id})`);  
      return true;
    }
      
  
  }catch(err){
    console.error('purchase error:' + util.inspect(err));
    throw err;
  }
}

module.exports = { createTxnActivity, updateTxnActivity};