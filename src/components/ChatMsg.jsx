import React, { useState,useEffect } from 'react'
import profile from "../assets/profile.png"
import regimg from "../assets/regimg.png"
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalImage from "react-modal-image";
import { FiSend } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue,remove,set,push } from "firebase/database";

const ChatMsg = () => {
  const db = getDatabase();
  let userInfo = useSelector(state=>state.userInfo.value)
 let messageInfo = useSelector(state=>state.msgInfo.value)

 
 let [msg,setMsg]=useState("") 
 let [msgList,setMsgList]=useState([]) 

let handleMsgChange= (e)=>{
  setMsg(e.target.value);
}

 let handlesendMsg = ()=>{
  if(messageInfo.status == "single"){
    set(push(ref(db, 'singleMsg')), {
      whoSendMsg : userInfo.displayName,
     whoSendMsgId : userInfo.uid,
     whoReceiveMsg : messageInfo.name,
     whoReceiveMsgId : messageInfo.id,
     msg : msg
    }).then(()=>{
      setMsg("");
    })
    
  }
 }

 useEffect(()=>{
  const blockRef = ref(db, 'singleMsg');
  onValue(blockRef, (snapshot) => {
     let arr = []
    snapshot.forEach((item) =>{
     if(userInfo.uid == item.val().whoSendMsgId || messageInfo.id==item.val().whoReceiveMsgId && userInfo.uid==item.val().whoReceiveMsgId || messageInfo.id==item.val().whoSendMsgId){

       arr.push(item.val())
     }
    })
    setMsgList(arr)
  });
},[messageInfo.id])
 
  return (
    <div className='msgBox'>
      <div className='msgBoxPro'>
        <div className='msgBoxProfile'>
          <img src={profile} alt="pp" />
          {userInfo.uid != messageInfo.id ?
          <h1>{messageInfo.name}</h1>
          :
          <>
          <h1>please select a friend name</h1>
          </>
          }
        </div>
        <BsThreeDotsVertical className='msgIcon3Dots' />
      </div>
      <hr />
      <div className='msgChatBox'>
        {msgList.map(item=>(
          
        <>
          {userInfo.uid == item.whoReceiveMsgId &&  messageInfo.id==item.whoSendMsgId &&
         <>
          {/* receive msg start */}
          <div>
            <p className='msgText'>{item.msg}</p>
          </div>
          {/* receive msg end */}
         </>
         }
        
        {userInfo.uid == item.whoSendMsgId &&  messageInfo.id==item.whoReceiveMsgId &&
        <>
        {/* send msg start */}
            <div className='sendMsg'>
              <p className='msgText sendText'>{item.msg}</p>
            </div>
        {/* send msg end */}
        </>
        }
        
        </>  
        ))}

        {/* receive pic start */}
        {/* <div>
          <ModalImage className='msgPic'
            small={regimg}
            large={regimg}
            alt="Hello World!"
          />
        </div> */}
        {/* receive pic end */}
        {/* receive audio start */}
        {/* <div className='msgAudio'>
          <audio controls></audio>
        </div> */}
            {/* receive msg end */}

            
            {/* send pic start */}
            {/* <div className='sendMsg'>
              <ModalImage className='msgPic'
                small={regimg}
                large={regimg}
                alt="Hello World!"
              />
            </div> */}
            {/* send pic end */}
             {/* send audio start */}
        {/* <div className='msgAudio sendMsg'>
          <audio  controls></audio>
        </div> */}
            {/* send audio end */}
        </div>
        <hr />
        <div className='inputPart' >
        {/* <div className="input-box" contenteditable="true" onChange={handlemsgChange}></div> */}
        <input className="input-box" type="text" onChange={handleMsgChange} value={msg}/>
           <FiSend className='sendIcon' onClick={handlesendMsg}/>
        </div>
      </div>
      )
}

      export default ChatMsg