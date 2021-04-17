const router = require('express').Router();
const PM2 = require('../models/pm2.model');

router.route('/').get((req, res) => {
  PM2.find()
    .then(pm2 => res.json(pm2))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const pm2val = req.body.pm2val;
  const pm2date = req.body.pm2date;
  const pm2geo = req.body.pm2geo;

  const newPM2 = new PM2({
    pm2val,
    pm2date,
    pm2geo
  });

  newPM2.save()
    .then(() => res.json('PM2,5 added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;