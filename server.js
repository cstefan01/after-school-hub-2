const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require("./conf/config");

const request_logger = require('./middleware/logger');

// =============== Routes ===============
const lessonsRoute = require('./routes/lessons');
const ordersRoute = require('./routes/orders');
// =============== Routes ===============

const app = express();

// ================== Middleware ==================

app.use(cors());

app.use(request_logger.recordRequest);
// ================== Middleware ==================

// ================== End Points ==================
app.use(lessonsRoute);
app.use(ordersRoute);
// ================== End Points ==================

app.listen(config.port, () => {
    console.log(`Server is listening on http://${config.host}:${config.port}`);
})




