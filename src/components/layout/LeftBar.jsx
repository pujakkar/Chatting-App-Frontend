import {IconButton, InputBase, Paper } from "@mui/material";
import Header from "./Header";
import {  Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import ProfileCard from "../utils/ProfileCard";
import Groups from "../utils/Groups";
import NewChat from "../utils/NewChat";
import ChatList from "../utils/ChatList";
import { sampleChats } from "../../sample/sample"
import { useNavigate, useParams } from "react-router-dom";
import {useInputValidation} from '6pp'
import NewGroup from "../utils/NewGroup";
import { useGetChatsQuery } from "../../service/api";
import { alertMessage, isUserChat, notificationIncreament, toggle } from "../../featured/counter/counterSlice";
import { useCallback, useEffect} from "react";
import {NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS} from '../lib/event'
import { getSocket } from "../utils/Socket";
import { getOrSaveItem } from "../lib/fileformat";
import SearchMyFriends from "../utils/SearchMyFriends";

import ChatListLoader from "./ChatListLoader";


const LeftBar = () => {
  const isOpen = useSelector((state) => state.counter.value);
  const userD=useSelector((state)=>state.counter.user)
  const newMessagesAlert=useSelector((state) => state.counter.newMessagesAlert);
  const notificationCount=useSelector((state)=>state.counter.notificationCount)

  //console.log(newMessagesAlert)


  const dispatch=useDispatch()
  const params=useParams()

  const chatId=params.chatId


  const navigate=useNavigate()

  const search=useInputValidation()

  const {data, error, isLoading, refetch,} =useGetChatsQuery("");

  useEffect(()=>{
    if(userD){
      refetch()
    }

  },[userD])

  useEffect(()=>{
    if(data){
      // console.log(data.transformChats)

        dispatch(isUserChat(data.transformChats))
    }
    return()=>{
      dispatch(isUserChat(null))
    }
  },[userD,data,dispatch])

  const handleNewReq=useCallback(()=>{
    dispatch(notificationIncreament())
  },[dispatch])

  const handleNewAlert=useCallback((data)=>{
    // console.log(data)
    //console.log('chatId',chatId)
    // console.log(data.chatId)
    if(chatId){
      if(data.chat._id===chatId){
        return; 
      } //if i am on same chat count should not increase
      //console.log('hii')
      dispatch(alertMessage(data))
      //console.log('heyy')
      //console.log(newMessagesAlert)
    }
    else{
      dispatch(alertMessage(data))
    }
    //console.log(data)

  },[chatId])


  const handleRefetch=useCallback(() => {
    refetch();
    navigate("/");
  }, [refetch, navigate]);



  useEffect(()=>{
    getOrSaveItem({key:NEW_REQUEST,value:notificationCount})
  },[notificationCount])

  useEffect(()=>{
    getOrSaveItem({key:NEW_MESSAGE_ALERT,value:newMessagesAlert})
  },[newMessagesAlert])



  const socket=getSocket()

  useEffect(() => {

    socket.on(NEW_REQUEST, handleNewReq)
    socket.on(NEW_MESSAGE_ALERT,handleNewAlert)

    socket.on(REFETCH_CHATS,handleRefetch)

    return () => {
        socket.off(NEW_REQUEST, handleNewReq)
        socket.off(NEW_MESSAGE_ALERT,handleNewReq)
        socket.off(REFETCH_CHATS,handleRefetch)
    }
}, [socket, handleNewReq, handleNewAlert,handleRefetch])

// console.log('user',userD)
// console.log('chats of user',chatList)

  

  if (isLoading) {
    return <ChatListLoader/>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.transformChats) {
    return <div>No chats available</div>;
  }




  switch (isOpen) {
    case 'home':
      return(
        <div style={{
          height:'100%',
        }}>
          <div style={{
            height:'10%'
          }}>
          <Header />
          </div>
          <div style={{
            height:'10%'
          }}>
              <Paper component={'form'} sx={{
              p: '1rem 2rem', display: 'flex', alignItems: 'center', 
              height: '100%',
              marginTop: '1rem'
            }}>
              <IconButton type="button">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search friends"
                inputProps={{ 'aria-label': 'search' }}
                value={search.value}
                onChange={search.changeHandler}
                onClick={()=>dispatch(toggle('searchFriends'))}
              />
            </Paper>
          </div>
        <div style={{
          height:'77.5%'
        }}>
          
        <ChatList sampleChats={data?.transformChats} chatId={chatId} 
        newMessagesAlert={newMessagesAlert}
        />
        </div>
      </div>
      )
    case 'profile':
      return(
        <div style={{
          height:'100%',
        }}>
            <ProfileCard/>
        </div>
      )
    case 'group':
      return(
        <div style={{
          height:'100%'
        }}>
            <Groups sampleChats={sampleChats} chatId={chatId} />
        </div>
      )
    case 'newChat':
      return(
        <div style={{
          height:'100%'
        }}>
            <NewChat/>
        </div>
      )
    case 'newGroup':
      return(
        <div style={{
          height:'100%'
        }}>
          <NewGroup sampleChats={sampleChats} />
        </div>
      )
    case 'searchFriends':
      return(
        <div style={{
          height:'100%'
        }}>
          <SearchMyFriends/>
        </div>
      )
  }

}

export default LeftBar;
