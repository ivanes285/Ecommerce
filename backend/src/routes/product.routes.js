const router = require('express').Router();
const { getProducts,createProduct,deleteProduct,updateProduct}= require('../controllers/productController')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')

router.route('/products').get(getProducts).post(createProduct)



router.route('/products/:id').delete(deleteProduct).put(updateProduct)





module.exports= router
