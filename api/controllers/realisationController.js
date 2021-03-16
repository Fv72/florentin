/*
 * Import Module
 ****************/
const Realisation = require('../models/Realisation'),
    fs = require('fs'),
    path = require('path')

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
                res.render('realisationsID', {
                    success: 'Get OK !!!',

                    // DATA = RESULTAT DE LA FONCTION CI-DESSUS (TITRE ID ...) //
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
                content: b.content,

                // Formater le chemin de notre image pour la DB //
                imgRealisation: `/assets/images/${req.file.originalname}`,
                imgName: req.file.originalname

                // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            }, (err, data) => {
                if (err) console.log(err)

                // RENVOI SUITE A CREATION DE LA REALISATION A LA PAGE SUIVANTE : 
                res.redirect('/admin')
            })
    },

    // PUT //
    editOne: async(req, res) => {
        // Ici on déclare la récupération de notre articleID grace à notre recherche asynchrone filtrer avec notre req.params.id
        const dbRealisation = await Realisation.findById(req.params.id),
            // Ici on déclare le chemin de l'image qui devra etre supprimer
            pathImg = path.resolve("public/images/" + dbRealisation.imgName)

        const b = req.body

        // A COMMENTER !!! //
        console.log('EDITONE REALISATIONS PARAMS: ', req.params.id)
        console.log('EDITONE REALISATIONS Body: ', req.body)
        console.log('EDITONE REALISATIONS File: ', req.file)

        if (!req.file) {
            if (req.body.title) {
                // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT EDITER LA REALISATION //
                Realisation
                // RECHERCHE PAR ID ET MET A JOUR //
                    .findByIdAndUpdate(req.params.id, {
                    ...req.body,
                    // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER LA REALISATION //
                    // title: b.title, // replace with ...req.body
                    // content: b.content,  // replace with ...req.body
                }, (err, data) => {
                    // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
                    if (err) console.log(err)

                    // REDIRIGE SUITE A L'EDIT  DE LA REALISATION A LA PAGE SUIVANTE : 
                    res.redirect('/admin')
                })
            } else res.redirect('/admin')
        } else {
            // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT EDITER LA REALISATION //
            Realisation
            // RECHERCHE PAR ID ET MET A JOUR //
                .findByIdAndUpdate(req.params.id, {
                ...req.body,
                // Formater le chemin de notre image pour la DB //
                imgRealisation: `/assets/images/${req.file.originalname}`,
                imgName: req.file.originalname

            }, (err, data) => {
                // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
                if (err) console.log(err)

                // Ici est notre fonction de suppression du fichier (image) avec son callback
                fs.unlink(pathImg, (err) => {
                    if (err) console.log(err)
                    else {
                        fs.unlink(pathImg, (err) => {
                            if (err) console.log(err)
                            res.redirect('/admin')
                        })
                    }

                })
            })
        }

    },

    // Methods DELETE ONE
    deleteOne: async(req, res) => {
        console.log("Delete REALISATIONS: ", req.params.id)

        // Ici on déclare la récupération de notre articleID grace à notre recherche asynchrone filtrer avec notre req.params.id
        const dbRealisation = await Realisation.findById(req.params.id),
            // Ici on déclare le chemin de l'image qui devra etre supprimer
            pathImg = path.resolve("public/images/" + dbRealisation.imgName)



        // Ici nous avons une fonction de suppression de notre article filtrer grace à req.params.id (objet dans la DB)
        Realisation.deleteOne({ _id: req.params.id }, (err) => {
            // Ici notre callback verifie bien que notre fonction c'est passer sans erreur
            if (err) console.log(err)
                // Et si nous n'avons aucune erreur alors on execute ça

            // Ici est notre fonction de suppression du fichier (image) avec son callback
            fs.unlink(pathImg, (err) => {
                if (err) console.log(err)
                else {
                    fs.unlink(pathImg, (err) => {
                        if (err) console.log(err)
                        res.redirect('/admin')
                    })
                }

            })
        })
    },
}