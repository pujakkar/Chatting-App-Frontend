import {Box,AppBar,Toolbar,Badge, IconButton, Avatar, Tooltip, Backdrop} from '@mui/material'
import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon ,Chat as ChatIcon ,Notifications as NotificationIcon} from '@mui/icons-material';
import { useDispatch,useSelector } from 'react-redux'
import { notificationReset, toggle } from '../../featured/counter/counterSlice';
import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { useGetNotificationQuery } from '../../service/api';
import { getSocket } from '../utils/Socket';
import { NEW_REQUEST, NEW_REQUEST_ACCEPTED } from '../lib/event';
import { getOrSaveItem } from '../lib/fileformat';
const  Notification =lazy(()=> import('../utils/Notification'))
const Logout=lazy(()=>import('../utils/Logout'))

const Header = () => {
   const [isNotification,setIsNotification]=useState(false)
   const [isLogout,setIsLogout]=useState(false)
   const dispatch=useDispatch()

   const socket=getSocket()

   const handleClose=()=>{
      setIsNotification(false)
      setIsLogout(false)
   }
   //const [noti,setNoti]=useState(null)

   const notificationCount = useSelector((state) => state.counter.notificationCount);
   // console.log(notificationCount)
   const {data,refetch}=useGetNotificationQuery()


   useEffect(()=>{
      //console.log(notificationSent,'inside')
      if(notificationCount>=0){
         refetch()
      }
   },[notificationCount])

   const handleAccept=useCallback(()=>{
      refetch()
   },[socket])

   useEffect(()=>{

      socket.on(NEW_REQUEST_ACCEPTED,handleAccept)

      return()=>{
         socket.off(NEW_REQUEST_ACCEPTED,handleAccept)
      }

   },[socket,handleAccept])
   const user = useSelector((state) => state.counter.user);


   if(isNotification){
      dispatch(notificationReset())
      getOrSaveItem({key:NEW_REQUEST,value:notificationCount})
   }
  return (
   <>
       <Box sx={{
         height:'100%'
       }}>
        <AppBar position='static' sx={{
         height:'100%'
        }}>
            <Toolbar>
                <Box>
                  <Tooltip title='Profile' placement='bottom-end'>
                     <IconButton onClick={()=>dispatch(toggle('profile'))}>
                     <Avatar src={user.avatar}/>
                     </IconButton>
                  </Tooltip>
                </Box>
                 <Box flexGrow={1}/>
                 <Box>
                  <Tooltip title='Groups' placement='bottom-end'>
                     <IconButton onClick={()=>dispatch(toggle('group'))}>
                     <GroupIcon/>
                     </IconButton>
                  </Tooltip>
                  <Tooltip title='New Group' placement='bottom-end'>
                     <IconButton onClick={()=>dispatch(toggle('newGroup'))}>
                     <AddIcon/>
                     </IconButton>
                  </Tooltip>
                  <Tooltip title='New Chat' placement='bottom-end'>
                     <IconButton onClick={()=>dispatch(toggle('newChat'))}>
                     <ChatIcon/>
                     </IconButton>
                  </Tooltip>
                  <Tooltip title='Notification' placement='bottom-end'>
                     <IconButton onClick={()=>setIsNotification(true)}>
                        {notificationCount>0? <Badge badgeContent={notificationCount} color='secondary'>
                     <NotificationIcon/>
                     </Badge> : <Badge color='secondary'>
                     <NotificationIcon/>
                     </Badge> }
                     </IconButton>
                  </Tooltip>
                  <Tooltip title='Logout' placement='bottom-end'>
                     <IconButton onClick={()=>setIsLogout(true)}>
                     <LogoutIcon/>
                     </IconButton>
                  </Tooltip>
                 </Box>
            </Toolbar>
        </AppBar>
    </Box>

    {isNotification && (
                <>
                <Backdrop open/>
                <Suspense fallback={null}>
                    <Notification handleClose={handleClose} sampleNotification={data?.allRequest}/>
                </Suspense>
            </>
    )}
    {
      isLogout && (
         <>
               <Backdrop open/>
                <Suspense fallback={null}>
                    <Logout handleClose={handleClose}/>
                </Suspense>
         </>
      )
    }
   </>
  )
}

export default Header