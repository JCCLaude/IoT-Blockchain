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

const ovRouter = require('./routes/ov');
const coRouter = require('./routes/co');
const noRouter = require('./routes/no');
const soRouter = require('./routes/so');
const pm2Router = require('./routes/pm2');
const pm10Router = require('./routes/pm10');
const ahRouter = require('./routes/ah');
const tempRouter = require('./routes/temp');

app.use('/ov', ovRouter);
app.use('/co', coRouter);
app.use('/no', noRouter);
app.use('/so', soRouter);
app.use('/pm2', pm2Router);
app.use('/pm10', pm10Router);
app.use('/ah', ahRouter);
app.use('/temp', tempRouter);

//var MongoClient = require('mongodb').MongoClient;
//var x = new Date('March 21, 2021 01:00:00');
//var y = new Date('March 21, 2021 04:00:00');
//var y = 1616295600;

/*MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("myFirstDatabase");
  var query = { codate: {$gte:x, $lte:y}};
  dbo.collection("co2").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
}); */

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

