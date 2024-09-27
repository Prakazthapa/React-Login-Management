import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {bUrl} from '../constant'
const AdminRegister = () => {
    const [fullName,setFullName] = useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [dob,setDob] = useState("");
    const [gender,setGender] = useState("male");
    const navigate = useNavigate();
    let genderOption = [
        {
          value: "male", 
          label: "Male",
        },
        {
          value: "female",
          label: "Female",
        },
        {
          value: "other",
          label: "Other",
        },
      ];
    const handleFormSubmit = async (e)=>{
      e.preventDefault();
      let data = {
          fullName,
          email,
          password,
          phoneNumber,
          dob,
          gender
      }
      data = {
        ...data,
        role:"admin"
      }
      try {
        let result = await axios({
          url:`${bUrl}/web-user`,
          method:"POST",
          data:data
        })
        toast.success("A Link has been send to yor email. Please click the given link to verify your account.")
        setFullName("")
        setEmail("")
        setPassword("")
        setPhoneNumber("")
        setDob("")
        setGender("male")
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  return (
    <div>
         <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" placeholder="Eg: Prakash thapa" id="fullName"  value={fullName} onChange={(e)=>{
              setFullName(e.target.value)
            }}/>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" placeholder="Eg: abcd@gmail.com" id="email" value={email} onChange={(e)=>{
              setEmail(e.target.value)
            }} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="Eg: Password@123" id="password" value={password} onChange={(e)=>{
              setPassword(e.target.value)
            }}/>
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="number" placeholder="Eg: 9812345678" id="phoneNumber" value={phoneNumber} onChange={(e)=>{
              setPhoneNumber(e.target.value)
            }}/>
          </div>
          <div>
            <label htmlFor="dob">DOB:</label>
            <input type="date" placeholder="Eg: 2022-01-01" id="dob" value={dob} onChange={(e)=>{
              setDob(e.target.value)
            }}/>
          </div>
          <div>
          <label className='gender'>Gender:</label>
        {
          genderOption.map((item,index)=>{
            return <span style={{marginRight:"10px",marginLeft:"10px"}} key ={index}>
            <label className='gender' htmlFor={item.value}>{item.label}</label>
            <input  type="radio"  id={item.value} value={item.value} checked={gender === item.value} onChange={(e)=>{
                setGender(e.target.value)
            }} /></span>
          })
        }
          </div>
          <div>
            <button type="submit">Create</button>
          </div>
      </form>
    </div>
  )
}

export default AdminRegister