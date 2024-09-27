import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { bUrl } from '../constant';

const AdminResetPassword = () => {
  const [query] = useSearchParams();
  const token = query.get("token");
  const navigate = useNavigate();
  const [password,setPassword] = useState("");
  const handleFormSubmit = async (e)=>{
    e.preventDefault();
    let data = {
        password,
    }
    try {
      let result = await axios({
        url:`${bUrl}/web-user/reset-password`,
        method:"PATCH",
        data:data,
        headers:{
            "authorization":`Bearer ${token}`
        }
      })
      toast.success(result.data.message)
      navigate("/admin/login")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>
         <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="Eg: Password@123" id="password" value={password} onChange={(e)=>{
              setPassword(e.target.value)
            }} />
            </div>
          <div>
            <button style={{cursor:"pointer"}} type="submit">Submit</button>
          </div>
        </form>
    </div>
  )
}

export default AdminResetPassword