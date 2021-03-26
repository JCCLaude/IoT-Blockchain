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

const ovRouter = require('./routes/ov');
const coRouter = require('./routes/co');
const noRouter = require('./routes/no');
const chRouter = require('./routes/ch');

app.use('/ov', ovRouter);
app.use('/co', coRouter);
app.use('/no', noRouter);
app.use('/ch', chRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
