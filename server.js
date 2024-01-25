const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require("./conf/config");

const app = express();

// ================== Middleware ==================
const request_logger = require('./middleware/logger');
const image_middleware = require('./middleware/image');

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(request_logger.recordRequest);

// ================== Middleware ==================

// ================== End Points ==================
const lessonsRoute = require('./routes/lessons');
const ordersRoute = require('./routes/orders');

app.use(lessonsRoute);
app.use(ordersRoute);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});
// ================== End Points ==================

app.listen(config.port, () => {
    console.log(`Server is listening on http://${config.host}:${config.port}`);
})




