import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GlobalVariableContext } from '../App';
import { bUrl } from '../constant';
const AdminLogin = () => {
    const global = useContext(GlobalVariableContext);
    const [email,setEmail]= useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleFormSubmit = async (e)=>{
      e.preventDefault();
      let data = {
          email,
          password
      }
      try {
        let result = await axios({
          url:`${bUrl}/web-user/login`,
          method:"POST",
          data:data
        }) 
        let token = result.data.token;
        localStorage.setItem("token",token);
        global.setToken(token);
        navigate("/admin")
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  return (
    <div>
         <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" placeholder="Eg: abcd@gmail.com" id="email" value={email} onChange={(e)=>{
              setEmail(e.target.value)
            }} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="text" placeholder="Eg: Password@123" id="password" value={password} onChange={(e)=>{
              setPassword(e.target.value)
            }}/>
          </div>
          <div>
            <button style={{cursor:"pointer"}} type="submit">Login</button>
            <span  className="button-like" style={{cursor:"pointer", marginLeft:"10px"}} onClick={()=>{navigate("/admin/forgot-password")}}>Forgot Password</span>
          </div>
      </form>
    </div>
  )
}

export default AdminLogin