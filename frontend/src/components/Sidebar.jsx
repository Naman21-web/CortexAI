import React, { useEffect, useState } from 'react'
import {getConversations} from '../features/getConversations.js';
import {createConversation} from '../features/createConversation.js'
import { MessageSquare, PanelLeftIcon, PenBoxIcon, Plus, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { addConversation, setConversations, setSelectedConversation  } from '../redux/conversationSlice';

const Sidebar = () => {
    // const [collapsed,setCollapsed] = useState(false);
    const [imageError,setImageError] = useState(false);
    const dispatch = useDispatch();
    const {conversations,selectedConversation} = useSelector(state => state.conversation);
    const {userData} = useSelector((state) => state.user);

    useEffect(() => {
        const getConversation = async() => {
            const data = await getConversations();
            dispatch(setConversations(data));
        };
        console.log("All Conversations: ",conversations);
        getConversation();
    },[])
    
    const createNewConversation = async () => {
        console.log("All Conversations: ",conversations);
        console.log("Got request for creating new Conv");
        console.log("User Data from Sidebar: ",userData);
        const data = await createConversation();
        dispatch(addConversation(data));
    }

    console.log("User Data from Sidebar: ",userData);


  return (
    <div className='fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06]'>
       <div className='flex flex-col h-full'>
            <div className='flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]'>
                <div  className='hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'>
                   <PanelLeftIcon /> 
                </div>   
                <span className='text-[16px] font-semibold text-slate-100 tracking-tight flex-1'>CortexAI</span>   
                <span className='text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide'>free</span>  
                <button type="button" className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer' onClick={(createNewConversation)}>
                    <PenBoxIcon size={14}/>                    
                </button>        
            </div>

            <div className='px-4 pt-4 pb-1'>
                <button className='w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-linear-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150' onClick={(createNewConversation)}>
                    <Plus size={15}/>
                    New Chat
                </button>
            </div>

            {conversations.length==0 ? 
                <div className='px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
                    No Recent Conversations     
                </div>
                :
                (
                <div className='px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
                    Recent Conversations
                </div>  
                )      
            }
            <div className='flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                {conversations.map((conv,i)=>{
                    const isActive = selectedConversation?._id==conv?._id;
                    return (
                        <div key={i} onClick={()=>dispatch(setSelectedConversation(conv))} className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 ${isActive ? "bg-indigo-500/10 border-indigo-500/[0.18]" : "bg-transparent border-transparent"}`}>
                            <div className={`flex items-center justify-center shrink-0 w-[20px] h-[28px] rounded-lg transition-colors duration-150 ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/[0.05] text-slate-500"}`}>
                                <MessageSquare size={13}/>
                            </div>
                            <span className={`text-[13px] font-medium truncate ${isActive ? "text-slate-100" : "text-slate-300"}`}>{conv?.title ?? "New Chat"}</span>
                        </div>                            
                    )
                })}

            </div>

            <div className='mx-2.5 bg-white/[0.06]'>
                <div className='px-3.5 py-3.5'>
                    {userData ? (
                        <div className='flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150'>
                           <div className='relative shrink-0'>
                                {
                                    (userData?.avatar && !imageError) 
                                    ?
                                    <img className='w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25' src={userData?.avatar} alt={"image"} onError={()=>setImageError(true)}/>
                                    :
                                    <div className='w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25'>
                                        <User size={15} className='text-slate-400'/> 
                                    </div>                                        
                                }
                            </div>     
                        </div> ) :
                        <button>
                            Login    
                        </button>}
                </div>
            </div>

        </div>
    </div>
  )
}

export default Sidebar;
