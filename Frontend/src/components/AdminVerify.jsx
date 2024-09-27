import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { bUrl } from '../constant';

const AdminVerify = () => {
  const [query] = useSearchParams();
  const token = query.get("token");
  const navigate = useNavigate();
  const VerifyEmail = async ()=>{
    try {
      let result = await axios({
        url:`${bUrl}/web-user/verify-email`,
        method:"PATCH",
        headers:{
          "authorization":`Bearer ${token}`
        }
      })
      toast.success(result.data.message)
      navigate("/admin/login")
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  useEffect(()=>{
    VerifyEmail()
  },[])
  return (
    <div>

    </div>
  )
}

export default AdminVerify