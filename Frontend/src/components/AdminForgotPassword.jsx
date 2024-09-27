import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { bUrl } from '../constant'

const AdminForgotPassword = () => {
    const [email,setEmail]= useState("");
    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        let data = {
            email,
        }
        try {
          let result = await axios({
            url:`${bUrl}/web-user/forgot-password`,
            method:"POST",
            data:data
          })
          toast.success("A Link has been send to yor email. Please click given link to reset your password.")
          setEmail("")
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
            <button type="submit">Submit</button>
          </div>
      </form>
    </div>
  )
}

export default AdminForgotPassword