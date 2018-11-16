import express from 'express';
const router = express.Router();
var user_controller = require('../api/user/userController');
// ************** CAN BE USED FOR LATER AUTHENTICATION **************
var authController = require('./auth');
var controller = require('./controller');

/*
When ever they hit this route they will want to either
  1. Sign In        2. Create an Account
So lets display the form page where they can then decide
  */
router.get('/signin', function(req,res){
  res.render('index', {
    content: 'Loading Sign In Page'
  });
});

router.post('/newcreateaccount', user_controller.post_NewCreateAccountUSER);
// router.put('/newcreateaccount', user_controller.put_UpdateNewUSER)
// axios.put('/auth/newcreateaccount');

// ************** CAN BE USED FOR LATER AUTHENTICATION **************
/* Before we send back a jwt, lets check the password and username match
 what is in the DB */
 router.post('/signin', user_controller.login);
// router.post('/signin', authController.verifyUser(), controller.signin);

export default router;