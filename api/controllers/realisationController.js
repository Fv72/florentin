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
                res.render('realisations', {
                    dbRealisation: data,

                    // FONCTION PERMETANT DE RECHERCHE UN ITEM DANS LA DB DANS LES REALISATIONS //
                    search: 'input'
                })
            })
    },

    // GENERE UN ID //
    getID: (req, res) => {

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT CREER LA REALISATION PAR ID //
        Realisation
            .findById(req.params.id)
            .populate('comment')
            .lean()
            .exec((err, data) => {
                if (err) console.log(err)
                console.log(data)
                res.render('realisationID', {
                    success: 'Get OK !!!',
                    realisationID: data
                })

            })
    },

    // LE CREATE NOUS PERMET DE CREER UN NOUVELE REALISATION  //
    create: (req, res) => {

        console.log('Controller create Realisation')

        // CONSOLE LOG DES DATAS //
        console.log(req.body)

        // VARIABLE DEFINIE ET MODIFIABLE COMME ON VEUT //
        const b = req.body

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT CREER LA REALISATION //
        Realisation
            .create({
                // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER LA REALISATION //
                title: b.title,
                content: b.content

                // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            }, (err, data) => {
                if (err) console.log(err)

                // RENVOI SUITE A CREATION DE LA REALISATION A LA PAGE SUIVANTE : 
                res.redirect('/admin')
            })
    },

    // PUT //
    editOne: (req, res) => {
        const b = req.body

        // A COMMENTER !!! //
        console.log('EDITONE REALISATIONS BODY: ', b)
        console.log('EDITONE REALISATIONS PARAMS: ', req.params.id)

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT EDITER LA REALISATION //
        Realisation
        // RECHERCHE PAR ID ET MET A JOUR //
            .findByIdAndUpdate(req.params.id, {
            ...req.body,
            // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER LA REALISATION //
            title: b.title,
            content: b.content,
        }, (err, data) => {

            // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            if (err) console.log(err)

            // REDIRIGE SUITE A L'EDIT  DE LA REALISATION A LA PAGE SUIVANTE : 
            res.redirect('/admin')
        })
    },

    // Method delete one 
    deleteOne: (req, res) => {
        // consolog.log("Delete REALISATIONS: ", req.params.id)
        Realisation
            .deleteOne({

                // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
                _id: req.params.id

            }, (err) => {
                // Si nous avons pas d'erreur alors on redirige
                if (err) console.log(err)
                    // Sinon on renvoit l'err

                // RES.JSON = pour les tests unitaires // 

                // res.json({
                // succes: req.params.id + '// à bien été supprimer'
                // })
                res.redirect('/admin')
            })
    },
}