const router = require('express').Router();
const PM10 = require('../models/pm10.model');

router.route('/').get((req, res) => {
  PM10.find()
    .then(pm10 => res.json(pm10))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const pm10val = req.body.pm10val;
  const pm10date = req.body.pm10date;
  const pm10geo = req.body.pm10geo;

  const newPM10 = new PM10({
    pm10val,
    pm10date,
    pm10geo
  });

  newPM10.save()
    .then(() => res.json('PM10 added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;