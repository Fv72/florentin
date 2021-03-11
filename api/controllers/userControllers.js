const User = require('../models/User')


module.exports = {

    // Method Put
    editOne: (req, res) => {
        let boolAdmin = false
        let boolVerified = false
        let boolBan = false

        if (req.body.isAdmin === 'on') boolAdmin = true;
        if (req.body.isBan === 'on') boolBan = true;
        if (req.body.isVerified === 'on') boolVerified = true;
        console.log(req.body)
        User
            .findByIdAndUpdate(req.params.id, {
                isAdmin: boolAdmin,
                isVerified: boolVerified,
                isBan: boolBan,
            }, (err, data) => {
                if (err) console.log(err)
                res.redirect('/admin')
            })
    },
    // DELETEONE PERMET DE SUPPRIMER UN USER  //
    deleteOne: (req, res) => {

            // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT SUPPRIMER L USER  //
            User

            // RECHERCHE PAR ID ET SUPPRIME //
                .findByIdAndDelete(req.params.id)

            // EXECUTE LA COMMANDE DELETE //
            .exec((err, data) => {

                // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
                if (err) console.log(err)

                // REDIRIGE SUITE A SUPPRESSION DE L USER A LA PAGE SUIVANTE :
                res.redirect('/admin')
            })
        }
        // // RECUPERE LES USERS//
        // recuperationUser: (req, res) => {

    //     User
    //         .find()
    //         .lean()
    //         .exec((err, data) => {
    //             if (err) console.log(err)
    //             res.render('home', {
    //                 success: 'Success Get !',
    //                 dbUser: data
    //             })

    //         })
    // },

    // // GENERE UN ID //
    // getID: (req, res) => {

    //     // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT CREER L'USER //
    //     User
    //         .findById(req.params.id)
    //         .exec((err, data) => {
    //             if (err) console.log(err)

    //             res.json({
    //                 success: 'Success get ID !',
    //                 dbRealisation: data
    //             })
    //         })
    // },

    // // LE CREATE NOUS PERMET DE CREER UN NOUVEL USER  //
    // create: (req, res) => {

    //     // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT CREER L USER  //
    //     User
    //         .create({
    //             // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER L USER  //
    //             title: req.body.title

    //             // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
    //         }, (err, dataPrim) => {
    //             if (err) console.log(err)

    //             // RENVOIE SUITE A CREATION DE L USER  A LA PAGE SUIVANTE : 
    //             res.redirect('/user')
    //         })
    // },

    // EDITONE NOUS PERMET D'EDITER UN USER // 




}