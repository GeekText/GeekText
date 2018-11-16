import express from 'express';
const router = express.Router();
var account_controller = require('./accountPageController');


// THE ENDPOINTS TAG ON TO THIS 'http://localhost:8080/account/'

router.param('id', account_controller.params);

router.get('/', account_controller.displayAccountPage);
router.get('/:id', account_controller.getUserData);
router.put('/:id/login', account_controller.updateUserLoginInfo);

export default router;
