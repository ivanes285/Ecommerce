import { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

export default function UsersAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart,setCart] = useState([])
  const [history,setHistory] = useState([])
 

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/info", {
            headers: { Authorization: token }, //mando el token para que me permita hacer la consulta
          });
          // console.log('res', res);  
          setIsLogged(true);
          res.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setCart(res.data.user.cart)
        } catch (error) {
          toast.error(error.response.data.message)
        
        }
      };
      getUser();
    }
  }, [token]);

  



  const addCart = async (product) => {
    if (!isLogged) return toast.error("Please Login to continue buying");

    const check = cart.every(item => {
        return item._id !== product._id
    })
    toast.success('Product added to cart')
    if (check) {
        setCart([...cart,{...product,quantity:1}]);
        await axios.patch('/user/addcart',{cart: [...cart,{...product,quantity:1}]},{headers:{Authorization: token}})
       
    }else{
      toast('This product has been added to cart!', {icon: '⚠️👀✋'});

    }

  };



  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart:[cart,setCart],
    addCart: addCart,
    history:[history,setHistory],
  };
}
