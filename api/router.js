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
    realisationController = require('./controllers/realisationController')


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

// router.route('/admin')
//    .get(adminControllers.get) 



/***********
 * / Router
 */


// on export router pour le récupérer dans ../server.js
module.exports = router;