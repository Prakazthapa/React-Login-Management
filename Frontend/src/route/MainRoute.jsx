import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminVerify from '../components/AdminVerify'
import PageNotFound from '../components/PageNotFound'
import WebUserRoute from './WebUserRoute'
import Home from '../components/Home'
import AdminResetPassword from '../components/AdminResetPassword'
import ReadSpecificUser from '../components/ReadSpecificUser'

const MainRoute = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/verify-email' element={<AdminVerify></AdminVerify>}></Route>
            <Route path='/reset-password' element={<AdminResetPassword></AdminResetPassword>}></Route>
            <Route path='/admin/*' element={<WebUserRoute></WebUserRoute>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
    </div>
  )
}

export default MainRoute