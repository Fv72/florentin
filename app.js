const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Handlebars = require("handlebars")
const bodyParser = require('body-parser')
const app = express()
const port = 4000
app.listen(port, function() {
    console.log(`Ecoute le port ${port}, lancé à : ${new Date().toLocaleString()}`);
})