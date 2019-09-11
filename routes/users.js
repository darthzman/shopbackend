const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const { body } = require('express-validator');
const passportJWT = require('../midlewares/passportJWT');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//localhost:3000/api/user/register
router.post('/register', 
[
    body('name').not().isEmpty().withMessage('Please input name'), 
    body('email').not().isEmpty().withMessage('Please input email').isEmail().withMessage('wrong email format'), 
    body('password').not().isEmpty().withMessage('Please input password').isLength({min: 3}).withMessage('Password is more then 3 charector')
],
userController.register);

router.post('/login', userController.login);
router.get('/me', passportJWT.isLogin, userController.me);

module.exports = router;
