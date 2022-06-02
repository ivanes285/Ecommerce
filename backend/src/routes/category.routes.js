const router = require('express').Router()
const {getCategories,createCategory,deleteCategory,updateCategory}=require('../controllers/categoryController')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')



router.route('/category').get( getCategories).post(auth,authAdmin,createCategory)

router.route('/category/:id').delete(auth,authAdmin,deleteCategory).put(auth,authAdmin,updateCategory)





module.exports = router