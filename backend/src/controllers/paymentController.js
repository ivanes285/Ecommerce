const Payments = require("../models/Payment");
const User = require("../models/User");
const Product = require("../models/Product");

const paymentControl = {

  getPayment: async (req, res) => {
    try {
      const payments = await Payments.find();
       res.json(payments);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createPayment: async (req, res) => {
    try {

        const user= await User.findById(req.user.id).select('name email');
        if (!user) return res.status(404).json({ message:"User does not exist"})
        const {cart,paymentID,address }= req.body;
        const {_id,name,email}= user;
        const newPayment= new Payments({
            user_id:_id,
            name,
            email,
            cart,
            paymentID,
            address,
        })

         cart.filter(item =>{
           return sold(item._id,item.quantity,item.sold)
         })

        await newPayment.save()
        res.json({message: 'Payment success'});
      } catch (error) {
        return res.status(500).json({ message: error.message });
      
      }
  }

}

const sold = async (id,quantity,oldSold) => {
  await Product.findByIdAndUpdate(id,{$set: { sold: quantity+oldSold }},{ new: true })
}

module.exports = paymentControl;
