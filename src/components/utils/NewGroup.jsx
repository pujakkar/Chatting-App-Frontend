import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import {ArrowBack as BackIcon} from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { toggle } from '../../featured/counter/counterSlice';
import {useInputValidation} from '6pp'
import { useState } from "react";
import { useCreateGroupMutation, useGetFriendsQuery } from "../../service/api";
import GroupMembers from "./GroupMembers";
import toast from "react-hot-toast";

const NewGroup = () => {
    const dispatch=useDispatch()
    const search=useInputValidation()
    const [selectedMember,setSelectedMembers]=useState([])

    const myFriends=useGetFriendsQuery('')
    //console.log(myFriends.data?.transformedChats)
    const [newGroup]=useCreateGroupMutation()

    const selectMemberHandler=(id)=>{
        setSelectedMembers((prev)=>prev.includes(id)?prev.filter((curr)=>curr!==id): [...prev,id])
    }

    //console.log(selectedMember)

    const submitHandler=async()=>{
        if(!search.value){
            toast.error('Group name is required')
            return;
        }  
        if(selectedMember.length<2){
            toast.error('Group should contain atleast 3 members')
            return;
        }  
        const res=await newGroup({
            name:search.value,
            members:selectedMember,
        })

        if(res.data){
            toast.success(res.data.message)
            setSelectedMembers([])
            return;
        }
        return toast.error(res.error.message)


    }
    const cancleHandler=()=>{
        setSelectedMembers([]);
    }
  return (
    <Stack sx={{
        height:'100%'
    }}>
        <Box sx={{
            display:'flex',
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
            <Typography>New Group</Typography>
        </Box>
        <Stack spacing={'1rem'} sx={{
            padding:'2rem',
            height:'90%',
            overflowY:'auto',
            overflowX:'auto'
        }}>
        <TextField value={search.value} onChange={search.changeHandler} label='Group Name' 
        sx={{
            height:'10%'
        }}/>
        <Typography variant="body2">Members</Typography>
        {
            myFriends.data?.transformedChats.map((chat,index)=>{
                const {fullName,_id,avatar}=chat

                    return(
                        <GroupMembers key={index} name={fullName} _id={_id} avatar={avatar} handler={selectMemberHandler} 
                        isAdded={selectedMember.includes(_id)}/>
                    )
                
            })
        }
        </Stack>
        {selectedMember.length>0? (
                    <Stack spacing={'3rem'} direction={'row'} sx={{
                        justifyContent:'center',
                        alignItems:'center',
                        height:'10%'
                    }}>
                        <Button variant="contained" onClick={submitHandler}>Create</Button>
                        <Button variant="contained" color="error" onClick={cancleHandler}>Cancle</Button>
                    </Stack>
        ):<></>}
    </Stack>
  )
}

export default NewGroup