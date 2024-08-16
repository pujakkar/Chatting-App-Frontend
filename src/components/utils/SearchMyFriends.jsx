import { Stack, Typography, IconButton, Paper, InputBase, } from "@mui/material"
import {ArrowBack as BackIcon,Search as SearchIcon} from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { toggle } from '../../featured/counter/counterSlice';
import {useInputValidation} from '6pp'
import { useLazySearchFriendsQuery} from "../../service/api";
import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";

const SearchMyFriends = () => {
    const dispatch=useDispatch()
    const search=useInputValidation('')

    const [user,setUser]=useState([])

    const [searchUser]=useLazySearchFriendsQuery()

    useEffect(()=>
    {
      const timeoutId=setTimeout(() => {
        searchUser(search.value)
        .then((data)=>{
            setUser(data.data.userChats)
        })
        .catch((err)=>console.log(err,"hii"))
      }, 1000);

      return()=>{
        clearTimeout(timeoutId)
      }
    },[search.value])


  return (
    <Stack sx={{
      height:'100%',
    }}>
        <Stack direction={'row'} sx={{
            alignItems:'center',
            height:'10%',
            backgroundColor:'rgb(53, 114, 239)',
            color:'white',
        }}>
            <IconButton onClick={()=>dispatch(toggle('home'))}>
                <BackIcon sx={{
                    color:'white'
                }}/>
            </IconButton>
            <Typography>New Chat</Typography>
        </Stack>
        <Stack sx={{
          height:'10%',
          marginBottom:'1rem'
        }}>
            <Paper component={'form'} sx={{
                  display: 'flex', alignItems: 'center', 
                  height:'100%'
                }}>
                  <IconButton type="button">
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    value={search.value}
                    onChange={search.changeHandler}
                  />
                </Paper>
        </Stack>
        <Stack sx={{
          height:'80%',
        }}>
            {user.map((singleChat,index)=>
            <ChatItem key={index} _id={singleChat._id} name={singleChat.name} avatar={singleChat.avatar} groupChat={singleChat.groupChat}/>)}
        </Stack>
    </Stack>
  )
}

export default SearchMyFriends