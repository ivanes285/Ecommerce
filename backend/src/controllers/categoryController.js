const Category = require("../models/Category");
const Product = require("../models/Product");
const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res
          .status(400)
          .json({ message: " The category already exists, must be unique" });
      //if user has role =1 -----> admin
      //only admin can create , delete and update category

      const newCategory = new Category({
        name,
      });
      await newCategory.save();
      res
        .status(200)
        .json({ message: "The category has been created successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const products = await Product.findOne({category:req.params.id})
      if (products)  return res.status(400).json({ message: "Please delete all products with a relationship" });
      await Category.findByIdAndDelete(id);
      res.status(200).json({ message: "Category Delete Successful" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const {name}= req.body;
      
     // const update=  await Category.findByIdAndUpdate(id, { $set: name }, { new: true });
      await Category.findByIdAndUpdate(id, {name });

     // res.status(200).json(update);
      res.status(200).json({ message: "Category Update Successful" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = categoryController;
