
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { bUrl } from '../constant'
import swal from 'sweetalert2'
const ReadAllUser = () => {
  const [webUsers,setWebUsers] = useState([])
  const navigate = useNavigate();
  const webUsersView = async ()=>{
      let result = await axios({
        url:`${bUrl}/web-user`,
        method:"GET",
        headers:{
          "authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      setWebUsers(result.data.result)
      // console.log(users)
  }
  useEffect(() => {
    webUsersView();
  }, [])
  return (
    <div> 
         <div>
         <table border="1">
            <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone Number</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Role</th>
              <th></th>
            </tr>
            </thead>
            {webUsers.map((user,i) => {
              return <tbody key={i}>
            <tr>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.role}</td>
              <td><button  className='view' onClick={()=>{
                  navigate(`/admin/${user._id}`)
              }}>View</button>
              <button onClick={()=>{
                  navigate(`/admin/update/${user._id}`)
              }}>Edit</button>
              <button className='delete' onClick={ async ()=>{
                    swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!"
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        try {
                          let result = await axios({
                            url:`${bUrl}/web-user/${user._id}`,
                            method:"DELETE",
                            headers:{
                              "authorization":`Bearer ${localStorage.getItem("token")}`
                            }
                        })
                        toast.success(result.data.message)
                        webUsersView();
                        } catch (error) {
                          toast.error(error.response.data.message)
                        }
                      }
                    });
              }}>Delete</button></td>
            </tr>
            </tbody>
            }
        )}
        </table>
        </div>
    </div>
  )
}

export default ReadAllUser