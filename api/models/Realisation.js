 /*
  *
  * Model de 'Realisation'
  ******************************/

 // Import de Mongoose
 const mongoose = require('mongoose')

 const Comment = require('./comment')

 // Création de notre Shéma (Model)
 // c'est le Model de (Model)
 const RealisationSchema = new mongoose.Schema({
     // Première variable (basique)
     title: String,
     comment: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment'
     }]
 })

 // Et l'on export notre model grace à la passerelle Mongoose
 // Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
 module.exports = mongoose.model('Realisation', RealisationSchema)