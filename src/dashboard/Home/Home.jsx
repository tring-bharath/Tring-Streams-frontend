import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'

const Home = () => {

  return (
    <div className='d-flex'>
      <Sidebar className=''/>
      <Outlet className='outlet position-absolute'/>
    </div>
  )
}

export default Home
