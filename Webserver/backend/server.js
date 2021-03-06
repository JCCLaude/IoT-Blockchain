const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
); 
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const api = new express.Router()
app.use('/api',api)

const coRouter = require('./routes/co');
const noRouter = require('./routes/no');
const soRouter = require('./routes/so');
const pm2Router = require('./routes/pm2');
const pm10Router = require('./routes/pm10');
const ahRouter = require('./routes/ah');
const tempRouter = require('./routes/temp');

app.use('/co', coRouter);
app.use('/no', noRouter);
app.use('/so', soRouter);
app.use('/pm2', pm2Router);
app.use('/pm10', pm10Router);
app.use('/ah', ahRouter);
app.use('/temp', tempRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

