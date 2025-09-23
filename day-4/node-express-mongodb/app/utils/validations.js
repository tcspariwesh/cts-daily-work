const db = require("../models");
const Tutorial = db.tutorials;

exports.checkDuplicateTitle = (title) => {
    console.log('duplicate');
    //db call
    Tutorial.findOne({ title: title }).exec((err, tutorial) => {
        if (err) {
            throw err;
        }
    });
}