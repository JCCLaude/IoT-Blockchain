const router = require('express').Router();
const AH = require('../models/ah.model');

router.route('/').get((req, res) => {
  AH.find()
    .then(ah => res.json(ah))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const ahval = req.body.ahval;
  const ahdate = req.body.ahdate;
  const ahgeo = req.body.ahgeo;

  const newAH = new AH({
    ahval,
    ahdate,
    ahgeo
  });

  newAH.save()
    .then(() => res.json('Air Humidity added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;