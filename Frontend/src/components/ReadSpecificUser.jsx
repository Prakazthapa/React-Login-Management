import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { bUrl } from '../constant'

const ReadSpecificUser = () => {
  const [user,setUser] = useState({})
  const {id} = useParams();
  const navigate = useNavigate();
  const userView = async ()=>{
      let result = await axios({
        url:`${bUrl}/web-user/${id}`,
        method:"GET",
        headers:{
          "authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      setUser(result.data.result)
  }
  useEffect(() => {
    userView();
  }, [])
  return (
    <div>
      <div style={{margin:"10px 100px 10px 100px"}}>
        <div><p>Id : {user._id}</p></div>
        <div><p>Name : {user.fullName}</p></div>
        <div><p>Email : {user.email}</p></div>
        <div><p>Password : {user.password}</p></div>
        <div><p>Date Of Birth : {user.dob}</p></div>
        <div><p>Gender : {user.gender}</p></div>
        <div><p>Role : {user.role}</p></div>
        <div><button onClick={(e)=>{
          navigate(`/admin/update/${user._id}`)
        }}>Edit</button></div>
        </div>
    </div>
  )
}

export default ReadSpecificUser