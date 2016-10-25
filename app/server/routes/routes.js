var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller');

// GET request to /api
router.get('/', function(req, res, next) {
    res.send("Welcome to Mean2-Seed API.");    
});

// GET request to /api/helloworld
router.get('/helloworld', function(req, res, next) {
    res.send(controller.sayHello());    
});



module.exports = router;