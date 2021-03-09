const express = require('express')
const app = express()
const hbs = require('express-handlebars'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo');

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

// save session avec MongoDB
const mongoStore = MongoStore(expressSession)

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
    name: 'florentin',
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// EXPRESS STATIQUE //
app.use(express.static("public"))

// Body Parser qui nous permet de parser des data d'une req a une autre
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Router
const ROUTER = require('./api/router')
app.use('/', ROUTER)

// Lancement de notre application (app)
app.listen(port, function() {
    console.log(`Ecoute le port ${port}, lancé à : ${new Date().toLocaleString()}`);
})