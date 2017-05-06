const express = require('express');
const router = express.Router();

// Controllers
var userController = require("./../../controllers/userController");

/* GET api listing. */
router.get('/', userController.index);


module.exports = router;