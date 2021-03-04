/*
 * Import Module
 ****************/
const User = require('../models/User')


// GENERE UN LOGIN //

module.exports = {
    pageLogin: (req, res) => {
        res.render('login')

    },
    register: (req, res) => {
        if (req.body.password !== req.body.password2) {
            res.render('login', {
                error: 'Vos mots de passe ne correspondent pas !'
            })
        } else {
            User
                .create({
                    // RECHERCHE LA CONST POUR L'AUTH //
                    ...req.body
                    // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
                }, (err, data) => {
                    if (err) console.log(err)

                    // RENVOI SUITE A CREATION DE L'AUTH A LA PAGE SUIVANTE : 
                    // res.redirect('/login')
                    res.render('login', {
                        success: 'Register Completed, Congratulations !'
                    })
                })
        }

    },
    auth: (req, res) => {


        // if (console.log(req.body)) {
        //     console.log('Auth ok !')
        // } else {
        //     (!err)
        // }
    }

}