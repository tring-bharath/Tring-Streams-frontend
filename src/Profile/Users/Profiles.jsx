import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FaEye, FaHeart, FaHistory } from 'react-icons/fa';
import { ProfileName } from '../../routes/AppRoutes';
import { Button, Modal } from 'react-bootstrap';
import Loggedout from './Loggedout';
import Loggedin from './Loggedin';


const Profile = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className='d-flex w-100'>
      {user == null ?
        <Loggedout/>
        :
        <Loggedin/>
      }

    </div>
  )
}


export default Profile
