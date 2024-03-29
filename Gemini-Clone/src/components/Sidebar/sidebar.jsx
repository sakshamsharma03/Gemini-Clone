import React, { useState } from 'react'
import './sidebar.css'
import { assets} from '../../assets/assets'
const sidebar = () => {
    const[extended,setExtended]=useState(false);
  return (
    <div>
    <div className='sidebar'>
        <div className="top">
           <img onClick={()=>{setExtended(!extended)}}  src={assets.menu_icon} className='menu' alt="" />
           <div className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extended?<p>New Chat</p>:null}
           </div>
           {extended?
           <div className="recents">
                <p className="recent-titles">Recent</p>
                <div className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>What is react</p>
                </div>
            </div>:null}
        </div>
        <div className="bottom">
        <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
           {extended? <p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
           {extended? <p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.send_icon} alt="" />
           {extended? <p>Settings</p>:null}
        </div>
       

        </div>
        </div>
    </div>
  )
}

export default sidebar