const express = require('express');
const app = express();
app.use(express.json());

const api = require('./routes/api');

// app.get('/transactions', api.transaction.getTransaction.getorderTransactions);
// app.get('/transactions/getByDateRange', api.transaction.getTransaction.getorderTransactionsByDateRange);
// app.post('/transaction/order', api.transaction.order);

app.post('/order/purchase', api.order.purchase);
app.post('/order/async-purchase', api.order.asyncPurchase);
app.get('/order/status/:msgId', api.status.get);


module.exports = app;