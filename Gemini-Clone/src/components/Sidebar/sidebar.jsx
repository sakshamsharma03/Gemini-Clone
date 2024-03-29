import React, { useContext, useState } from 'react'
import './sidebar.css'
import { assets} from '../../assets/assets'
import { Context } from '../../Context/context';
const sidebar = () => {
    const[extended,setExtended]=useState(false);
    const {newChat,onSent,prevPrompts,setRecentPrompt}=useContext(Context);
    
    const loadPrompt=async(prompt)=>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

  return (
    <div>
    <div className='sidebar'>
        <div className="top">
           <img onClick={()=>{setExtended(!extended)}}  src={assets.menu_icon} className='menu' alt="" />
           <div onClick={()=>newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extended?<p>New Chat</p>:null}
           </div>
           {extended?
           <div className="recents">
                <p className="recent-titles">Recent</p>
                {prevPrompts.map((item,index)=>{
                    return(

                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0)}...</p>
                </div>
                    )
                }
                )}
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