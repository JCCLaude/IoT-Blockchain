const router = require('express').Router();
const Temp = require('../models/temp.model');

router.route('/').get((req, res) => {
  Temp.find()
    .then(temp => res.json(temp))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const tempval = req.body.tempval;
  const tempdate = req.body.tempdate;
  const tempgeo = req.body.tempgeo;

  const newTemp = new Temp({
    tempval,
    tempdate,
    tempgeo
  });

  newTemp.save()
    .then(() => res.json('Temperature added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;