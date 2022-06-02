const router = require('express').Router();
const {register,refreshToken,login,logout,getUser,addCart,history}= require('../controllers/userController')
const auth = require('../middlewares/auth')

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/refresh_token',refreshToken)
router.get('/info',auth,getUser)
router.patch('/addcart',auth,addCart)
router.get('/history',auth,history)

module.exports= router