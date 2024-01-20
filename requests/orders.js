const config = require('../conf/config');
const { MongoClient } = require('mongodb');


const client = new MongoClient(config.dbUri);

const getOrders = async (req, res) => {
    try {
        await client.connect();

        const database = client.db(config.dbName);
        const order_collection = database.collection(config.db_order_collection);

        const orders = await order_collection.find({}).toArray();

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await client.close();
    }
}

const postOrder = async (req, res) => {
    try {
        const database = client.db(dbConfig.name);
        const order_collection = database.collection(dbConfig.collections.order);

        const order = req.body;

        if (!order.order_id || !order.customer || !order.lessons || !order.sub_total || !order.total) {
            return res.status(400).json({ error: 'Invalid order data' });
        }

        const result = await order_collection.insertOne(order);

        if (result.acknowledged) {
            res.status(201).json({ message: 'Order created successfully', orderId: result.insertedId });
        } else {
            res.status(500).json({ error: 'Failed to create order' });
        }
    } catch (err) {
        console.error('Error creating order', err);
        res.status(500).json({ error: 'Failed to create order' });
    }
}

module.exports = {
    postOrder,
    getOrders
}