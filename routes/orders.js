const express = require('express');
const { postOrder, getOrders, getOrderByID } = require('../requests/orders');

const router = express.Router();

router.post('/orders', postOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderByID);

module.exports = router;