import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import loginimg from "../assets/loginimg.png"
import google from "../assets/google.png"
import { alpha, styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

import {  toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
import { FallingLines } from  'react-loader-spinner'
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai"

const Myinput = styled(TextField) ({
  width: '60%',
  marginBottom : "34px"
});

const MyButton = styled(Button)({

width: '60%',
padding: "20px 0",
borderRadius: "86px",
backgroundColor:"#5F35F5"

});

const Loginpage = () => {

  let [loader,setLoader]=useState(false)
  let [hideEye,setHideEye]=useState(false)
  let [eye,setEye]=useState(false)

  let navigate = useNavigate()

  const auth = getAuth();

  let [inputData,setInputData]=useState({
    email : "",
    password: ""
})


let handleChange = (e)=>{
    setInputData({
        ...inputData, 
        [e.target.name]: e.target.value
    })
   
}

let handleChange1 = (e)=>{
    setInputData({
        ...inputData, 
        [e.target.name]: e.target.value
    })
    if(inputData.password.length>=0 ){
      setHideEye(true)
    }
    if(inputData.password.length==1){
      setHideEye(false)
    }
}

let handleLogin = ()=>{
   setLoader(true)
  signInWithEmailAndPassword(auth, inputData.email, inputData.password)
    .then((userCredential) => {
      setLoader(false)
      if(userCredential.user.emailVerified){
         navigate("/home")
      }else{
        toast.error("email not verified")
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoader(false)

      if(errorCode.includes("credentials")){
        toast.error("invalid login credentials")
      }
    });


    if(inputData.email==""){
        toast.error("please enter email")
    
    }else{
        var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(!pattern.test(inputData.email)){
            toast.error("please enter valid email")
        }
    }

    if(inputData.password==""){
        toast.error("please enter password")
   
    }else{
        let length = /(?=.{8,})/
        let uppercase = /(?=.*[A-Z])/
        let lowercase = /(?=.*[a-z])/
        let number = /(?=.*[0-9])/
        let special  = /([^A-Za-z0-9])/
        if(!length.test(inputData.password)){
            toast.error("The password is at least 8 characters long")
        }
        if(!uppercase.test(inputData.password)){
            toast.error("The password has at least one uppercase letter")
        }
        if(!lowercase.test(inputData.password)){
            toast.error("The password has at least one lowercase letter")
        }
        if(!number.test(inputData.password)){
            toast.error("The password has at least one digit")
        }
        if(!special.test(inputData.password)){
            toast.error("The password has at least one special character")
        }
    }
}

let hangleGoogleSignUp = ()=>{
  setLoader(true)
  const provider = new GoogleAuthProvider();
  
  signInWithPopup(auth, provider).then(() => {
    navigate("/home")
    toast.success("verification done")
    setLoader(false)
  })
}
  return (
    <Grid container >
    <Grid item xs={6}>
      <div className="reginfo">
           <h1>Login to your account!</h1>
           <div className="google" onClick={hangleGoogleSignUp}>
            <img src={google} />
           </div>
           
           <div>
             <Myinput onChange={handleChange} name="email" id="outlined-basic" label="Email Address" variant="outlined" />
           </div>
           
           <div className='inputPass'>

            {eye ?
            <>
            <Myinput type='text'  onChange={handleChange1} name="password" id="outlined-basic" label="Password" variant="outlined" />
            {hideEye&& <AiFillEye onClick={()=>setEye(false) } className='eyecon'/>}
              
            </>
            :
            <>
            <Myinput type='password'  onChange={handleChange1} name="password" id="outlined-basic" label="Password" variant="outlined" />
            {hideEye&& <AiFillEyeInvisible onClick={()=>setEye(true)} className='eyecon'/>}
            
            
            </>
            }
 
         </div>
           {loader ?
           <MyButton>
              <FallingLines
                  color="#ffffff"
                  width="40"
                  visible={true}
                  ariaLabel='falling-lines-loading'
              />
           </MyButton>

           :
           
           <MyButton onClick={handleLogin} variant="contained">Login to Continue</MyButton>
           }
           <div className='signin'>
             <p>Don’t have an account ?</p>
             <Link to={"/"}>
                <Button variant="text">Sign Up</Button>
             </Link>

           </div>
           
      </div>
    </Grid>
    <Grid item xs={6}>
        <div className="regimg">
          <img  src={loginimg} />

        </div>
    </Grid>
    
    
  </Grid>
  )
}

export default Loginpage