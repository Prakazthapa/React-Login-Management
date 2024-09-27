import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { GlobalVariableContext } from '../App'

const MainNavLInks = () => {
  const global = useContext(GlobalVariableContext)
  return (
    <div className='navbar'>
        <NavLink to="/admin/register" style={{margin:"10px"}} className="nav-link " >Admin Register</NavLink>
        {
        global.token?(
          <>
          <NavLink to="/admin/my-profile" style={{margin:"10px"}} className="nav-link " >My Profile</NavLink>
          <NavLink to="/admin/logout" style={{margin:"10px"}} className="nav-link " >Logout</NavLink>
          <NavLink to="/admin/update-password" style={{margin:"10px"}} className="nav-link " >Update Password</NavLink>
          <NavLink to="/admin/read-all-user" style={{margin:"10px"}} className="nav-link " >Read All User</NavLink>
          </>
        ):(
          <>
            <NavLink to="/admin/login" style={{margin:"10px"}} className="nav-link " >Admin Login</NavLink>
          </>
        )
        }
        
    </div>
  )
}

export default MainNavLInks