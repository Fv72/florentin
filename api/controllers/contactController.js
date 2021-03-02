/*
 * Import Module
 ****************/
const Message = require('../models/message')

module.exports = {
    post: (req, res) => {

        Message
            .create({
                // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER LE MESSAGE  //
                ...req.body,
                destinataire: "florentin.victor72@gmail.com"


                // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
            }, (err, dataPrim) => {
                if (err) console.log(err)

                // RENVOIE SUITE A CREATION DU MESSAGE A LA PAGE SUIVANTE : 
                res.redirect('/')
            })
    }
}