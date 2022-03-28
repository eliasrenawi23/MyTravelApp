export { }
const express = require('express');
const router = express.Router();
const TravelController = require('../controllers/TravelController');


router.
    route('/AddNewTravel').
    post(TravelController.AddNewTravel);

router.
    route('/getTravelData').
    get(TravelController.getTravelData);

module.exports = router;