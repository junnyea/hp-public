const pgPool = require('../../config/pg-pool');
const util = require('util');

async function create({MSG_ID, STATUS, CATEGORY}){

  try{
    let insertTxnActivitySql = `INSERT INTO HP_MSG_STATUS(
        ID, MSG_ID, CATEGORY, STATUS,
        IS_DELETED, CREATED_BY, CREATED_DT, MODIFIED_BY, MODIFIED_DT)
        VALUES (uuid_generate_v4(),
            $1, 
            $2,
            $3,
            false, 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP) RETURNING MSG_ID`;
  
    let txnActivitResult = await pgPool.query(insertTxnActivitySql, [MSG_ID, CATEGORY, STATUS]);

    if(txnActivitResult){
      const msg_id = txnActivitResult.rows[0].msg_id;
      console.log(`MsgId(${msg_id})`);  
      return true;
    }else{
      throw 'FAILED TO CREATE TXN ACTIVITY';
    }
  
  }catch(err){
    console.error('purchase error:' + util.inspect(err));
    throw err;
  }
}

async function get({MSG_ID}){

  try{
    let selectMsgStatusSql = `SELECT * FROM HP_MSG_STATUS WHERE MSG_ID = $1 `;
  
    let msgStatusResult = await pgPool.query(selectMsgStatusSql, [MSG_ID]);


    if(msgStatusResult && msgStatusResult.rows.length ==1){
      const msg_id = msgStatusResult.rows[0].msg_id;
      const txn_id = msgStatusResult.rows[0].txn_id;
      const statusObj = {
        MSG_ID : msg_id,
        MSG_STATUS : msgStatusResult.rows[0].status
      };

      const custOrderResult = await getCustOrder({ID:txn_id});
      statusObj.CUST_ORDER = custOrderResult;

      return statusObj;
    }else{
      throw 'FAILED TO CREATE MSG STATUS';
    }
  
  }catch(err){
    console.error('purchase error:' + util.inspect(err));
    throw err;
  }
}

async function getCustOrder({ID}){

  try{
  
    let selectCustOrderSql = `SELECT * FROM HP_CUST_ORDER WHERE ID = $1`;
  
    let selectCustOrderResult = await pgPool.query(selectCustOrderSql, [ID]);
  
    if(selectCustOrderResult.rows.length == 1){
      return selectCustOrderResult.rows[0];
    }else{
      throw `No Cust Order record found for ID(${ID})`;
    }
  
    // eslint-disable-next-line no-empty
  }catch(err){
    console.error('getCustOrder error:' + util.inspect(err));
  }
}

module.exports = { createTxnActivity: create, get};