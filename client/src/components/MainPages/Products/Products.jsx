import { useContext, Fragment,useState} from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../Utils/ProductItem/ProductItem";
import Loading from "../Utils/Loading/Loading";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Filters from "./Filters";
import LoadMore from "./LoadMore";

export default function Products() {
  const state = useContext(GlobalState);
  const [products,setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token]= state.token
  const [callback,setCallback]=state.productsAPI.callback 
  const [loading,setLoading]= useState(false)
  const [isChecked,setIsChecked]=useState(false)

  const deleteProduct = async (id,public_id)=> {

    try {
      setLoading(true)
      const destroyImg= await axios.post('/api/destroy',{public_id},{headers:{Authorization: token }})  
      const deleteProduct= await axios.delete(`/api/products/${id}`,{headers:{Authorization: token }})  
      await destroyImg
      await deleteProduct
      setCallback(!callback)
      setLoading(false)
      toast.success(deleteProduct.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
}


const handleCheck = (id)=> {
  // console.log(id)
  products.forEach(product => {
    if(product._id === id) product.checked = !product.checked
})
setProducts([...products])
}


const checkAll = ()=>{
  products.forEach(product => { 
    product.checked =!isChecked
  })
  setProducts([...products])
  setIsChecked(!isChecked)
}


const deleteAll =()=>{
  products.forEach(product => {
    if(product.checked) deleteProduct(product._id,product.images.public_id)
  })
}



 if (loading) return <div ><Loading/></div>  // *Retorna el Loading

  return (
    <Fragment>
      <Filters/>
      {

        isAdmin && 
        <div className="delete-all">
          <span>Select All</span>
          <input type="checkbox" checked={isChecked} onChange={checkAll}/>
          <button onClick={deleteAll}>Delete All</button>
        </div>
      }
      <div className="products">
        {products.map((product) => {
          return (
            
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              handleCheck={handleCheck}
              deleteProduct={deleteProduct}
            />
          );
        
        })}
      </div>
      <LoadMore/> 
      {products.length === 0 && <Loading />}
      <Toaster  position="top-right"  reverseOrder={false}/>   {/* // * Componente de Notificacion */}
    </Fragment>
  );
}
