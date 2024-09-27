import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bUrl } from '../constant';
const UpdateProfile = () => {
    const [fullName,setFullName] = useState("");
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
          phoneNumber,
          dob,
          gender
      }
      try {
        let result = await axios({
          url:`${bUrl}/web-user/update-profile`,
          method:"PATCH",
          data:data,
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        navigate("/admin/my-profile")
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    const ViewAdminProfile = async ()=>{
        try {
            let result = await axios({
                url:`${bUrl}/web-user/my-profile`,
                method:"GET",
                headers:{
                    "authorization":`Bearer ${localStorage.getItem("token")}`
                }
            })
            let data = result.data.result[0];
            setFullName(data.fullName);
            setPhoneNumber(data.phoneNumber);
            setDob(data.dob);
            setGender(data.gender);
            console.log(data)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    useEffect(() => {
      ViewAdminProfile();  
    },[])
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
            <button type="submit">Update</button>
          </div>
      </form>
    </div>
  )
}

export default UpdateProfile