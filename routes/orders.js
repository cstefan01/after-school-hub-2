const express = require('express');
const ordersRequests = require('../requests/orders');

const router = express.Router();

router.post('/orders', ordersRequests.postOrder);
router.get('/orders', ordersRequests.getOrders);


module.exports = router;