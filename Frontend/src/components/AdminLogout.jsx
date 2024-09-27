import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalVariableContext } from '../App'

const AdminLogout = () => {
  let global = useContext(GlobalVariableContext)
    localStorage.removeItem("token")
    global.setToken(null)
    const navigate = useNavigate();
    useEffect(()=>{
        navigate("/admin/login")
    },[])
  return (
    <div>

    </div>
  )
}

export default AdminLogout