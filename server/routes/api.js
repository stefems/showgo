const express = require('express');
const router = express.Router();

// Controllers
var apiGeneralController = require("./../../controllers/apiGeneralController");
var remindersController = require("./../../controllers/remindersController");


/* GET api listing. */
router.get('/events', apiGeneralController.getEvents);


module.exports = router;