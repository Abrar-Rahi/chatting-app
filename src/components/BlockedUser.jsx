import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import profGroup from "../assets/profGroup.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockedUser = () => {
   const db = getDatabase();
   let userInfo = useSelector(state => state.userInfo.value)
   let [blockUser, setBlockUser] = useState([])

   useEffect(() => {
      const blockRef = ref(db, 'block');
      onValue(blockRef, (snapshot) => {
         let arr = []
         snapshot.forEach(item => {
            arr.push({ ...item.val(), blockId: item.key })
         })
         setBlockUser(arr)

      });
   }, [])

   let handleUnblock = (item) => {
      set(push(ref(db, 'friends')), {
         whoreceiveId: item.blockedId,
         whoreceiveName: item.blockedName,
         whosendId: userInfo.uid,
         whosendName: userInfo.displayName,
      }).then(() => {
         remove(ref(db, 'block/' + item.blockId))
      })
   }

   return (
      <div className='box'>
         <div className='heading'>
            <h2>Block List</h2>
            <BsThreeDotsVertical />
         </div>
         {blockUser.map(item => (
            <>
               {userInfo.uid == item.blockById &&
                  <>
                     <div className='id'>
                        <img src={profGroup} alt="Pp" />
                        <div>
                           <h3>{userInfo.uid == item.blockById && item.blockedName}</h3>
                           <p>Hi Guys, Wassup!</p>
                        </div>
                        <div className='btn'>
                           <Button variant="contained" onClick={() => handleUnblock(item)}>Unblock</Button>
                        </div>
                     </div>
                     <div className='border'></div>
                  </>
               }
            </>
         ))}



      </div>
   )
}

export default BlockedUser