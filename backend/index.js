const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');

require('dotenv/config');

app.use(cors());
app.options('*', cors());

const baseurl = process.env.API_URL;
const covidRouter = require('./routers/covid');
const rsRouter = require('./routers/rumah-sakit');
const userRouter = require('./routers/user');
const vaksinRouter = require('./routers/vaksin');

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

// routers
app.use(`${baseurl}/covid`, covidRouter);
app.use(`${baseurl}/rs-rujukan`, rsRouter);
app.use(`${baseurl}/user`, userRouter);
app.use(`${baseurl}/vaksin`, vaksinRouter);

app.get('/', (req, res) => {
  res.send('hello antoni');
});

app.listen(5000, () => console.log('Server is running on port 5000'));
