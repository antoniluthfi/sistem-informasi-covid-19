const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv/config');

app.use(cors());
app.options('*', cors());

const baseurl = process.env.API_URL;
const covidRouter = require('./routers/covid');
// const productRouter = require('./routers/product');
// const categoryRouter = require('./routers/category');
// const orderRouter = require('./routers/order');

// middleware 
app.use(bodyParser.json());
app.use(morgan('tiny'));

// connection

// routers
app.use(`${baseurl}/covid`, covidRouter);
// app.use(`${baseurl}/product`, productRouter);
// app.use(`${baseurl}/category`, categoryRouter);
// app.use(`${baseurl}/order`, orderRouter);

app.get('/', (req, res) => {
    res.send('hello antoni');
});

app.listen(5000, () => {
    console.log('server is running on port 5000');
});