const Realisation = require('../models/Realisation')

module.exports = {
    get: (req, res) => {
        Realisation
            .find()
            .lean()
            .exec((err, data) => {
                if (err) console.log(err)
                res.render('home', {
                    dbRealisation: data
                })
            })
    }
}