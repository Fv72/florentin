const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Handlebars = require("handlebars")
const bodyParser = require('body-parser')
const port = 4000
const app = express()


// EXPRESS STATIQUE //

app.use(express.static("public"))

app.listen(port, function() {
    console.log(`Ecoute le port ${port}, lancé à : ${new Date().toLocaleString()}`);
})