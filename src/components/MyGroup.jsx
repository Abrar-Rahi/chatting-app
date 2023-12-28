import React,{ useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import profGroup from "../assets/profGroup.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,set,push} from "firebase/database";
import { useSelector } from 'react-redux';

const Friends = () => {
   const db = getDatabase();
   let userInfo = useSelector(state=>state.userInfo.value)
   let [mygroupList,setMyGroupList]= useState([])
   let [checkRequest,setCheckRequest]=useState(false)
   let [groupReqList,setGroupReqList]=useState([])

   useEffect(()=>{
      const blockRef = ref(db, 'groups');
      onValue(blockRef, (snapshot) => {
         let arr = []
        snapshot.forEach(item =>{
         if(userInfo.uid == item.val().adminId){
            arr.push({...item.val() , groupId : item.key})
         }
        })
        setMyGroupList(arr)
        
      });
   },[])

   let handleCheckRequest = (Gitem)=>{
      setCheckRequest(true)
      const groupRequestRef = ref(db, 'grouprequest');
      onValue(groupRequestRef, (snapshot) => {
         let arr = []
        snapshot.forEach(item =>{
         if(item.val().requestGroupId == Gitem.groupId){
            arr.push({...item.val() , groupReqId : item.key})
         }
        })
        setGroupReqList(arr)
        
      });
   }
  return (
    <div className='box'>
        <div className='heading'>
            <h2>My Group</h2>
            {checkRequest &&
            <Button onClick={()=>setCheckRequest(false)} variant="contained">back</Button>
            }
        </div>
        {checkRequest ? 
        groupReqList.map(item=>(
         <>
         <div className='id'>
          <img src={profGroup} alt="Pp" />
          <div>
             <h3>{item.requestBy}</h3>
          </div>
         </div>
      <div className='border'></div>
         </>
         ))
      :
      
        mygroupList.map(item =>(
      <>
        <div className='id'>
           <img src={profGroup} alt="Pp" />
           <div>
            <h3>{item.groupName}</h3>
            <p>{`admin: ${item.admin}`}</p>
           </div>
           <div className='btn'>
              <Button onClick={()=>handleCheckRequest(item)} variant="contained">check Request</Button>
           </div>
        </div>
        <div className='border'></div>
      </>
        ))
      }

        
    </div>
  )
}

export default Friends

