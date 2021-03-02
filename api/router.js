/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router(),
    path = require('path')

/*
 * Controller
 *************/
const homeController = require('./controllers/homeController'),
    realisationController = require('./controllers/realisationController'),
    commentController = require('./controllers/commentController'),
    adminController = require('./controllers/adminControllers'),
    messageController = require('./controllers/messageController'),
    contactController = require('./controllers/contactController')


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

router.route('/message')
    .post(messageController.create)


router.route('/messageId/:id')
    .get(messageController.getID)
    .delete(messageController.deleteOne)

router.route('/contact')
    .post(contactController.post)

// router.route('/user')
//     .get(userControllers.get)
//     .post(userControllers.create)
//     .put(userControllers.put)
//     .deleteOne(userControllers.deleteOne)


// router.route('/realisation/:id/comment')
//     .get(commentControllers.get)
//     .post(commentControllers.post)
//     .put(commentControllers.put)
//     .deleteOne(commentControllers.deleteOne)


// router.route('message')
//     .get(messageControllers.get)
//     .post(messageControllers.post)
//     .put(messageControllers.put)
//     .deleteOne(messageControllers.deleteOne)

router.route('/admin')
    .get(adminController.get)



/***********
 * / Router
 */


// on exporte router pour le récupérer dans ../server.js
module.exports = router;