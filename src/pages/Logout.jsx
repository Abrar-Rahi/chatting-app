import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { loginInfo } from '../slices/userSlice';

const Logout = () => {
    const auth = getAuth();
    let navigate = useNavigate()
    let dispatch = useDispatch()
    // let userInfo = useSelector(state=>state.userInfo.value)
    
  
    let handleSignOut = ()=>{
      signOut(auth).then(() => {
        toast.done("succesfully log out")
        navigate("/login")
        dispatch(loginInfo(null))
        localStorage.removeItem("user")
      })
    }
  
    // useEffect(()=>{
    //   if(userInfo == null){
    //     navigate("/login")
    //   }
    // },[])
  return (
         <Button onClick={handleSignOut} variant="outlined" color="error">
            LogOut
         </Button>
  )
}

export default Logout