const User = require("../models/User");
const Payment = require("../models/Payment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userController = {

  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const search = await User.findOne({ email });
      if (search)
        return res.status(400).json({ message: "The email already exists.!!" });
      if (password.length < 8)
        return res
          .status(400)
          .json({ message: "Password is at least 8 characters long.!!" });

      const user = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 12),
      });

      //Save in the bdd mongoDB
      await user.save();

      //then create jsonwebToken to autentication
      const accessToken = createAccessToken({ id: user._id });
      //   console.log(accessToken);
      const refreshToken = createRefreshToken({ id: user._id });
      res.cookie("refreshToken", refreshToken, {
        //guardamos en cookies el refreshToken
        httpOnly: true,
        path: "/user/refresh_token", // ? configuraciones adicionales (seguridad)
        maxAge: 7*24*60*60*1000  // * 7 dias 
      });
      // return res.status(200).json({ message: "Success! You have successfully registered" });
      return res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "User does not exist" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrrect Password" });

      //If login is successfully completed

      const accessToken = createAccessToken({ id: user._id });
      //   console.log(accessToken);
      const refreshToken = createRefreshToken({ id: user._id });
      res.cookie("refreshToken", refreshToken, {
        //guardamos en cookies el refreshToken
        httpOnly: true,
        path: "/user/refresh_token", // ? configuraciones adicionales (seguridad)
        maxAge: 7*24*60*60*1000  // * 7 dias 


      });
       res.status(200).json({ accessToken,message:'Login Success!' });
      // return res.status(200).json({ message: "Login Success!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: "/user/refresh_token" });
      return res.json({ message: "Logget Out!!" })
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  refreshToken: (req, res) => {
    try {
      const rf_Token = req.cookies.refreshToken; //obtenemos de cookies al refreshToken
      if (!rf_Token)
    
        return res.status(400).json({ message: "Please Login or Register " });
      jwt.verify(rf_Token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        //verificamos el refreshToken del registro con el paiload del .env
        if (err)
          return res.status(400).json({ message: "Please Login Or Register" });
        const accessToken = createAccessToken({ id: user.id });
        // res.json({user,accessToken})
        res.json({ accessToken });
      });
      //    res.json({rf_Token})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  
  getUser: async (req, res)=>{
  try {
    //El req.user es el que guardamos en el auth sacado del payload 
    const user= await User.findById(req.user.id).select('-password')
     if (!user) return res.status(400).json({ message: 'User does not exist' });

     res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }


  },

  addCart: async (req, res) => {
     try {
    
      const user= await User.findById(req.user.id)
      if(!user) return res.status(400).json({ message: 'User does not exist' }); 
      await User.findOneAndUpdate({_id: req.user.id},{ cart: req.body.cart})
      return res.status(200).json({message: 'Added to Cart'})
     } catch (error) {
       return res.status(500).json({ message: error.message });
     }
  },

  history: async (req, res) => {
    
  try {
    const history = await Payment.find({user_id: req.user.id})
    res.json(history)
  } catch (error) {
   return  res.status(500).json({ message: error})
  }
  }


};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userController;
