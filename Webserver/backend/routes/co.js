const router = require("express").Router();
const CO2 = require("../models/co.model");
const CO2controller = require("../controller/co.controller");

router.route("/").get((req, res) => {
  CO2.find()
    .then((co) => res.json(co))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const coval = req.body.coval;
  const codate = req.body.codate;
  const cogeo = req.body.cogeo;

  const newCO = new CO2({
    coval,
    codate,
    cogeo,
  });

  newCO
    .save()
    .then(() => res.json("CO2 added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//router.get('/co', CO2controller.getID)
// router.get('/co', async (req, res) =>
/*
  try{
  const co2 = await CO2.findById(req.params.codate);
  res.json(co2);
}catch(err){}
});*/

module.exports = router;
