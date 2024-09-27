import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bUrl } from '../constant';

const AdminUpdatePassword = () => {
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const navigate = useNavigate();
    const handleFormSubmit = async (e)=>{
      e.preventDefault();
      let data = {
          oldPassword,
          newPassword
      }
      try {
        let result = await axios({
          url:`${bUrl}/web-user/update-password`,
          method:"PATCH",
          data:data,
          headers:{
            "authorization":`Bearer ${localStorage.getItem("token")}`
          }
        })
        toast.success(result.data.message)
        navigate("/admin/logout")
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  return (
    <div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="oldPassword">Old Password:</label>
            <input type="password" placeholder="Eg: oldPassword@123" id="oldPassword" value={oldPassword} onChange={(e)=>{
              setOldPassword(e.target.value)
            }}/>
          </div>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input type="password" placeholder="Eg: newPassword@123" id="newPassword" value={newPassword} onChange={(e)=>{
              setNewPassword(e.target.value)
            }}/>
          </div>

          <div>
            <button type="submit">Update</button>
          </div>
      </form>
    </div>
  )
}

export default AdminUpdatePassword