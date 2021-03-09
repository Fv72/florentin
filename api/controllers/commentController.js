/*
 * Import Module
 ****************/
const Comment = require('../models/comment')
const Realisation = require('../models/Realisation')


module.exports = {

    // RECUPERE LES COMMENTAIRES //
    // comment: (req, res) => {

    //     comment
    //         .find()
    //         .lean()
    //         .exec((err, data) => {
    //             if (err) console.log(err)
    //             console.log(data)
    //             res.render('home', {
    //                 success: 'Success Get !',
    //                 dbComment: data
    //             })

    //         })
    // },

    // GENERE UN ID //
    // getID: (req, res) => {

    //     // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT CREER LE COMMENTAIRE PAR ID //
    //     comment
    //         .findById(req.params.id)
    //         .exec((err, data) => {
    //             if (err) console.log(err)

    //             res.json({
    //                 success: 'Success get ID !',
    //                 dbComment: data
    //             })
    //         })
    // },


    create: async(req, res) => {
        console.log('cONTROLLER COMMENTAIRE ok !')
        console.log(req.body)

        const realisation = await Realisation.findById(req.params.id)

        const comment = new Comment({
            title: req.body.title,
            author: req.body.author,
            refID: realisation._id
        })

        // PUSH DU COMMENTAIRE //
        realisation.comment.push(comment._id)

        // effectue une save du commentaire //
        comment.save((err) => {
            if (err) return handleError(err)
        })

        // effectue une save de la réalisation //
        realisation.save((err) => {
            if (err) return handleError(err)
        })


        res.redirect(`/realisation/${realisation._id}`)
    },

    // // EDITONE NOUS PERMET D'EDITER UN COMMENTAIRE  QU'ON A CREE ET DE LE MODIFIER // 
    // editOne: (req, res) => {

    //     // RENVOIE VERS LA PAGE DANS LAQUELLE ON VEUT EDITER LE COMMENTAIRE //
    //     comment

    //     //  RECHERCHE PAR ID ET MET A JOUR //
    //         .findByIdAndUpdate(req.params.id, {

    //         // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER LE COMMENTAIRE //
    //         title: req.body.title
    //     }, (err, data) => {

    //         // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
    //         if (err) console.log(err)

    //         // REDIRIGE SUITE A L'EDIT  DU COMMENTAIRE A LA PAGE SUIVANTE : 
    //         res.redirect('comment/:id')
    //     })
    // },

    // DELETEONE PERMET DE SUPPRIMER UN COMMENTAIRE //
    deleteOne: (req, res) => {

        // FONCTION DE SUPPRESSION D'UN COMMENTAIRE PAR ID //
        Comment

        // RECHERCHE PAR ID ET SUPPRIME //
            .findByIdAndDelete(req.params.id)

        // EXECUTE LA COMMANDE DELETE //
        .exec((err, data) => {
            console.log(data)
                // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            if (err) console.log(err)

            // REDIRIGE SUITE A SUPPRESSION DU COMMENTAIRE VIE LA FONCTION $ ET UNE CHAINE DE CARRACTERES :
            res.redirect('/realisation/' + data.refID)
        })
    }
}