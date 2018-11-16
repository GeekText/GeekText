import express from 'express';
import homePageRoutes from './homePage/homePageRoutes';
import userRoutes from './user/userRoutes';
import signinPageRoutes from './signinPage/signinPageRoutes';
import accountPageRoutes from './accountPage/accountPageRoutes';
import creditCardRoutes from './creditCardInfo/creditCardRoutes';

/* Remember that a function in javascript is just an object. So we can attach
other properties on that object.
*/

const router = express.Router();

/* This would be like a Service Oriented Architecture Style */
router.use('/', homePageRoutes);
router.use('/user', userRoutes);
router.use('/account', accountPageRoutes);
router.use('/signin', signinPageRoutes);
router.use('/creditcard', creditCardRoutes);

export default router;
