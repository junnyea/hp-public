const util = require('util');
const pgPool = require('../../config/pg-pool');

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

module.exports = {getCustOrder};