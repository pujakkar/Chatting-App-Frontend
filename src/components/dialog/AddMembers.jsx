import {  Button, Dialog, Stack, Typography } from "@mui/material"

import { useAddInGroupMutation, useGetFriendsQuery } from "../../service/api"
import { useEffect, useState } from "react"
import GroupMembers from "../utils/GroupMembers"
import toast from "react-hot-toast"


const AddMembers = ({chatId,open,handleClose,membersPresent=[]}) => {

    const myFriends=useGetFriendsQuery('')
    const [add]=useAddInGroupMutation()


    const [membersToAdd,setMembersToAdd]=useState([])
    const [membersAdd,setMembersAdd]=useState([])


    const handleAdd=async()=>{
        const res=await add({chatId,membersAdd})

        if(res.data){
            toast.success('Member added successfully')
            setMembersAdd([])
            handleClose()
            return
        }
        toast.error(res.error.message)
        setMembersAdd([])
    }

    const handleSubmit=()=>{
        if(membersAdd.length>0){
            handleAdd()
        }
        else{
            toast.error('There should be atleast 1 member to add')
        }
    }

    const handleCancle=()=>{
        setMembersAdd([])
    }

    useEffect(()=>{
        if(myFriends.data){
            const toAdd=myFriends.data.transformedChats.filter((member) => !membersPresent.some(m => m._id === member._id))
            setMembersToAdd(toAdd)
        }
    },[myFriends.data,membersPresent])

    const handler=(_id)=>{
        setMembersAdd((prev)=>membersAdd.includes(_id)?membersAdd.filter((id)=>id!==_id) :[...prev,_id] )
    }

  return (
    <Dialog open={open} onClose={handleClose} >
        <Stack justifyContent='center' alignItems='center' paddingTop='1.5rem' paddingBottom='0.5rem'>
            <Typography>Add Members</Typography>
            {membersToAdd.length>0? membersToAdd.map((member,index)=><GroupMembers avatar={member.avatar} _id={member._id} name={member.fullName} handler={handler} isAdded={membersAdd.includes(member._id)} key={index}/>):(<div>Loading...</div>)}
            {membersAdd.length>0 ? 
            <Stack direction='row' spacing='1rem' paddingTop='1rem'>
                <Button variant="contained" onClick={handleSubmit}>Add</Button>
                <Button variant="outlined" color="error" onClick={handleCancle}>Cancle</Button>
            </Stack>:<div></div>}
        </Stack>

    </Dialog>
  )
}

export default AddMembers