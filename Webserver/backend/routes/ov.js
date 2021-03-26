const router = require('express').Router();
const Overview = require('../models/ov.model');

router.route('/').get((req, res) => {
  Overview.find()
    .then(ov => res.json(ov))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const ovval = req.body.coval;

  const newOverview = new Overview({
    ovval
  });

  newOverview.save()
    .then(() => res.json('Overview added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;