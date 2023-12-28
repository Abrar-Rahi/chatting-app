import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import profGroup from "../assets/profGroup.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { msgInfo } from '../slices/messageSlice';


const Friends = ({type,className}) => {
   const db = getDatabase();

   let [friends,setFriends] = useState([])

   let dispatch = useDispatch()
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

   let handleprofileName = (item)=>{
      if(userInfo.uid == item.whosendId){
         dispatch(msgInfo({name:item.whoreceiveName, id:item.whoreceiveId}))
         localStorage.setItem("msg",JSON.stringify({name:item.whoreceiveName, id:item.whoreceiveId}))
         
      }else{
         dispatch(msgInfo({name:item.whosendName, id:item.whosendId}))
         localStorage.setItem("msg",JSON.stringify({name:item.whosendName, id:item.whosendId}))
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
        <div className={`id ${className}`} onClick={()=> type=="msgBox" && handleprofileName(item)} >
           <img src={profGroup} alt="Pp" />
           <div>
            <h3>{userInfo.uid == item.whosendId ? item.whoreceiveName : item.whosendName}</h3>
            <p>Hi Guys, Wassup!</p>
           </div>
           {type == "msgBox" ?
           ""
           :
           <div className='btn'>
              <Button variant="contained" onClick={()=>handleUnfriend(item)}>Unfriend</Button>
              <Button variant="contained" color="error" onClick={()=>handleBlock(item)}>block</Button>
           </div>
         }
        </div>
        <div className='border'></div>
        </>
        ))}


    
        
    </div>
  )
}

export default Friends