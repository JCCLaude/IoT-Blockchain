const router = require('express').Router();
const CH4 = require('../models/ch.model');

router.route('/').get((req, res) => {
  CH4.find()
    .then(ch => res.json(ch))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const chval = req.body.chval;
  const chdate = req.body.chdate;

  const newCH = new CH4({
    chval,
    chdate
  });

  newCH.save()
    .then(() => res.json('CH4 added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;