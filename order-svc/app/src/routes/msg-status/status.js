const { msgStatusSvc } = require('../../services/msg-status');

async function status(req, res, next) {

  try {
  
    const MSG_ID = req.params.msgId;
    const result = await msgStatusSvc.get({MSG_ID});
  
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
  
  
module.exports = status;