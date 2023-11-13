import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import regimg from "../assets/regimg.png"
import { alpha, styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

import {  toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
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
    backgroundColor:"#5F35F5",
    fontFamily: "Nunito",
    fontSize: "20px",
    fontWeight: "600",
    color: "#ffffff",
   
  });

const RegPage = () => {

  let [loader,setLoader]=useState(false)
  let [hideEye,setHideEye]=useState(false)
  let [eye,setEye]=useState(false)

    const auth = getAuth();

    let navigate = useNavigate()

    let [inputData,setInputData]=useState({
        email : "",
        fullname: "",
        password: ""
    })
   

    let handleChange = (e)=>{
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

    let handleSignup = ()=>{
      setLoader(true)
      createUserWithEmailAndPassword(auth, inputData.email, inputData.password)
      .then((userCredential) => {
        setLoader(false)
        sendEmailVerification(auth.currentUser)
          .then(() => {
            toast.warn("A varification emain send to your mail. please check and verify it.")
            navigate("/login")
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       console.log(errorMessage);
        if(errorCode.includes("already")){
          toast.error("this email is already in use")
        }
        if(errorCode.includes("missing")){
          toast.error("missing crediential")
        }
        if(errorCode.includes("password")){
          toast.error("password should be atleast 6 character")
        }
        setLoader(false)
      });

        // if(inputData.email==""){
        //     toast.error("please enter email")
        
        // }else{
        //     var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        //     if(!pattern.test(inputData.email)){
        //         toast.error("please enter valid email")
        //     }
        // }

        // if(inputData.fullname==""){
        //     toast.error("please enter name")
        
        // }
        // if(inputData.password==""){
        //     toast.error("please enter password")
       
        // }else{
        //     let length = /(?=.{8,})/
        //     let uppercase = /(?=.*[A-Z])/
        //     let lowercase = /(?=.*[a-z])/
        //     let number = /(?=.*[0-9])/
        //     let special  = /([^A-Za-z0-9])/
        //     if(!length.test(inputData.password)){
        //         toast.error("The password is at least 8 characters long")
        //     }
        //     if(!uppercase.test(inputData.password)){
        //         toast.error("The password has at least one uppercase letter")
        //     }
        //     if(!lowercase.test(inputData.password)){
        //         toast.error("The password has at least one lowercase letter")
        //     }
        //     if(!number.test(inputData.password)){
        //         toast.error("The password has at least one digit")
        //     }
        //     if(!special.test(inputData.password)){
        //         toast.error("The password has at least one special character")
        //     }
        // }
    }

    
  return (
    <Grid container >
    <Grid item xs={6}>
      
      <div className="reginfo">
           <h1 className='reginfo_h1'>Get started with easily register</h1>
           <p className='reginfo_p'>Free register and you can enjoy it</p>
           <div>
             <Myinput onChange={handleChange} name="email" id="outlined-basic" label="Email Address" variant="outlined" />
           </div>
           
           <div>
             <Myinput onChange={handleChange} name="fullname" id="outlined-basic" label="Ful name" variant="outlined" />
           </div>
           <div className='inputPass'>

            {eye ?
            <>
             <Myinput type='text'  onChange={handleChange} name="password" id="outlined-basic" label="Password" variant="outlined" />
             {hideEye&& <AiFillEye onClick={()=>setEye(false) } className='eyecon'/>}
              
            </>
             :
             <>
             <Myinput type='password'  onChange={handleChange} name="password" id="outlined-basic" label="Password" variant="outlined" />
             {hideEye&& <AiFillEyeInvisible onClick={()=>setEye(true)} className='eyecon'/>}
             
             
             </>
            }
             
           </div>
           {loader ?
           <MyButton>
              <FallingLines
                  color="#4fa94d"
                  width="40"
                  visible={true}
                  ariaLabel='falling-lines-loading'
              />
           </MyButton>

           :
           <MyButton onClick={handleSignup} variant="contained">Sign up</MyButton>
           }
           <div className='signin'>
             <p>Already  have an account ?</p>
             <Link to={"/login"}>
                <Button variant="text">Sign In</Button>
             </Link>

           </div>
           
      </div>
    </Grid>
    <Grid item xs={6}>
        <div className="regimg">
          <img  src={regimg} />

        </div>
    </Grid>
    
    
  </Grid>
  )
}

export default RegPage