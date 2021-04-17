const router = require('express').Router();
const SO2 = require('../models/so.model');

router.route('/').get((req, res) => {
  SO2.find()
    .then(so => res.json(so))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const soval = req.body.soval;
  const sodate = req.body.sodate;
  const sogeo = req.body.sogeo;

  const newSO2 = new SO2({
    soval,
    sodate,
    sogeo
  });

  newSO2.save()
    .then(() => res.json('SO2 added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;