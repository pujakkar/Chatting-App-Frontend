import { AppBar, Avatar, Box, Button, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material"
import {ArrowBack as BackIcon,Groups as GroupIcon,Edit as EditIcon,Done as DoneIcon} from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux"
import { toggleUserProfile } from "../../featured/counter/counterSlice"
import { useEffect, useState } from "react"
import { useGetChatDetailsQuery, useRemoveFromGroupMutation, useRenameGroupMutation } from "../../service/api"
import toast from "react-hot-toast"
import GroupItems from "./GroupItems"
import AddMembers from "../dialog/AddMembers"
import LeaveGroup from "../dialog/LeaveGroup"


const UserProfile = ({chatId}) => {
  const [membersToRem,setMembersToRem]=useState([])

  const user=useSelector((state)=>state.counter.user)
  const creators=useSelector((state)=>state.counter.groupCreators)
  const currentCreator=creators.find((creator)=>creator?._id===chatId)
 


  const {data,refetch}=useGetChatDetailsQuery({chatId},{skip:!chatId})
  
  const [groupMembers,setGroupMembers]=useState([])

  const [editName,setEditName]=useState('')
  const [editable,setEditable]=useState(false)
  const [addDiaOpen,setAddDiaOpen]=useState(false)
  const [isGroup,setIsGroup]=useState(true)
  const [singleMemberChat,setSingleMemberChat]=useState([])
  const [leaveDia,setLeaveDia]=useState(false)
 


  useEffect(()=>{

    refetch()
    const groupDetail=data
    if(groupDetail){
      
      setGroupMembers([groupDetail.chat.members])
      setEditName(groupDetail.chat.name)
      setIsGroup(groupDetail.chat.groupChat)

      if(groupDetail?.chat?.members?.length===2){
        setSingleMemberChat(groupDetail.chat.members.filter((member)=>member._id!==user._id))
      }
    }
    return()=>{
      setGroupMembers([])
      setEditName('')
      setIsGroup(true)
      setSingleMemberChat([])
    }
  },[data])

  const selectMembersToRemove=(_id)=>{
    setMembersToRem([_id])
  }


  const [rename]=useRenameGroupMutation()
  const [remove]=useRemoveFromGroupMutation()

  const handleEdit=async ()=>{
    if(editable){
      const res=await rename({chatId,name:editName})

      if(res.data){
        toast.success('Group name is edited successfully')
        setEditable((prev)=>!prev)
        return
      }
      toast.error(res.error.message)
      setEditable((prev)=>!prev)
      return
    }
    setEditable((prev)=>!prev)
  }


  const handleRemove=async()=>{
    const res=await remove({chatId,membersToRem})

    if(res.data){
      toast.success('Member is removed successfully')
      return
    }
    toast.error(res.error.message)
  }

    useEffect(()=>{
      if(membersToRem.length>0){
        handleRemove()
      }
      return()=>{
        setMembersToRem([])
        setGroupMembers([])
      }
  },[membersToRem])

  const dispatch=useDispatch()

  const handleAdd=()=>{
    setAddDiaOpen(true)
  }
  const handleLeave=()=>{
    setLeaveDia(true)
  }
  const handleLeaveDiaClose=()=>{
    setLeaveDia(false)
  }
  const handleDiaClose=()=>{
    setAddDiaOpen(false)
  }
  return (
    <>
        <Stack  sx={{
        height:'100%',
        width:'100%'
    }}>
        <AppBar position='static' sx={{
         height:'10%',
        }}>
            <Toolbar >
              <IconButton sx={{
                color:'white',
                marginLeft:'-0.5rem'
              }} onClick={()=>dispatch(toggleUserProfile())}>
                <BackIcon/>
              </IconButton>
              {isGroup===true?<Typography>Group Info</Typography> : <Typography>Contact Info</Typography>}
            </Toolbar>
        </AppBar>
        <Box sx={{height:'5%' ,backgroundColor:'rgb(205, 245, 253)'}}/>
        <Stack alignItems={'center'} spacing={'1rem'} sx={{
          height:'45%',
          backgroundColor:'rgb(205, 245, 253)',
        }}>
            <Box sx={{
              height:'10rem',
              width:'10rem',
              backgroundColor:'white',
              borderRadius:'50%',
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
            }}>
              {isGroup===true?<GroupIcon sx={{
                height:'80%',
                width:'80%'
              }}/>:singleMemberChat.length>0? <Avatar sx={{height:'100%',width:'100%'}} src={singleMemberChat[0].avatar.url}/> :<Avatar/>}
              {/* <GroupIcon sx={{
                height:'80%',
                width:'80%'
              }}/> */}
            </Box>
            <Box sx={{paddingLeft:'2rem', width:'100%'}} >
              {isGroup===true? <Typography variant="h6" sx={{marginBottom:'0.6rem'}}>Group name</Typography>:<Typography variant="h6" sx={{marginBottom:'0.6rem'}}>Contact name</Typography>}
              {editName.length>0 ?(<TextField  value={editName} InputProps={{ style:{fontSize:'1.6rem'}}} variant="standard" disabled={!editable} onChange={(e)=>setEditName(e.target.value)}/>) :(<div>Loading</div>) }
                {currentCreator?.creator===user._id? <IconButton onClick={handleEdit} sx={{height:'3rem',width:'3rem',marginLeft:'1rem'}}>
                {editable? <DoneIcon/>:<EditIcon/> }
            </IconButton>:<div></div>}
              
            </Box>
        </Stack>
        <Box sx={{
          width:'100%',
          height:'2%',
          backgroundColor:'white',
        }}/>
        {isGroup===true?
        <Stack sx={{
          overflow:'auto'
        }}>
          <Stack direction='row' sx={{paddingLeft:'2rem',paddingRight:'2rem'}}>
          <Typography >{groupMembers.length>0? groupMembers[0].length: 0} members</Typography>
          <Box flexGrow='1'/>
          {currentCreator?.creator===user._id?<Button variant="outlined" size="small" sx={{fontSize:'0.8rem'}} onClick={handleAdd}> 
            Add Members
          </Button> :<div></div>}
          <Button variant="outlined" color="error" size="small" sx={{marginLeft:'0.5rem',fontSize:'0.8rem'}} onClick={handleLeave}>Leave group</Button>
          </Stack>
          {groupMembers.length>0? groupMembers[0].map((member,index)=><GroupItems _id={member._id} avatar={member.avatar.url} name={member.fullName} chatId={chatId}  key={index} membersRemove={selectMembersToRemove}/>):(<div>Loading...</div>)}
        </Stack> :
        <div>

        </div> }
    </Stack>

    {groupMembers.length>0? <AddMembers chatId={chatId} open={addDiaOpen} handleClose={handleDiaClose} membersPresent={groupMembers[0]}/>: <div></div>}
    <LeaveGroup open={leaveDia} handleClose={handleLeaveDiaClose} chatId={chatId}/>
  
    </>
  )
}

export default UserProfile