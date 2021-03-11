module.exports = {
    get: (req, res) => {
        res.render('home')
    }
}
const User = require('../models/User')


module.exports = {

    // RECUPERE LES USERS//
    recuperationUser: (req, res) => {

        User
            .find()
            .lean()
            .exec((err, data) => {
                if (err) console.log(err)
                res.render('home', {
                    success: 'Success Get !',
                    dbUser: data
                })

            })
    },

    // GENERE UN ID //
    getID: (req, res) => {

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT CREER L'USER //
        User
            .findById(req.params.id)
            .exec((err, data) => {
                if (err) console.log(err)

                res.json({
                    success: 'Success get ID !',
                    dbRealisation: data
                })
            })
    },

    // LE CREATE NOUS PERMET DE CREER UN NOUVEL USER  //
    create: (req, res) => {

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT CREER L USER  //
        User
            .create({
                // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER L USER  //
                title: req.body.title

                // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            }, (err, dataPrim) => {
                if (err) console.log(err)

                // RENVOIE SUITE A CREATION DE L USER  A LA PAGE SUIVANTE : 
                res.redirect('/user')
            })
    },

    // EDITONE NOUS PERMET D'EDITER UN USER // 
    editOne: (req, res) => {

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT EDITER L USER  //
        User

        //  RECHERCHE PAR ID ET MET A JOUR //
            .findByIdAndUpdate(req.params.id, {

            // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER L USER  //
            title: req.body.title
        }, (err, data) => {

            // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            if (err) console.log(err)

            // REDIRIGE SUITE A L'EDIT  DE L USER A LA PAGE SUIVANTE : 
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
}