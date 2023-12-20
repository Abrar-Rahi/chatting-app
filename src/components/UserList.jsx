import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import profGroup from "../assets/profGroup.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,set,push } from "firebase/database";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import {  toast } from 'react-toastify';

const UserList = () => {
   const db = getDatabase();
   let [userList,setUserList]=useState([])
   let [etarget,setEtarget]=useState("")
   let [searchList,setSearchList]=useState([])
   let [frId,setFrId]=useState([])
   let [fid,setFid]=useState([])
   let [blockId,setBlockId]=useState([])
   

   let userInfo = useSelector(state=>state.userInfo.value)
  
   useEffect(()=>{
      const userRef = ref(db, 'users');
      onValue(userRef, (snapshot) => {
         let arr = []
      snapshot.forEach(item =>{
         if(item.key != userInfo.uid){
            arr.push({...item.val(), userid : item.key})
         }
         
      })
      setUserList(arr)
    
      });
   },[])

   useEffect(()=>{
      const friendReqRef = ref(db, 'friendRequest');
      onValue(friendReqRef, (snapshot) => {
         let arr = []
        snapshot.forEach(item =>{
         
            arr.push(item.val().whosendId + item.val().whoreceiveId)

        })
        setFrId(arr)
      });
      
   },[])

   useEffect(()=>{
      const friendsRef = ref(db, 'friends');
      onValue(friendsRef, (snapshot) => {
         let arr = []
        snapshot.forEach(item =>{
         
            arr.push(item.val().whosendId + item.val().whoreceiveId)

        })
        setFid(arr)
      });
      
   },[])

   useEffect(()=>{
      const blockRef = ref(db, 'block');
      onValue(blockRef, (snapshot) => {
         let arr = []
        snapshot.forEach(item =>{
         
            arr.push(item.val().blockById + item.val().blockedId)

        })
        setBlockId(arr)
      });
      
      
   },[])

   let handleSearch = (e)=>{
      setEtarget(e.target.value)
      let search = userList.filter(item =>item.username.toLowerCase().includes(e.target.value.toLowerCase())
      )
      
      setSearchList(search) 
   }

   let handleFrndReq = (item)=>{
      
      set(push(ref(db, 'friendRequest')), {
         whosendId : userInfo.uid,
         whosendName : userInfo.displayName,
         whoreceiveId : item.userid,
         whoreceiveName : item.username,
       }).then(()=>{
          toast("friend request send")
       })
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
            {frId.includes(item.userid + userInfo.uid) || frId.includes(userInfo.uid + item.userid) ? 
               
               <div className='btn' >
                  <Button variant="contained" disabled>Pendind</Button>
               </div>
            :
            fid.includes(item.userid + userInfo.uid) || fid.includes(userInfo.uid + item.userid) ?

               <div className='btn' >
               <Button variant="contained" disabled>friends</Button>
               </div>
            :
            blockId.includes(userInfo.uid + item.userid) ?

               <div className='btn' >
               <Button variant="contained" disabled>Unblock</Button>
               </div>
            :
            blockId.includes( item.userid+ userInfo.uid) ?

            
            <div className='blocked'>{`${item.username} blocked you`}</div>
            

            :


               <div className='btn' onClick={()=>handleFrndReq(item)}>
                  <Button variant="contained">+</Button>
               </div>

            }
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
         {frId.includes(item.userid + userInfo.uid) || frId.includes(userInfo.uid + item.userid) ? 
               
               <div className='btn' >
                  <Button variant="contained" disabled>Pendind</Button>
               </div>
            :
            fid.includes(item.userid + userInfo.uid) || fid.includes(userInfo.uid + item.userid) ?
               <div className='btn' >
               <Button variant="contained">friends</Button>
               </div>
            :

            blockId.includes(userInfo.uid + item.userid) ?

               <div className='btn' >
               <Button variant="contained" disabled>Unblock</Button>
               </div>
            :
            blockId.includes( item.userid+ userInfo.uid) ?

            
            <div className='blocked'>{`${item.username} blocked you`}</div>
            

            :


               <div className='btn' onClick={()=>handleFrndReq(item)}>
                  <Button variant="contained">+</Button>
               </div>

            }
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