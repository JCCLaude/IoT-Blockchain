const db = require("../models/co.model");
const coval = db.coval;

/*
exports.findOne = (req, res) => {
    await coval.find({}, (err, coval) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }s
        return res.status(200).json({ success: true, data: coval })
    }).catch(err => console.log(err))
};
*/

findbyId = async (req, res) => {
    await db.findOne({ _id: req.params.id }, (err, coval) => {
 if (err) {
 return res.status(400).json({ success: false, error: err })
        }

        if (!coval) {
            return res
                .status(404)
                .json({ success: false, error: "not found" })
        }
        return res.status(200).json({ success: true, data: coval })
    }).catch(err => console.log(err))
}

module.exports = {
    findbyId
} 