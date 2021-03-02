 /*
  *
  * Model de 'Message'
  ******************************/

 // Import de Mongoose
 const mongoose = require('mongoose')


 // Création de notre Shéma (Model)
 // c'est le Model de (Model)

 const messageSchema = new mongoose.Schema({

     // Première variable (basique)
     destinataire: String,
     title: String,
     objet: String,
     content: String,
     lastname: String,
     firstname: String,
     mail: String,

 })

 // Et l'on export notre model grace à la passerelle Mongoose
 // Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
 module.exports = mongoose.model('message', messageSchema)