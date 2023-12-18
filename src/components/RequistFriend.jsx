import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import profGroup from "../assets/profGroup.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push } from "firebase/database";
import { useSelector } from 'react-redux';

const Friends = () => {
   const db = getDatabase();
   const [friendReqList,setFriendReqList]= useState([])

   let userInfo = useSelector(state=>state.userInfo.value)

   useEffect(()=>{
      const friendReqRef = ref(db, 'friendRequest');
      onValue(friendReqRef, (snapshot) => {
         let arr = []
        snapshot.forEach(item =>{
         if(userInfo.uid == item.val().whoreceiveId){
            arr.push({...item.val(), frReqId: item.key})

         }
        })
        setFriendReqList(arr)
      });
      
   },[])

   let handleFRcancel = (item)=>{
      remove( ref(db, 'friendRequest/'+ item.frReqId ))
      
   }
   let handleFRaccept = (item)=>{
      set(push(ref(db, 'friends')), {
         ...item
       }).then(()=>{

          remove( ref(db, 'friendRequest/'+ item.frReqId ))
       })
      
   }
  return (
    <div className='box'>
        <div className='heading'>
            <h2>Friend Request</h2>
            <BsThreeDotsVertical />
        </div>
        {friendReqList.map(item=>(
        <>
        <div className='id'>
           <img src={profGroup} alt="Pp" />
           <div>
            <h3>{item.whosendName}</h3>
            <p>Hi Guys, Wassup!</p>
           </div>
           <div className='btn'>
              <Button variant="contained" onClick={()=>handleFRaccept(item)}>Accept</Button>
              <Button onClick={()=>handleFRcancel(item)} variant="contained" color="error">Cancel</Button>
           </div>
        </div>
        <div className='border'></div>
        </>
        ))}

    </div>
  )
}

export default Friends