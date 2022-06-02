const router = require('express').Router()
const { getPayment,  createPayment}= require('../controllers/paymentController')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')



router.route('/payment').get(auth,authAdmin,getPayment).post(auth,createPayment)


module.exports = router













