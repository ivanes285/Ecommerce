import {useContext} from 'react'
import {  Routes, Route } from "react-router-dom";
import Products from './Products/Products'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Cart from './Cart/Cart'
import DetailProduct from './DetailProduct/DetailProduct'
import NotFound from './Utils/NoFound/NotFound'
import OrderHistory from './History/OrderHistory'
import OrderDetails from './History/OrderDetails'
import Categories from './Categories/Categories';
import CreateProduct from './CreateProduct/CreateProduct';
import {GlobalState} from '../../GlobalState'


export default function Pages() {
  const state = useContext(GlobalState) 
  const [isLogged]= state.userAPI.isLogged
  const [isAdmin]= state.userAPI.isAdmin
  return (
    <Routes>
      <Route path="/" exact element={<Products/>} />
      <Route path="/login" element={isLogged?<NotFound/>:<Login/>} />
      <Route path="/register" element={isLogged?<NotFound/>:<Register/>} />
      <Route path="/history" element={isLogged?<OrderHistory/>:<NotFound/>} />
      <Route path="/history/:id" element={isLogged?<OrderDetails/>:<NotFound/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/detail/:id" element={<DetailProduct/>} />

      <Route path="/category" element={isAdmin?<Categories/>:<NotFound/>} />
      <Route path="/create_product" element={isAdmin?<CreateProduct/>:<NotFound/>} />
      <Route path="/edit_product/:id" element={isAdmin?<CreateProduct/>:<NotFound/>} />

      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}
