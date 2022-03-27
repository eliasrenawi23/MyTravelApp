export { }
const express = require('express');
const router = express.Router();
const TravelController = require('../controllers/TravelController');


router.
    route('/AddNewTravel').
    get(TravelController.AddNewTravel);

module.exports = router;