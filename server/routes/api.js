const express = require('express');
const router = express.Router();

// Controllers
var apiGeneralController = require("./../../controllers/apiGeneralController");
var remindersController = require("./../../controllers/remindersController");


/* GET api listing. */
router.get('/', apiGeneralController.index);
router.get('/index', apiGeneralController.index);
router.get('/home', apiGeneralController.index);

router.get("/reminders", remindersController.index);

router.get("*", remindersController.index);


module.exports = router;