 /*
  *
  * Model de 'Realisation'
  ******************************/

 // Import de Mongoose

 const mongoose = require('mongoose')
 const Schema = mongoose.Schema
 const comment = require('./comment')

 // Création de notre Shéma (Model)
 // c'est le Model de (Model)
 const RealisationSchema = new mongoose.Schema({
     // Première variable (basique)
     title: String,
     content: String,
     comment: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment'
     }]
 })

 // EXPORT GRACE A LA PASSERELLE MONGOOSE DU MODEL CI-DESSUS DANS LE BUT 
 // DE SE SERVIR DE CELUI CI SUR D'AUTRES PAGES //
 module.exports = mongoose.model('Realisation', RealisationSchema)