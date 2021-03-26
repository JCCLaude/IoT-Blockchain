const router = require('express').Router();
let NO2 = require('../models/no.model');

router.route('/').get((req, res) => {
  NO2.find()
    .then(no => res.json(no))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const noval = req.body.noval;
  const nodate = req.body.nodate;

  const newNO = new NO2({ 
    noval,
    nodate
  });

  newNO.save()
  .then(() => res.json('NO2 added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  NO2.findById(req.params.id)
    .then(no => res.json(no))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  NO2.findByIdAndDelete(req.params.id)
    .then(() => res.json('NO2 deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  NO2.findById(req.params.id)
    .then(exercise => {
      no.noval = req.body.noval;
      
      NO2.save()
        .then(() => res.json('NO2 updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;