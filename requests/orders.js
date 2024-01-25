const config = require('../conf/config');
const { MongoClient, ObjectId } = require('mongodb');


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

const getOrderByID = async (req, res) => {
    try {
        await client.connect();

        const orderId = req.params.id;

        const database = client.db(config.dbName);
        const order_collection = database.collection(config.db_order_collection);

        const order = await order_collection.findOne({ _id: new ObjectId(orderId) });

        if (!order) {
            return res.status(404).json({ message: 'order not found' });
        }

        res.json(order);
    } catch (err) {
        console.error('Error fetching order', err);
        res.status(500).json({ error: 'Failed to fetch order' });
    } finally {
        await client.close();
    }
}

const postOrder = async (req, res) => {
    try {
        await client.connect();

        const database = client.db(config.dbName);
        const order_collection = database.collection(config.db_order_collection);

        const order = req.body;

        if (!order.created_at || !order.customer.first_name || !order.customer.last_name || !order.customer.email_address || !order.customer.phone ||
            !order.lessons || order.lessons.length == 0 ||
            !order.sub_total || order.sub_total <= 0 ||
            !order.total || order.total <= 0) {
            return res.status(400).json({ status: 400, error: 'Invalid order data' });
        }

        const result = await order_collection.insertOne(order);

        if (result.acknowledged) {
            res.status(201).json({ status: 201, message: 'Order created successfully', orderId: result.insertedId });
        } else {
            res.status(500).json({ status: 500, error: 'Failed to create order' });
        }
    } catch (err) {
        console.error('Error creating order', err);
        res.status(500).json({ status: 500, error: 'Failed to create order' });
    } finally {
        await client.close();
    }
}

module.exports = {
    postOrder,
    getOrders,
    getOrderByID
}