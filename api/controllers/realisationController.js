/*
 * Import Module
 ****************/
const Realisation = require('../models/Realisation')

module.exports = {

    // RECUPERE LES REALISATIONS //
    recuperationDesRealisations: (req, res) => {

        Realisation
            .find()
            .lean()
            .exec((err, data) => {
                if (err) console.log(err)
                    // res.render('home', {
                    //         success: 'Success Get !',
                    //         dbRealisation: data
                    //     })
                res.json({
                    success: 'Success Get !',
                    dbRealisation: data
                })
            })
    },

    // GENERE UN ID //
    getID: (req, res) => {

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT CREER LA REALISATION PAR ID //
        Realisation
            .findById(req.params.id)
            .populate('comment')
            .exec((err, data) => {
                if (err) console.log(err)

                res.json({
                    success: 'Success get ID !',
                    dbRealisation: data
                })
            })
    },

    // LE CREATE NOUS PERMET DE CREER UN NOUVELE REALIATION  //
    create: (req, res) => {

        console.log('Controller create Realisation')

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT CREER LA REALISATION //
        Realisation
            .create({
                // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER LA REALISATION //
                title: req.body.title,
                content: req.body.content

                // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            }, (err, dataPrim) => {
                if (err) console.log(err)

                // RENVOIE SUITE A CREATION DE LA REALISATION A LA PAGE SUIVANTE : 
                res.redirect('/admin')
            })
    },

    // EDITONE NOUS PERMET D'EDITER UNE REALIATION  QU'ON A CREE ET DE LE MODIFIER // 
    editOne: (req, res) => {


        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT EDITER LA REALISATION //
        Realisation
        //  RECHERCHE PAR ID ET MET A JOUR //
            .findByIdAndUpdate(req.params.id, {

            // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER LA REALISATION //
            title: req.body.title,
            content: req.body.content
        }, (err, data) => {

            // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            if (err) console.log(err)

            // REDIRIGE SUITE A L'EDIT  DE LA REALISATION A LA PAGE SUIVANTE : 
            res.redirect('/admin')
        })
    },

    // DELETEONE PERMET DE SUPPRIMER UNE REALIATION  //
    deleteOne: (req, res) => {

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT SUPPRIMER LA REALISATION //
        Realisation

        // RECHERCHE PAR ID ET SUPPRIME //
            .findByIdAndDelete(req.params.id)

        // EXECUTE LA COMMANDE DELETE //
        .exec((err, data) => {

            // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            if (err) console.log(err)

            // REDIRIGE SUITE A SUPPRESSION DE LA REALISATION A LA PAGE SUIVANTE :
            res.redirect('/admin')
        })
    }
}