import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import profGroup from "../assets/profGroup.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue } from "firebase/database";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';

const UserList = () => {
   const db = getDatabase();
   let [userList,setUserList]=useState([])
   let [etarget,setEtarget]=useState("")
   let [searchList,setSearchList]=useState([])

   let userInfo = useSelector(state=>state.userInfo.value)
   
   useEffect(()=>{
      const userRef = ref(db, 'users');
      onValue(userRef, (snapshot) => {
         let arr = []
      snapshot.forEach(item =>{
         if(item.key != userInfo.uid){

            arr.push(item.val())
         }
         
      })
      setUserList(arr)
    
      });
   },[])

   let handleSearch = (e)=>{
      setEtarget(e.target.value)
      let search = userList.filter(item =>item.username.toLowerCase().includes(e.target.value.toLowerCase())
      )
      
      setSearchList(search)
      
   }
  return (
    <div className='box'>
    <div className='heading'>
        <h2>User List</h2>
        <BsThreeDotsVertical />
    </div>
    <div className='userListInput'>
      <TextField onChange={handleSearch}  fullWidth label="Search" id="fullWidth" />
    </div>
    {etarget.length < 1 ?

         userList.map(item =>(
         <>
            <div className='id'>
               <img  src={item.profile_picture} alt="Pp" />
               <div>
               <h3>{item.username}</h3>
               <p>Hi Guys, Wassup!</p>
               </div>
               <div className='btn'>
                  <Button variant="contained">+</Button>
               </div>
            </div>
            <div className='border'></div>
         </>
            ))
       
     :

     searchList.length > 0 ?

     searchList.map(item =>(
      <>
      
      <div className='id'>
         <img  src={item.profile_picture} alt="Pp" />
         <div>
         <h3>{item.username}</h3>
         <p>Hi Guys, Wassup!</p>
         </div>
         <div className='btn'>
            <Button variant="contained">+</Button>
         </div>
      </div>
      <div className='border'></div>
      </>
      ))
     :

       <h1 className='notFoundError'>User's not found</h1>

     
     }
     
</div>
  )
}

export default UserList