var express = require('express');
var router = express.Router();
var creditcard_controller = require('./creditCardController');

router.post('/:id/createcreditCard', creditcard_controller.postNewCreditCard);
router.post('/:id/createshippingaddress', creditcard_controller.postNewShippingAddress);


export default router;
