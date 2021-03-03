 /*
  *
  * Model de 'USER'
  ******************************/

 // Import de Mongoose
 const mongoose = require('mongoose')

 // Création de notre Shéma (Model)
 // c'est le Model de (Model)
 const UserSchema = new mongoose.Schema({
     // Première variable (basique)
     title: String,
     name: String,
     firstname: String,
     gender: {
         type: String,
         default: 'Non précisé'
     },
     password: {
         type: String
     },
     email: {
         type: String,
         required: true
     },
     isAdmin: {
         type: Boolean,
         default: false
     },
     isBan: {
         type: Boolean,
         default: false
     }

 })

 // Et l'on export notre model grace à la passerelle Mongoose
 // Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
 module.exports = mongoose.model('User', UserSchema)