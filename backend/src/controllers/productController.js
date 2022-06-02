const Product = require("../models/Product");


// Filter, sorting and paginating

class APIfeatures {
  constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
  }

  //Filtrar
  filtering(){
     const queryObj = {...this.queryString} //queryString = req.query
    //  console.log("queryObj",queryObj)
    //  console.log({before: queryObj})

     const excludedFields = ['page', 'sort', 'limit']
     excludedFields.forEach(el => delete(queryObj[el]))
     
     let queryStr = JSON.stringify(queryObj)

     queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
  
  //    gte = greater than or equal
  //    lte = lesser than or equal
  //    lt = lesser than
  //    gt = greater than

     this.query.find(JSON.parse(queryStr))
    //  console.log({after: queryObj})
     return this;
  }


  sorting(){
      if(this.queryString.sort){
          const sortBy = this.queryString.sort.split(',').join(' ')
          this.query = this.query.sort(sortBy)
      }else{
          this.query = this.query.sort('-createdAt')
      }

      return this;
  }

  paginating(){
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 9
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit)
      return this;
  }
}


const productController = {

  getProducts: async(req, res) =>{
    try {
        const features = new APIfeatures(Product.find(), req.query)
        .filtering().sorting().paginating()

        const products = await features.query

        res.json({
            status: 'success',
            result: products.length,
            products: products
        })
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},


  createProduct: async (req, res) => {
    try {
      const { product_id, title,price ,description,content, images,category } = req.body;

       if(!images) return res.status(400).json({message: "No image uploaded"})
       const searchProduct = await Product.findOne({product_id})
       if(searchProduct) return res.status(400).json({message: "This product already exist,change product_id"})

      const newProduct = new Product({ 
          product_id, 
          title: title.toLowerCase(), 
          description, 
          price, 
          content, 
          images, 
          category
      })
      await newProduct.save()
      res.json({message: 'Product saved successfully'})

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        
        res.status(200).json({ message: "Deleted Product"})

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
        const id = req.params.id;
        const { title,price ,description,content, images,category } = req.body;
       
        if(!images) return res.status(400).json({message: "No image uploaded"})
        await Product.findByIdAndUpdate(id, { $set:{ title,price ,description,content, images,category }},
            { new: true } 
        )
        res.json({ message: "Updated Product"})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = productController;
