const express = require('express');
const router = express.Router();

// Controllers
var apiGeneralController = require("./../../controllers/apiGeneralController");
var userController = require("./../../controllers/userController");
var remindersController = require("./../../controllers/remindersController");

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


/* GET api listing. */
router.get('/events', apiGeneralController.getEvents);

router.get('/getUser/:fbId/:access_token', userController.getUser);
router.post('/eventAction/:actionType/:eventId/:userId', apiGeneralController.eventPost);
router.delete('/eventAction/:actionType/:eventId/:userId', apiGeneralController.eventDelete);

router.post('/join/:eventId/:user_id', apiGeneralController.postJoin);
router.post('/interested/:eventId/:access_token', apiGeneralController.postInterested);
router.post('/decline/:eventId/:access_token', apiGeneralController.postDecline);

module.exports = router;