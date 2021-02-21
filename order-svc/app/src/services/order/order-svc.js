const pgPool = require('../../config/pg-pool');
const util = require('util');

async function purchase({MSG_ID, CUST_ID, PROD_ID, QUANTITY}){


  const RESULT = await createPurchaseOrder({MSG_ID, CUST_ID, PROD_ID, QUANTITY});
  if(RESULT){
    return {CID: MSG_ID, STATUS : 'SUCCESS', RESULT};
  }else{
    return {CID: MSG_ID, STATUS : 'FAILED'};
  }

}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function createPurchaseOrder({MSG_ID, CUST_ID, PROD_ID, QUANTITY}){

  try{
    await delay(5000);
    let prodSql = `SELECT PRICE, NAME FROM HP_PRODUCT WHERE ID = $1`;
    let result = await pgPool.query(prodSql, [PROD_ID]);
    
    if (result && result.rows.length == 1) {
      const prodInfo = result.rows[0];
      const ACCEPTED_STATUS = 'ACCEPTED';
      const TOTAL_AMT = parseInt(prodInfo.price) * QUANTITY;

      let insertCustOrderSql = `INSERT INTO HP_CUST_ORDER(
        ID, CUST_ID, STATUS, TOTAL_AMOUNT,
        IS_DELETED, CREATED_BY, CREATED_DT, MODIFIED_BY, MODIFIED_DT)
        VALUES (uuid_generate_v4(),
            $1, 
            $2,
            $3,
            false, 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP) RETURNING ID;`;

      let custOrderResult = await pgPool.query(insertCustOrderSql, [CUST_ID, ACCEPTED_STATUS, TOTAL_AMT]);

      const orderId = custOrderResult.rows[0].id;
      
      let insertOrderProdSql  = `INSERT INTO HP_ORDER_PRODUCT(
        ORDER_ID, PROD_ID, QUANTITY, 
        IS_DELETED, CREATED_BY, CREATED_DT, MODIFIED_BY, MODIFIED_DT)
        VALUES (
            $1, 
            $2,
            $3,
            false, 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP) RETURNING ORDER_ID;
      `;

      let orderProdResult = await pgPool.query(insertOrderProdSql, [orderId, PROD_ID, QUANTITY]) ;

      if (orderProdResult && orderProdResult.rows.length == 1) {
        return {ORDER_ID : orderProdResult.rows[0].order_id, ORDER_STATUS : ACCEPTED_STATUS };
      }

      
    }else{
      return null;
    }

  // eslint-disable-next-line no-empty
  }catch(err){
    console.error('purchase error:' + util.inspect(err));
  }
}

module.exports = { purchase};