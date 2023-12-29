import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import profGroup from "../assets/profGroup.png"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getDatabase, ref, onValue,remove,set,push} from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { msgInfo } from '../slices/messageSlice';

const GroupList = ({type,className}) => {
   const db = getDatabase();

   let dispatch = useDispatch()
   let userInfo = useSelector(state=>state.userInfo.value)

   let [groupPopup,setGroupPopup]= useState(false)
   let [createGroup,setCreateGroup]= useState("")
   let [groupList,setGroupList]= useState([])
   
   

  let handleCreateGroup = ()=>{
   set(push(ref(db, 'groups')), {
      groupName : createGroup,
      admin : userInfo.displayName,
      adminId : userInfo.uid
    }).then(()=>{
       setCreateGroup("")
   })
  }

  useEffect(()=>{
   const blockRef = ref(db, 'groups');
   onValue(blockRef, (snapshot) => {
      let arr = []
     snapshot.forEach(item =>{
      if(userInfo.uid != item.val().adminId){
         arr.push({...item.val() , groupId : item.key})
      }
     })
     setGroupList(arr)
     
   });
},[])

let handleGroupRequest = (item)=>{
   set(push(ref(db, 'grouprequest')), {
      requestBy : userInfo.displayName,
      requestById : userInfo.uid,
      requestGroupId : item.groupId,
      groupAdminId : item.adminId,
      groupAdminName : item.admin
    }).then(()=>{
      
   })
}


let handleprofileName = (item)=>{
      dispatch(msgInfo({name:item.groupName,id:item.groupId}))
      localStorage.setItem("msg",JSON.stringify({name:item.groupName,id:item.groupId}))
}


   
  return (
    <div className='box'>
        <div className='heading'>
           <h2>Groups List</h2>
      {type == "msgBox" ?
         ""
      :
         groupPopup ? 
               <Button onClick={()=>setGroupPopup(false)} variant="contained">Back</Button>
               :
               <Button onClick={()=>setGroupPopup(true)} variant="contained">Create Group</Button>
      }
            
        </div>
        {groupPopup ?
        <>
        <TextField onChange={(e)=>setCreateGroup(e.target.value)} className='textField' id="outlined-basic" label="Group Name" variant="outlined" value={createGroup}/>
        <Button onClick={handleCreateGroup} className='CreateGroup' variant="outlined">Create</Button>
        </>
      :
      <>
      {groupList.map(item =>(
      <>
         <div className={`id ${className}`} onClick={()=> type=="msgBox" && handleprofileName(item)}>
            <img src={profGroup} alt="Pp" />
            <div>
            <h3>{item.groupName}</h3>
            <p>{`admin: ${item.admin}`}</p>
            </div>
            {type != "msgBox" &&
            <div className='btn'>
               <Button onClick={()=>handleGroupRequest(item)} variant="contained">Join</Button>
            </div>
            }
         </div>
         <div className='border'></div>
      </>
      ))}
      </>
      }

        
    </div>
  )
}

export default GroupList