import { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export default function Categories() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [categories] = state.CategoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [callback, setCallback] = state.CategoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
          const res = await axios.put(`/api/category/${id}`,{ name: category },{ headers: { Authorization: token }});
          // alert(res.data.message);
          toast.success(res.data.message)
      } else {
        const res = await axios.post("/api/category",{ name: category },{ headers: { Authorization: token }});
        //   console.log(res);
        // alert(res.data.message);
        toast.success(res.data.message)
    }
    
    setOnEdit(false);
    setCategory("");
    setCallback(!callback);
    } catch (error) {
      // alert(error.response.data.message);
      toast.error(error.response.data.message)
    }
  };

  const editCategory = async (id, name) => {
    setId(id);
    setCategory(name);
    setOnEdit(true);
   
  };

  const deleteCategory = async (id)=>{
   try {
       const res = await axios.delete(`/api/category/${id}`,{headers:{Authorization: token }})
       setCallback(!callback);
       toast.success(res.data.message)
      // alert(res.data.message)
       
   } catch (error) {
      //  alert(error.response.data.message);
       toast.error(error.response.data.message)
   }

  }

  return (
    <div className="categories">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        <button  className="btnsubmit" type="submit">{onEdit ? "Update" : "Save"}</button>
   
      </form>
    
      <div className="col">
        {categories.map((category) => (
          <div className="row" key={category._id}>
            <p>{category.name}</p>
            <div>
              <button className="btnedit" onClick={() => editCategory(category._id, category.name)}> Edit </button>
              <button  className="btndelete" onClick={() =>{ deleteCategory(category._id)}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
