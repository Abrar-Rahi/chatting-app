import React from 'react'
import profile from "../assets/profile.png"
import regimg from "../assets/regimg.png"
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalImage from "react-modal-image";
import { FiSend } from "react-icons/fi";
import { useSelector } from 'react-redux';

const ChatMsg = () => {
 let messageInfo = useSelector(state=>state.msgInfo.value)
  
  return (
    <div className='msgBox'>
      <div className='msgBoxPro'>
        <div className='msgBoxProfile'>
          <img src={profile} alt="pp" />
          <h1>{messageInfo.name}</h1>
        </div>
        <BsThreeDotsVertical className='msgIcon3Dots' />
      </div>
      <hr />
      <div className='msgChatBox'>
        {/* receive msg start */}
        <div>
          <p className='msgText'>hey... receive ?</p>
        </div>
        {/* receive msg end */}
        {/* receive pic start */}
        <div>
          <ModalImage className='msgPic'
            small={regimg}
            large={regimg}
            alt="Hello World!"
          />
        </div>
        {/* receive pic end */}
        {/* receive audio start */}
        <div className='msgAudio'>
          <audio controls></audio>
        </div>
            {/* receive msg end */}

            {/* send msg start */}
            <div className='sendMsg'>
              <p className='msgText sendText'>hey... send ?</p>
            </div>
            {/* send msg end */}
            {/* send pic start */}
            <div className='sendMsg'>
              <ModalImage className='msgPic'
                small={regimg}
                large={regimg}
                alt="Hello World!"
              />
            </div>
            {/* send pic end */}
             {/* send audio start */}
        <div className='msgAudio sendMsg'>
          <audio  controls></audio>
        </div>
            {/* send msg end */}
        </div>
        <hr />
        <div className='inputPart'>
        <div class="input-box" contenteditable="true">your inputs</div>
           <FiSend className='sendIcon'/>
        </div>
      </div>
      )
}

      export default ChatMsg