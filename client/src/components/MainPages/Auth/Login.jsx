import React,{useState} from 'react'
import { Link} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"


export default function Login() {

// const navigate = useNavigate();
  const [user,setUser]= useState({
    email:'',
    password:'',
  })


  const onChangeInput = (e) => {
   const {name,value} = e.target
   setUser({...user,[name]:value})
  }

  const handleSubmit = async (e) => {
   e.preventDefault()
   try {
    const res= await axios.post('/user/login',{...user})
    localStorage.setItem('firstLogin',true)
    //Notificacion loggin success
     toast(res.data.message,{icon:'✅➡️', style: {
      borderRadius: '10px',
      background: '#b9e6d1',
      height:'80px',
      width:'225px',
      color: '#555',
      
    },})
     setTimeout(() =>{
      window.location.href ='/';
      // navigate('/') // TODO: Solucionar con navigate
     },1000)
    
     
   } catch (error) {
     
       //Notificacion de error en el login
     toast(error.response.data.message, {
      icon: '⚠️❌',
      style: {
        borderRadius: '10px',
        background: '#F8D7DA',
        height:'80px',
        width:'225px',
        color: '#555',
      },
    })
   }

  }

  return (
    <div className="login-page">
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" name="email" required placeholder="email" value={user.email} onChange={onChangeInput}/>
      <input type="password" name="password" required placeholder="password" autoComplete="on" value={user.password} onChange={onChangeInput}/>
      <div className="row">
        <button type='submit'> Login </button>
        <Link to='/register '>Register</Link>
      </div>
    </form>
    <Toaster  position="top-right"  reverseOrder={false}/>
    
    </div>
  )
}

