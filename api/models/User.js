 /*
  *
  * Model de 'USER'
  ******************************/

 // Import de Mongoose
 const mongoose = require('mongoose')
 const bcrypt = require('bcrypt')

 // Création de notre Shéma (Model)
 // c'est le Model de (Model)
 const UserSchema = new mongoose.Schema({
     // Première variable (basique)
     title: String,
     name: String,
     firstname: String,

     password: {
         type: String
     },
     email: {
         type: String,
         required: true
     },

     firstname: {
         type: String,
         required: true
     },

     lastname: {
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
     },

     isVerified: {
         type: Boolean,
         default: false
     }


 })

 // Securisation via le middlware du hachage // 
 UserSchema.pre('save', function(next) {

     // HACHAGE DU MOT DE PASSE //
     const user = this
     bcrypt.hash(user.password, 10, (err, encrypted) => {
         user.password = encrypted
         next()

     })
 })

 // Et l'on export notre model grace à la passerelle Mongoose
 // Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
 module.exports = mongoose.model('User', UserSchema)