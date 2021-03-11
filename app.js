const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const expressSession = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo').default
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = 4000


// Module .env
require('dotenv').config()

// Method Override
app.use(methodOverride('_method'))

// Connexio a notre DB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(res => console.log('MongoDB: connection success !!'))
    .catch(err => console.log(err))



// HELPERS LIMITARRAY //
const { limitArray } = require('./api/helpers/hbs')

// Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    adminLayout: 'adminLayout',
    helpers: {
        limit: limitArray
    }
}));

// Express - session
app.use(expressSession({
    secret: 'securite',
    name: 'cookie-sess',
    saveUninitialized: true,
    resave: false,

    // Permet de stocker notre session dans la db
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}));

// EXPRESS STATIQUE //
app.use(express.static("public"))

// Body Parser qui nous permet de parser des data d'une req a une autre
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Déclaration de middleware (Session)
app.use('*', (req, res, next) => {

    // Déclaration et utilisation de la session via la DB
    res.locals.userId = req.session.userId;
    res.locals.user = req.session.user;
    console.log('MIddleware Session: ', req.session)
    if (req.session.isAdmin) res.locals.admin = req.session.isAdmin
    next()

})

// Router
const ROUTER = require('./api/router')
app.use('/', ROUTER)


// Lancement de notre application (app)
app.listen(port, function() {
    console.log(`Ecoute le port ${port}, lancé à : ${new Date().toLocaleString()}`);
})