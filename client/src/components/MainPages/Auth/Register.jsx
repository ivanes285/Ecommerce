import React,{useState} from 'react'
import { Link } from "react-router-dom";
import axios from "axios"


export default function Register() {


  const [user,setUser]= useState({
    name: '',
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
     await axios.post('/user/register',{...user})
     localStorage.setItem('firstLogin',true)
     window.location.href ='/';
   } catch (error) {
     alert(error.response.data.message)
   }

  }


  return (
    <div className="login-page">
    <form onSubmit={handleSubmit}>
    <h2>Register</h2>
      <input type="text" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput}/>
      <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput}/>
      <input type="password" name="password" required placeholder="Password" autoComplete="on" value={user.password} onChange={onChangeInput}/>
      <div className="row">
        <button type='submit'>Register</button>
        <Link to='/login'>Login</Link>
      </div>
    </form>
    
    </div>
  )
}

