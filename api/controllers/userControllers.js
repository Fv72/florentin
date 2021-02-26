module.exports = {
    get: (req, res) => {
        res.render('home')
    }
}
const User = require('../models/user')

module.exports = {

    // RECUPERE LES REALISATIONS //
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
                    // res.json({
                    //     success: 'Success Get !',
                    //     dbRealisation: data
                    // })
            })
    },

    // GENERE UN ID //
    getID: (req, res) => {

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT CREER L'ARTICLE PAR ID //
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

    // LE CREATE NOUS PERMET DE CREER UN NOUVEL ARTICLE //
    create: (req, res) => {

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT CREER L'ARTICLE //
        User
            .create({
                // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER L'ARTICLE //
                title: req.body.title

                // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            }, (err, dataPrim) => {
                if (err) console.log(err)

                // RENVOIE SUITE A CREATION DE L'ARTICLE A LA PAGE SUIVANTE : 
                res.redirect('/user')
            })
    },

    // EDITONE NOUS PERMET D'EDITER UN ARTICLE QU'ON A CREE ET DE LE MODIFIER // 
    editOne: (req, res) => {

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT EDITER L'ARTICLE //
        User

        //  RECHERCHE PAR ID ET MET A JOUR //
            .findByIdAndUpdate(req.params.id, {

            // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER L'ARTICLE //
            title: req.body.title
        }, (err, data) => {

            // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            if (err) console.log(err)

            // REDIRIGE SUITE A L'EDIT  DE L'ARTICLE A LA PAGE SUIVANTE : 
            res.redirect('/user')
        })
    },

    // DELETEONE PERMET DE SUPPRIMER UN ARTICLE //
    deleteOne: (req, res) => {

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT SUPPRIMER L'ARTICLE //
        User

        // RECHERCHE PAR ID ET SUPPRIME //
            .findByIdAndDelete(req.params.id)

        // EXECUTE LA COMMANDE DELETE //
        .exec((err, data) => {

            // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            if (err) console.log(err)

            // REDIRIGE SUITE A SUPPRESSION DE L'ARTICLE A LA PAGE SUIVANTE :
            res.redirect('/user')
        })
    }
}