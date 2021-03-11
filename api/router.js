/*
 * Import Module
 ****************/
const express = require('express'),

    router = express.Router(),
    path = require('path')



/*
 * Middlware
 *************/

const auth = require('./middlewares/auth')

/*
 * Controller
 *************/
const homeController = require('./controllers/homeController'),
    realisationController = require('./controllers/realisationController'),
    commentController = require('./controllers/commentController'),
    adminController = require('./controllers/adminControllers'),
    messageController = require('./controllers/messageController'),
    contactController = require('./controllers/contactController'),
    authControllers = require('./controllers/authControllers');
const userControllers = require('./controllers/userControllers');



/*
 * Router
 ***********/

// Home

router.route('/')
    .get(homeController.get)

router.route('/realisation')
    .get(realisationController.recuperationDesRealisations)
    .post(realisationController.create)

router.route('/realisation/:id')
    .get(realisationController.getID)
    .put(realisationController.editOne)
    .delete(realisationController.deleteOne)

router.route('/comment/:id')
    .post(commentController.create)
    .delete(commentController.deleteOne)

router.route('/message')
    .post(messageController.create)

router.route('/messageId/:id')
    .get(messageController.getID)
    .delete(messageController.deleteOne)

router.route('/contact')
    .post(contactController.post)

router.route('/login')
    .get(authControllers.pageLogin)

router.route('/login/register')
    .post(authControllers.register)

router.route('/logout')
    .get(authControllers.logout)

router.route('/login/auth')
    .post(authControllers.auth)

router.route('/admin')
    .get(adminController.get)

router.route('/user/:id')
    .put(userControllers.editOne)
    .delete(userControllers.deleteOne)





/***********
 * / Router
 */


// on exporte router pour le récupérer dans ../server.js
module.exports = router;