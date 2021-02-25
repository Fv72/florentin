/*
 * Import Module
 ****************/
const Realisation = require('../models/Realisation')

module.exports = {
    recuperationDesRealisations: (req, res) => {
        Realisation
            .find()
            .lean()
            .exec((err, data) => {
                if (err) console.log(err)
                res.render('home', {
                        success: 'Success Get !',
                        dbRealisation: data
                    })
                    // res.json({
                    //     success: 'Success Get !',
                    //     dbRealisation: data
                    // })
            })
    },
    getID: (req, res) => {
        Realisation
            .findById(req.params.id)
            .exec((err, data) => {
                if (err) console.log(err)

                res.json({
                    success: 'Success get ID !',
                    dbRealisation: data
                })
            })
    },
    create: (req, res) => {
        Realisation
            .create({
                title: req.body.title
            }, (err, dataPrim) => {
                if (err) console.log(err)

                res.redirect('/realisation')
            })
    },
    editOne: (req, res) => {
        Realisation
            .findByIdAndUpdate(req.params.id, {
                title: req.body.title
            }, (err, data) => {
                if (err) console.log(err)
                res.redirect('/realisation')
            })
    },
    deleteOne: (req, res) => {
        Realisation
            .findByIdAndDelete(req.params.id)
            .exec((err, data) => {
                if (err) console.log(err)
                res.redirect('/realisation')
            })
    }
}