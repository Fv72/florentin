/*
 * Import constantes
 ****************/
const Realisation = require('../models/Realisation')
const Message = require('../models/message')
const User = require('../models/User')

module.exports = {

    get: async(req, res) => {

        // Definition de la recuperation de nos datas via un array //
        const dbRealisation = await Realisation.find().lean()
        const dbMessage = await Message.find().lean()
        const dbUser = await User.find().lean()

        // Renvoie de la page admin avec layout provenant de la DB //
        res.render('admin', {
            layout: 'admin',
            dbRealisation: dbRealisation,
            dbMessage: dbMessage,
            dbUser: dbUser,

        })

    },


}