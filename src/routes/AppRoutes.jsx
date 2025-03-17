import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from '../dashboard/Home/Home'
import Landingpage from '../Profile/Landingpage'
import Search from '../dashboard/Search'
import Watchlist from '../dashboard/Watchlist'
import Login from '../Profile/Auth/Login'
import Profile from '../Profile/Users/Profiles'
import Signup from '../Profile/signup'
import Dashboard from '../dashboard/Home/Dashboard'
import Videopreview from '../components/Videopreview'
import ForgotPassword from '../Profile/Auth/ForgotPassword'
import ResetPassword from '../Profile/Auth/ResetPassword'


export const ProfileName=createContext();
const AppRoutes = () => {
  const [userName,setUsername]=useState();

  return (
      <ProfileName.Provider value={{userName,setUsername}}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='Search' element={<Search/>}/>
        <Route path='WatchList' element={<Watchlist/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Route>
      <Route path="/registration" element={<Landingpage/>}>
        <Route path='' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
          
      </Route>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/resetpassword' element={<ResetPassword/>}/>
      <Route path='/videoPlayer' element={<Videopreview/>}/>
      </Routes>
    </BrowserRouter>
      </ProfileName.Provider>
  )
}

export default AppRoutes
