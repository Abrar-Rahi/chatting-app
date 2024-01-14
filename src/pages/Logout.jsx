import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginInfo } from '../slices/userSlice';

const Logout = () => {
  const auth = getAuth();
  let navigate = useNavigate()
  let dispatch = useDispatch()



  let handleSignOut = () => {
    signOut(auth).then(() => {
      toast.done("succesfully log out")
      navigate("/login")
      dispatch(loginInfo(null))
      localStorage.removeItem("user")
    })
  }


  return (
    <div className='LogoutBtn'>

      <Button onClick={handleSignOut} variant="outlined" color="error">
        LogOut
      </Button>
    </div>
  )
}

export default Logout