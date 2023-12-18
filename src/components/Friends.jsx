import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import profGroup from "../assets/profGroup.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove } from "firebase/database";
import { useSelector } from 'react-redux';

const Friends = () => {
   const db = getDatabase();

   let [friends,setFriends] = useState([])

   let userInfo = useSelector(state=>state.userInfo.value)
   

   useEffect(()=>{
      const friendsRef = ref(db, 'friends');
      onValue(friendsRef, (snapshot) => {
         let arr =[]
        snapshot.forEach(item =>{
         
         if(userInfo.uid == item.val().whosendId || userInfo.uid == item.val().whoreceiveId){
          
            arr.push({...item.val() , friendsId : item.key})
         }
      })
      setFriends(arr)
      
      });
   },[])

   let handleUnfriend = (item)=>{
       remove(ref(db,'friends/'+ item.friendsId))
   }
  return (
    <div className='box'>
        <div className='heading'>
            <h2>Friends</h2>
            <BsThreeDotsVertical />
        </div>
        {friends.map(item=>(
        <>
        <div className='id'>
           <img src={profGroup} alt="Pp" />
           <div>
            <h3>{userInfo.uid == item.whosendId ? item.whoreceiveName : item.whosendName}</h3>
            <p>Hi Guys, Wassup!</p>
           </div>
           <div className='btn'>
              <Button variant="contained" onClick={()=>handleUnfriend(item)}>Unfriend</Button>
              <Button variant="contained" color="error">block</Button>
           </div>
        </div>
        <div className='border'></div>
        </>
        ))}


    
        
    </div>
  )
}

export default Friends