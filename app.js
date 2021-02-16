const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')


// USER //

const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')
const app = express()

app.listen(3002, function() {
    console.log("Server 3000");
});