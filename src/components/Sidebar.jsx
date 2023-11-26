import React, { useEffect } from 'react'
import profile from "../assets/profile.png"
import { LiaHomeSolid } from "react-icons/lia";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { VscSignOut } from "react-icons/vsc";
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
   let navigate = useNavigate()

  return (
    <>
     <div className='holeSideBar'>
        <img src={profile} alt="Profile pic" />
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

     </div>
    </>
  )
}

export default Sidebar