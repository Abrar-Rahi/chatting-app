import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import profGroup from "../assets/profGroup.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push } from "firebase/database";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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

   let handleBlock = (item)=>{
       
       if(userInfo.uid == item.whosendId){
          set(push(ref(db, 'block')), {
            blockById : userInfo.uid,
            blockByName : userInfo.displayName,
            blockedId : item.whoreceiveId,
            blockedName : item.whoreceiveName
   
          }).then(()=>{
            remove(ref(db,'friends/'+ item.friendsId))
            toast(`you blocked by ${item.whoreceiveName}`)

          })
       }
       else if(userInfo.uid == item.whoreceiveId){
         set(push(ref(db, 'block')), {
            blockById : item.whoreceiveId,
            blockByName : item.whoreceiveName,
            blockedId : item.whosendId,
            blockedName : item.whosendName
   
          }).then(()=>{
            remove(ref(db,'friends/'+ item.friendsId))
            toast(`you blocked by ${item.whosendName}`)
          })
       }

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
              <Button variant="contained" color="error" onClick={()=>handleBlock(item)}>block</Button>
           </div>
        </div>
        <div className='border'></div>
        </>
        ))}


    
        
    </div>
  )
}

export default Friends