import { Avatar, Box, Button, IconButton, Stack, Typography } from "@mui/material"
import {PersonRemove as RemoveIcon, PersonAdd as AddIcon} from "@mui/icons-material"
import { transformImage } from "../lib/fileformat"
import { useSendReqMutation } from "../../service/api"
import toast from "react-hot-toast"
import { useState } from "react"


const AddUserItem = ({avatar,_id,name,handler}) => {


  const [isAdded,setIsAdded]=useState(false)
  const [sendFriendReq,{isLoading}]=useSendReqMutation()
  handler= async(id)=>{
    try {
      const res=await sendFriendReq({userId:id})
      if(res.data){
        toast.success(res.data.message)
        setIsAdded(true)
      }
      else{
        toast.error(res.error.data.message)
        console.log('hello',res.error)
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div style={{
        height:'4rem',
        display:'flex',
        alignItems:'center',
        paddingLeft:'1rem',
        paddingRight:'2rem',
    }}>
        <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} width={'100%'}>
        <Avatar
         src={transformImage(avatar)}/>
        <Typography>{name}</Typography>
        <Box sx={{
            flexGrow:'1'
        }}/>
        <Box>
        <IconButton onClick={()=>handler(_id)} size="small" sx={{
          bgcolor:isAdded?'error.main' :'primary.main',
          color:'white',
          '&:hover':{
            bgcolor: isAdded?'error.dark' :'primary.dark'
          },
          disabled:{isLoading},
        }}>
          {
            isAdded? <RemoveIcon color=""/>: <AddIcon/>
          }
        </IconButton>
        </Box>
        </Stack>
    </div>
  )
}

export default AddUserItem