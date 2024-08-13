import { Stack, Typography, IconButton, Paper, InputBase, } from "@mui/material"
import {ArrowBack as BackIcon,Search as SearchIcon} from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { toggle } from '../../featured/counter/counterSlice';
import SearchUser from "./SearchUser";
import {useInputValidation} from '6pp'
import { useLazySearchUserQuery } from "../../service/api";
import { useEffect, useState } from "react";



const NewChat = () => {
    const dispatch=useDispatch()
    const search=useInputValidation('')

    const [user,setUser]=useState([])

    const [searchUser]=useLazySearchUserQuery()

    useEffect(()=>
    {
      const timeoutId=setTimeout(() => {
        searchUser(search.value)
        .then(({data})=>{
          if(search.value===""){
            setUser([])
          }
          else{
            setUser(data.users)
          } 
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
            <SearchUser sampleUsers={user}/>
        </Stack>
    </Stack>
  )
}

export default NewChat