import { AppBar, Avatar, AvatarGroup, Box, Button, IconButton, InputBase, Stack, Toolbar, Typography } from "@mui/material"
import { ArrowBack as BackIcon, AttachFile as AttachIcon,Send as SendIcon } from "@mui/icons-material"
import MenuItem from "../dialog/MenuItem"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetAlert, toggleUserProfile } from "../../featured/counter/counterSlice"
import MessageComponent from "./MessageComponent"
import { transformImage } from "../lib/fileformat"
import { useNavigate } from "react-router-dom"
import { NEW_MESSAGE, START_TYPING } from "../lib/event"
import { getSocket } from "./Socket"
import { useDeleteChatMutation, useGetMessagesQueryQuery } from "../../service/api"
import {useInfiniteScrollTop} from "6pp"
import TypingLoader from "../lib/TypingLoader"
import DeleteChat from "../dialog/DeleteChat"
import toast from "react-hot-toast"

const Chatting = ({chatId}) => {
    const containerRef=useRef(null)

    const myChats=useSelector((state)=>state.counter.userChats)

    const user=useSelector((state)=>state.counter.user)
    const isUserProfie=useSelector((state)=>state.counter.isUserProfile)

    const isChat=myChats.find((chat)=>chat._id===chatId)

    const [isGroup,setIsGroup]=useState(false)
    const [isCreator,setIsCreator]=useState(false)

    useEffect(()=>{
        setIsGroup(isChat.groupChat)
        return()=>{
            setIsGroup(false)
        }
    },[chatId])
    console.log(isGroup)

    useEffect(()=>{
        if(isChat.groupChat===true){
            // console.log('chat creator',isChat.creator)
            // console.log('user',user._id)
            if(isChat.creator===user._id){
                setIsCreator(true)
            }
        }
        return()=>{
            setIsCreator(false)
        }
    },[chatId])

    const [newMessages,setNewMessages]=useState([])

    const [anchorEl,setAnchorEl]=useState(null)
    const dispatch=useDispatch()

    const navigate=useNavigate()

    const [message,setMessage]=useState('')

    const [userTyping,setUserTyping]=useState(false)
    const typingTimeout=useRef(null)
    const bottomRef=useRef(null)

    const [openDeleteDia,setOpenDeleteDia]=useState(false)

    const sampleChats=useSelector((state)=>state.counter.userChats);


    const {avatar,name}=sampleChats.find((chat)=>chat._id===chatId)

    const socket=getSocket()

    const attachments=[]

    const handleOnChange=(e)=>{
        setMessage(e.target.value)
        socket.emit(START_TYPING,{chatId,members:isChat.members})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!message.trim()) return 

        socket.emit(NEW_MESSAGE,{chatId,message,attachments,members:isChat.members})
        setMessage('')
    }

    const [page,setPage]=useState(1);

    const  {data}=useGetMessagesQueryQuery({chatId,page});

    const [deleteMutation]=useDeleteChatMutation()

    
    const handleDelete=async()=>{
        const res=await deleteMutation({chatId})

        if(res.data){
            toast.success('Chat Deleted')
            handleClose()
            navigate('/')
            return
        }
        toast.error(res.error.message)
        handleClose()
    }


    useEffect(()=>{

        dispatch(resetAlert(chatId))  //when i open a chat alert should vanish
        return()=>{
            setMessage("")
            setNewMessages([])
            setOldMessages([])
            setPage(1)
        };
    },[chatId])
    const handleNewMessages = useCallback((data) => {
        //if(data.chat!==chatId) return;  
        //console.log(data.message)
        setNewMessages((prev) => [...prev, data.message])
    },[chatId])
    //console.log(newMessages)

    useEffect(()=>{
        if(bottomRef.current){
            bottomRef.current.scrollIntoView({behavior:'smooth'})
        }
    },[newMessages,userTyping])

    const handleTyping=useCallback((data)=>{
        if(data.chatId!==chatId) return;
        setUserTyping(true)

        if(typingTimeout.current) clearTimeout(typingTimeout.current)

        typingTimeout.current=setTimeout(()=>{
            setUserTyping(false)
        },2000)
    },[chatId])


    const events={
        [NEW_MESSAGE]:handleNewMessages,
        [START_TYPING]:handleTyping
    }
    useEffect(() => {

        socket.on(NEW_MESSAGE, handleNewMessages)
        socket.on(START_TYPING,handleTyping)

        return () => {
            socket.off(NEW_MESSAGE, handleNewMessages)
            socket.off(START_TYPING,handleTyping)
        }
    }, [socket,events])

    const {data:oldMessages,setData:setOldMessages}=useInfiniteScrollTop(
        containerRef,
        data?.totalPages,
        page,
        setPage,
        data?.messages,
    )

    const allMessages=[...oldMessages,...newMessages]
    //console.log(allMessages)
    const handleMenu=(e)=>{
        setAnchorEl(e.currentTarget);
    }

    const open=Boolean(anchorEl)

    const handleClose=()=>{
        setAnchorEl(null)
    }

    const handleOpenDeleteDia=()=>{
        setOpenDeleteDia(true)
    }
    const handleCloseDeleteDia=()=>{
        setOpenDeleteDia(false)
    }
  return (
    <>
    <Stack  sx={{
        height:'10%',
    }}>
        <AppBar position='static' sx={{
         height:'100%',
        }}>
            <Toolbar sx={{
                display:'flex',
                gap:'0.5rem'
            }}> 
                <Box sx={{
                    marginLeft:'-1rem'
                }}>
                    <IconButton onClick={()=>{ navigate('/')
                        if(isUserProfie){
                            dispatch(toggleUserProfile())
                        }
                    } 
                    } sx={{
                        color:'white'
                    }}>
                        <BackIcon/>
                    </IconButton>
                </Box>
                <Stack direction={'row'}>
                    <IconButton onClick={()=>dispatch(toggleUserProfile())}>
                        {isChat.groupChat?             
                        <AvatarGroup max={4}>
                            {isChat.avatar.map((ava,index)=>(<Avatar src={transformImage(ava)} key={index}/>))}
                        </AvatarGroup>
                         : <Avatar src={transformImage(avatar)}/>}
                    </IconButton>
                </Stack>
                <Typography>{name}</Typography>
                 <Box flexGrow={1}/>
                 <Box>
                    {isGroup===false? <Button color="error" variant="contained" size="small" onClick={handleOpenDeleteDia}>
                        Delete Chat
                    </Button>:
                     isCreator===true? <Button color="error" variant="contained" size="small" onClick={handleOpenDeleteDia}>
                     Delete Chat
                 </Button>: <div></div>}
                    
                 </Box>
            </Toolbar>
        </AppBar>
    </Stack>
    <Stack 
    ref={containerRef}
    spacing={'1rem'}  
    sx={{
        height:'80%',
        overflowX:'hidden',
        overflowY:'auto',
        padding:'0.5rem'
    }}>
        {
            allMessages.map((msg,index)=><MessageComponent key={index} message={msg} user={user} isGroup={isGroup}/>)
        }

        { userTyping? <TypingLoader/> :''}
        <div ref={bottomRef}/>
    </Stack>
    <form onSubmit={handleSubmit} style={{
        height:'10%'
    }}>
        <Stack direction={'row'} spacing={'0.5rem'} sx={{
            height:'100%',
            alignItems:'center',
            backgroundColor:'rgb(238, 247, 255)',
            paddingRight:'1rem',
            paddingLeft:'1rem'
        }}>
            <IconButton onClick={handleMenu}>
                <AttachIcon/>
            </IconButton>
            <InputBase placeholder="Type Message" value={message} onChange={(e)=>handleOnChange(e)} sx={{
                width:'100%',
                backgroundColor:'white',
                borderRadius:'0.5rem',
                padding:'0.5rem'
            }}/>
            <IconButton type="submit" sx={{
                color:'rgb(75, 112, 245)'
            }}>
                <SendIcon/>
            </IconButton>
        </Stack>
    </form>
    <MenuItem open={open} anchorEl={anchorEl} handleClose={handleClose} chatId={chatId}/>
    <DeleteChat open={openDeleteDia} handleClose={handleCloseDeleteDia} deleteSet={handleDelete}/>
    </>
  )
}

export default Chatting