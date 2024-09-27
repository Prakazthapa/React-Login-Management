import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../components/AdminDashboard'
import AdminForgotPassword from '../components/AdminForgotPassword'
import AdminLogin from '../components/AdminLogin'
import AdminLogout from '../components/AdminLogout'
import AdminProfile from '../components/AdminProfile'
import AdminRegister from '../components/AdminRegister'
import AdminUpdatePassword from '../components/AdminUpdatePassword'
import PageNotFound from '../components/PageNotFound'
import ReadAllUser from '../components/ReadAllUser'
import UpdateProfile from '../components/UpdateProfile'
import ReadSpecificUser from '../components/ReadSpecificUser'
import UpdateUser from '../components/UpdateUser'
import { GlobalVariableContext } from '../App'

const WebUserRoute = () => {
  let {token,setToken}= useContext(GlobalVariableContext)
  return (
    <div>
        <Routes>
            <Route path='/register' element={<AdminRegister></AdminRegister>}></Route>
            {
              token?(
                <>
                <Route path='/' element={<AdminDashboard></AdminDashboard>}></Route>
                <Route path='/my-profile' element={<AdminProfile></AdminProfile>}></Route>
                <Route path='/logout' element={<AdminLogout></AdminLogout>}></Route>
                <Route path='/update-profile' element={<UpdateProfile></UpdateProfile>}></Route>
                <Route path='/update-password' element={<AdminUpdatePassword></AdminUpdatePassword>}></Route>
                <Route path='/read-all-user' element={<ReadAllUser></ReadAllUser>}></Route>
                <Route path='/:id' element={<ReadSpecificUser></ReadSpecificUser>}></Route>
                <Route path='/update/:id' element={<UpdateUser></UpdateUser>}></Route>
                <Route path="/forgot-password" element={<PageNotFound></PageNotFound>}></Route> 
                <Route path="/login" element={<PageNotFound></PageNotFound>}></Route> 
                </>
              ):
              (
                <>
                  <Route path='/login' element={<AdminLogin></AdminLogin>}></Route>
                  <Route path='/forgot-password' element={<AdminForgotPassword></AdminForgotPassword>}></Route>
                </>
              )
            }
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
    </div>
  )
}

export default WebUserRoute