/*
 * Import Module
 ****************/
const Message = require('../models/message')

module.exports = {

    // RECUPERE LES MESSAGES //
    message: (req, res) => {

        Message
            .find()
            .lean()
            .exec((err, data) => {
                if (err) console.log(err)
                    // res.render('home', {
                    //         success: 'Success Get !',
                    //         dbComment: data
                    //     })
                res.json({
                    success: 'Success Get !',
                    dbmessage: data
                })
            })
    },

    // GENERE UN ID //
    getID: (req, res) => {

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT CREER L'ARTICLE PAR ID //
        message
            .findById(req.params.id)
            .exec((err, data) => {
                if (err) console.log(err)

                res.json({
                    success: 'Success get ID !',
                    dbmessage: datamessage
                })
            })
    },


    create: (req, res) => {
        console.log(req.body)
        Message
            .create({
                // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER L'ARTICLE //
                title: req.body.title,
                content: req.body.content

                // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            }, (err, dataPrim) => {
                if (err) console.log(err)

                // RENVOIE SUITE A CREATION DE L'ARTICLE A LA PAGE SUIVANTE : 
                res.redirect('/admin')
            })
    },

    // EDITONE NOUS PERMET D'EDITER UN ARTICLE QU'ON A CREE ET DE LE MODIFIER // 
    editOne: (req, res) => {

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT EDITER L'ARTICLE //
        Message

        //  RECHERCHE PAR ID ET MET A JOUR //
            .findByIdAndUpdate(req.params.id, {

            // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER L'ARTICLE //
            title: req.body.title,
            content: req.body.content,
        }, (err, data) => {

            // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            if (err) console.log(err)

            // REDIRIGE SUITE A L'EDIT DU MESSAGE A LA PAGE SUIVANTE : 
            res.redirect('/')
        })
    },

    // DELETEONE PERMET DE SUPPRIMER UN MESSAGE //
    deleteOne: (req, res) => {

        // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT SUPPRIMER LE MESSAGE //      
        Message
        // RECHERCHE PAR ID ET SUPPRIME //
            .deleteOne({ _id: req.params.id }, (err) => {

            if (err) res.send(err)

            res.redirect('/admin')

        })


    }
}