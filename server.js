const express = require('express');
const bodyParser = require('body-parser');

const config = require("./conf/config");

// =============== Routes ===============
const lessonsRoute = require('./routes/lessons');
const ordersRoute = require('./routes/orders');
// =============== Routes ===============

const app = express();

// ================== Middleware ==================
const request_logger = require('./middleware/logger');

//app.use(request_logger.recordRequest);
// ================== Middleware ==================

// ================== End Points ==================
app.use(lessonsRoute);
app.use(ordersRoute);
// ================== End Points ==================

app.listen(config.port, config.host, () => {
    console.log(`Server is listening on http://${config.host}:${config.port}`);
})




