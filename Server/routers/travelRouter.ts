export { }
const express = require('express');
const router = express.Router();
const TravelController = require('../controllers/TravelController');


router.
    route('/AddNewTravel').
    post(TravelController.AddNewTravel);

router.
    route('/getAllTravelsData').
    get(TravelController.getAllTravelsData);

module.exports = router;