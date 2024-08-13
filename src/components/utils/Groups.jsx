import { Stack,Box, Typography, IconButton, Divider } from "@mui/material"
import {ArrowBack as BackIcon} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '../../featured/counter/counterSlice';
import ChatItem from "./ChatItem";
import { useMyGroupsQuery } from "../../service/api";
import { useEffect } from "react";

const Groups = ({ chatId}) => {
    const dispatch=useDispatch()
    const userD=useSelector((state)=>state.counter.user)


    console.log(userD)

    const {data,refetch,isLoading}=useMyGroupsQuery('')

    useEffect(()=>{
        refetch()
    },[userD])



    

  return isLoading? <div>Loading...</div> :(
    <Stack sx={{
        height:'100%'
    }}>
        <Box sx={{
            display:'flex',
            alignItems:'center',
            height:'5rem',
            backgroundColor:'rgb(53, 114, 239)',
            color:'white',
        }}>
            <IconButton onClick={()=>dispatch(toggle('home'))}>
                <BackIcon sx={{
                    color:'white'
                }}/>
            </IconButton>
            <Typography>Groups</Typography>
        </Box>
        <Stack>
            {data?.transformChats?.map((chat,index)=>{
                const {avatar,_id,name,groupChat,members}= chat
                if(groupChat===true){
                    return(
                        <>
                        <ChatItem 
                        avatar={avatar} 
                        name={name}
                         groupChat={groupChat} 
                         members={members} 
                         key={index} 
                         sameSender={chatId===_id}
                          _id={_id}
                        />
                        <Divider variant="middle"/>
                        </>
                    )
                }
            })}
        </Stack>
    </Stack>
  )
}

export default Groups