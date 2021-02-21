const { orderSvc } = require('../../services/order');

async function purchase(req, res, next) {

  try {
  
    var MSG_ID = req.body.MSG_ID;
    var PROD_ID = req.body.PROD_ID;
    var QUANTITY = req.body.QUANTITY;
    var CUST_ID = req.body.CUST_ID;

    const result = await orderSvc.purchase({MSG_ID, CUST_ID, PROD_ID, QUANTITY});
  
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(200).send({});
    }
  }
  catch (err) {
    res.status(500).send({error: err});
  }
}
  
  
module.exports = purchase;