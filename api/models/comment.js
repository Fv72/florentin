 /*
  *
  * Model de 'Commentaire'
  ******************************/

 // Import de Mongoose
 const mongoose = require('mongoose')

 // Création de notre Shéma (Model)
 // c'est le Model de (Model)
 const CommentSchema = new mongoose.Schema({

     // Première variable (basique)
     author: String,
     authorID: String,
     content: String,
     refID: String

 })

 // Et l'on export notre model grace à la passerelle Mongoose
 // Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
 module.exports = mongoose.model('Comment', CommentSchema)