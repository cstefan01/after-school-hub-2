const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require("./conf/config");

const app = express();

// ================== Middleware ==================
const { recordRequest } = require('./middleware/logger');
const { getImage } = require('./middleware/image');

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(recordRequest);
app.use('/images/:filename', getImage)

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




