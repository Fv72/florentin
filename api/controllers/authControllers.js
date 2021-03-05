/*
 * Import Module
 ****************/
const bcrypt = require('bcrypt')

/*
 * Models
 ********** */
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
    auth: async(req, res) => {
        // userAuth sera le résultat de notre recherche 'email: req.body.email' via le constructeur User
        let userAuth = await User.findOne({ email: req.body.email })

        if (!userAuth) {
            console.log('error')
            res.render('login', {
                error: "Ce compte n'existe pas"
            })
        } else {
            console.log('User exist')
            User
                .findOne({ email: req.body.email }, (err, data) => {
                    if (err) console.log(err)
                    if (!data) {
                        res.render('login', {
                            error: "Ce compte n'existe pas"
                        })
                    } else {
                        bcrypt.compare(req.body.password, data.password, (error, same) => {
                            if (error) console.log(error)
                            if (!same) {
                                res.render('login', {
                                    error: "une erreur est survenue !"
                                })
                            } else {
                                // Redirection vers home.hbs
                                res.render('login', {
                                    success: "vous etes connecté au nom de: " + data.name
                                })
                            }
                        })
                    }


                })
        }

    }

}