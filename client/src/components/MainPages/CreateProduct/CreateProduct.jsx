import React, { useState, useContext,useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../Utils/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
  product_id: "",
  title: "",
  price: 1,
  description: "Hola es una pequeña descripcion ",
  content: "Este es una app que ayuda a entender como funciona React js",
  category: "",
  _id: "",
};

export default function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.CategoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const navigate = useNavigate();
  const param = useParams();
  
  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true); // * Modo edicion si es que existe el parametro id
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);


  const handleUpload = async (e) => {
    e.preventDefault();
    try {

      if (!isAdmin) return toast.error("You're not an admin");
      const file = e.target.files[0];

      if (!file) return toast.error("File not exist.");

      if (file.size > 1024 * 1024*5)  return toast.error("Size too large!"); // 5mb

      if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/jpg" )
      
        return toast.error("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {"content-type": "multipart/form-data", Authorization: token}});
        // console.log("res IMG", res)  // ! verificar que es lo que imprime
      setLoading(false);
      setImages(res.data); 
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return toast.error("You're not an admin");
      setLoading(true);
      await axios.post("/api/destroy",{ public_id: images.public_id }, {headers: { Authorization: token }});
      setLoading(false);
      setImages(false);

    } catch (err) {
      toast.error(err.response.data.message);
    }
  };


  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return toast.error("You're not an admin");
      if (!images) return toast.error("No Image Upload");

      if (onEdit) {
        const res= await axios.put(`/api/products/${product._id}`,{ ...product, images },{headers: { Authorization: token }});
        toast.success(res.data.message)
      } else {
       const res= await axios.post("/api/products",{ ...product, images },{headers: { Authorization: token }});
        toast.success(res.data.message)
      }
       setCallback(!callback);
       setImages(false)
       setProduct(initialState)
       setTimeout(() =>{
        navigate("/");  // * navegamos a inicio
      },1200)
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };


  const styleUpload = {
    display: images ? "block" : "none",
  };




  return (


    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} accept="image/*"/>
        {loading ? ( <div id="file_img"><Loading /></div>) : 
        ( <div id="file_img" style={styleUpload}>
          <img src={images ? images.url : ""} alt="" />
          <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>


      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product ID</label>
          <input type="text" name="product_id" id="product_id" required value={product.product_id} onChange={handleChangeInput}
           disabled={onEdit}/>
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" required value={product.title}onChange={handleChangeInput}/>
        </div>

        <div className="row">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" required value={product.price} onChange={handleChangeInput} min="1"/>
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea type="text" name="description" id="description" required value={product.description} rows="5" onChange={handleChangeInput}/>
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea type="text" name="content" id="content" required value={product.content} rows="7" onChange={handleChangeInput}/>
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select name="category" value={product.category} onChange={handleChangeInput} required>
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">{onEdit ? "Update" : "Create"}</button>

      </form>
     
      <Toaster  position="top-right"  reverseOrder={false}/>   {/* // * Componente de Notificacion */}
    </div>
  );
}
