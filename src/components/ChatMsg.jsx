import React, { useState, useEffect } from 'react'
import profile from "../assets/profile.png"
import regimg from "../assets/regimg.png"
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalImage from "react-modal-image";
import { FiSend } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import moment from 'moment';
import { FaCamera } from "react-icons/fa";
import { AiOutlineAudio } from "react-icons/ai";
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { getStorage, ref as sraf, uploadBytes, getDownloadURL } from "firebase/storage";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { AudioRecorder } from 'react-audio-voice-recorder';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const MyButton = styled(Button)({
  padding: "0px 0px",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "20px",
  backgroundColor: "#5F35F5",
  '&:hover': {
    color: "#fff",
    fontSize: "20px",
    backgroundColor: "#5F35F5",
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const ChatMsg = () => {
  const db = getDatabase();
  const storage = getStorage();
  let userInfo = useSelector(state => state.userInfo.value)
  let messageInfo = useSelector(state => state.msgInfo.value)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let [msg, setMsg] = useState("")
  let [downloadUrl, setDownloadUrl] = useState("")
  let [singleMsgId, setSingleMsgId] = useState("")
  let [msgList, setMsgList] = useState([])


  let handlesendMsg = () => {
    if (msg == "") {
      toast("type some text")
    } else {

      if (messageInfo.status == "single") {
        set(push(ref(db, 'singleMsg')), {
          whoSendMsg: userInfo.displayName,
          whoSendMsgId: userInfo.uid,
          whoReceiveMsg: messageInfo.name,
          whoReceiveMsgId: messageInfo.id,
          msg: msg,
          time: moment().calendar()
        }).then(() => {
          setMsg("");
        })
      }
    }
  }
  let handleImageMsg = () => {
    if (messageInfo.status == "single") {
      set(push(ref(db, 'singleMsg')), {
        whoSendMsg: userInfo.displayName,
        whoSendMsgId: userInfo.uid,
        whoReceiveMsg: messageInfo.name,
        whoReceiveMsgId: messageInfo.id,
        img: downloadUrl,
        time: moment().calendar()
      }).then(() => {
        setOpen(false)
      })
    }

  }

  useEffect(() => {
    const singleMsgRef = ref(db, 'singleMsg');
    onValue(singleMsgRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (userInfo.uid == item.val().whoSendMsgId && messageInfo.id == item.val().whoReceiveMsgId || userInfo.uid == item.val().whoReceiveMsgId && messageInfo.id == item.val().whoSendMsgId) {

          arr.push(item.val())
          setSingleMsgId(item.key)
        }
      })
      setMsgList(arr)

    });
  }, [messageInfo.id])

  let handleSendPicture = (e) => {
    const storageRef = sraf(storage, singleMsgId);
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(storageRef).then((downloadURL) => {
        setOpen(true)
        setDownloadUrl(downloadURL)
      })

    });
  }

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    console.log(blob);
    // const audio = document.createElement("audio");
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
  };

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
        {msgList.map(item => (

          <>

            {userInfo.uid == item.whoReceiveMsgId ?
              <div>
                {item.msg ?
                  <>
                    {/* receive msg start */}
                    <div>
                      <p className='msgText'>{item.msg}</p>
                    </div>
                    <p className='receivetime'>{item.time}</p>
                    {/* receive msg end */}
                  </>
                  :
                  <>
                    {/* receive pic start */}
                    <div>
                      <ModalImage className='msgPic'
                        small={item.img}
                        large={item.img}
                        alt="Hello World!"
                      />
                    </div>
                    <p className='receiveImgTime'>{item.time}</p>
                    {/* receive pic end */}
                  </>
                }
              </div>
              :
              <>
                {item.msg ?
                  <>
                    {/* send msg start */}
                    <div className='sendMsg'>
                      <p className='msgText sendText'>{item.msg}</p>
                    </div>
                    <p className='sendtime'>{item.time}</p>
                    {/* send msg end */}
                  </>

                  :
                  <>
                    {/* send pic start */}
                    <div className='sendMsg'>
                      <ModalImage className='msgPic'
                        small={item.img}
                        large={item.img}
                        alt="Hello World!"
                      />
                    </div>
                    <p className='sendImgTime'>{item.time}</p>
                    {/* send pic end */}
                  </>
                }

              </>
            }
          </>
        ))}


        {/* receive audio start */}
        {/* <div className='msgAudio'>
          <audio controls></audio>
        </div> */}
        {/* receive audio end */}



        {/* send audio start */}
        {/* <div className='msgAudio sendMsg'>
          <audio  controls></audio>
        </div> */}
        {/* send audio end */}
      </div>
      <hr />
      <div className='inputPart' >
        <input className="input-box" type="text" onChange={(e) => setMsg(e.target.value)} value={msg} />
        <FiSend className='sendIcon' onClick={handlesendMsg} />
        <div>
          <MyButton onChange={handleSendPicture} component="label" variant="contained">
            <FaCamera className='sendIcon' />
            <VisuallyHiddenInput type="file" />
          </MyButton>

        </div>
        <div className='voiceIcon'>
          <AudioRecorder 
            onRecordingComplete={addAudioElement}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            downloadOnSavePress={true}
            downloadFileExtension="webm"
          />
        </div>
        
      </div>

      <>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='imageModalBox'>
              <img className='downloadUrl' src={downloadUrl} alt="sds" />
              <div className='imageModalBoxButton'>
                <Button onClick={handleImageMsg} variant="contained">Send</Button>
                <Button variant="outlined" color="error">Cancel</Button>
              </div>
            </div>
          </Box>
        </Modal>
      </>

    </div>
  )
}

export default ChatMsg