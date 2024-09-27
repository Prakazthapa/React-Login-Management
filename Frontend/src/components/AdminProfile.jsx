import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bUrl } from '../constant'

const AdminProfile = () => {
    const token = localStorage.getItem("token")
    const [profile,setProfile] = useState({})
    const navigate = useNavigate()
    const ViewAdminProfile = async ()=>{
        try {
            let result = await axios({
                url:`${bUrl}/web-user/my-profile`,
                method:"GET",
                headers:{
                    "authorization":`Bearer ${token}`
                }
            })
            // console.log(result.data.result[0])
            setProfile(result.data.result[0]);
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    useEffect(() => {
      ViewAdminProfile();  
    },[])
  return (
    <div>
        <h1>Admin Profile</h1>
        <h3>Full Name: {profile.fullName}</h3>
        <h3>Gender: {profile.gender}</h3>
        <h3>Date of Birth: {new Date(profile.dob).toLocaleDateString()}</h3>
        <h3>Email: {profile.email}</h3>
        <h3>Phone Number: {profile.phoneNumber}</h3>
        <h3>Role: {profile.role}</h3>
        <div><button onClick={(e)=>{
            navigate("/admin/update-profile")
        }}>Update</button></div>
    </div>
  )
}

export default AdminProfile