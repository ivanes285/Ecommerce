const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload')
const cookieParser= require('cookie-parser');





//SETTINGS



//MIDLEWARES
app.use(morgan('dev'));
app.use(express.json())
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended:false }))
app.use(fileUpload({
    useTempFiles: true,
}));





//Database
require('./database');



//Configurations 
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'))
//     app.get('*',(req,res)=>{
//         const index=path.join(__dirname, 'client','build','index.html');
//         res.sendFile(index)
//     })
// }





//  console.log('path.join----->',path.join(__dirname,'/client/build'))
// console.log('sendFile------>',path.join(__dirname, 'client','build','index.html'))



//Routes
app.use('/user',require('./routes/user.routes'))
app.use('/api',require('./routes/category.routes'))
app.use('/api',require('./routes/upload.routes'))
app.use('/api',require('./routes/product.routes'))
app.use('/api',require('./routes/payment.routes'))







module.exports = app;









