const express = require('express');
const ordersRequests = require('../requests/orders');

const router = express.Router();

router.post('/orders', ordersRequests.postOrder);
router.get('/orders', ordersRequests.getOrders);
router.get('/orders/:id', ordersRequests.getOrderByID);

module.exports = router;