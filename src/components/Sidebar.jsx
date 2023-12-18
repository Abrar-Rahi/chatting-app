import React, { useEffect,useState,createRef,useRef  } from 'react'
import profile from "../assets/profile.png"
import { LiaHomeSolid } from "react-icons/lia";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { VscSignOut } from "react-icons/vsc";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dref, set } from "firebase/database";
import { getAuth,updateProfile } from "firebase/auth";
import { loginInfo } from '../slices/userSlice';
import { Watch } from  'react-loader-spinner'


// const defaultSrc =
//   "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";


const style = {
   position: 'absolute' ,
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '2px solid green',
   boxShadow: 24,
   p: 4,
 };

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

const Sidebar = () => {

  const db = getDatabase();
  const storage = getStorage();
  const auth = getAuth();

   let navigate = useNavigate()
   let dispatch = useDispatch()
   let userInfo = useSelector(state=>state.userInfo.value)
   
 
   

   let [loader,setLoader]=useState(false)
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [image, setImage] = useState("");
  //  const [cropData, setCropData] = useState("#");
   const cropperRef = createRef();

   const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
      setLoader(true)
    if (typeof cropperRef.current?.cropper !== "undefined") {
      // setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      let croperData = cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
      const storageRef = ref(storage, userInfo.uid);
      uploadString(storageRef, croperData, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
             photoURL: downloadURL
          }).then(()=>{
            set(dref(db, 'users/' + userInfo.uid), {
              username: userInfo.displayName,
              email: userInfo.email,
              profile_picture : downloadURL
            }).then(()=>{

              dispatch(loginInfo({...userInfo, photoURL: downloadURL }))
              localStorage.setItem("user",JSON.stringify({...userInfo, photoURL: downloadURL}))
              setLoader(false)
              setOpen(false)
              setImage("")
            })
          })
        });
      });
      
    }
  };


  return (
    <>
     <div className='holeSideBar'>
        <div onClick={handleOpen}>
        <img className='profilePic' src={userInfo.photoURL} alt="Profile pic" />
        <div>
           <h3 className='profileName'>{userInfo.displayName}</h3>
        </div>
        </div>
        <div className='allIcon'>
           
               <Link to="/page/home" className={window.location.pathname == "/page/home" && "active"}>
                     <LiaHomeSolid className='icons'/>
               </Link>
            
               <Link to="/page/msg" className={window.location.pathname == "/page/msg" && "active"}>
                     <AiOutlineMessage className='icons'/>
               </Link>
            

               <Link to={"/page/notification"} className={window.location.pathname=="/page/notification"&& "active"}>
                  <IoMdNotificationsOutline className='icons'/><br />
               </Link>

               <Link to={"/page/setting"} className={window.location.pathname=="/page/setting"&& "active"}>
                  <CiSettings className='icons'/>
               </Link>

               <Link to={"/page/logout"} className={window.location.pathname=="/page/logout"&& "active"}>
                  <VscSignOut className='icons'/>
               </Link>
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload your profile picture
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

        {image ? 
        <div className='previue-box prev-profile'>
        <div
          className="img-preview"
        ></div>
        </div>
        :
        <img className='profilePic prev-profile' src={userInfo.photoURL} alt="Profile pic" />
        }
          
        
          <div className='chooseButton'>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Choose your image
                <VisuallyHiddenInput type="file" onChange={onChange}/>
          </Button>
          </div>
         

         
         
         {image &&
         
         <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={100}
          minCropBoxWidth={100}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
        
          }

          {image &&
          <div className='upload-cencle-btn'>
            {loader ? 
            <Button>
            <Watch
              height="30"
              width="40"
              radius="48"
              color="#4fa94d"
              ariaLabel="watch-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
         </Button>
          :
          
          <div className='uploadButton'>
            <Button  variant="contained" onClick={getCropData}>Upload</Button>
          </div>
          }
          <div>
            
            <Button onClick={()=>setImage("")}  variant="outlined" color="error">Cancle</Button>
          </div>
          </div>
          }
          </Typography>
        </Box>
      </Modal>
     </div>
    </>
  )
}

export default Sidebar