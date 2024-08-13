import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material"
import {MoreVert as DotIcon} from '@mui/icons-material'
import { transformImage } from "../lib/fileformat"
import { useState } from "react"
import MenuGroupMem from "../dialog/MenuGroupMem"
import { useSelector } from "react-redux"


const GroupItems = ({avatar,_id,name,membersRemove,chatId}) => {
    const [anchorEl,setAnchorEl]=useState(null)

    const userD=useSelector((state)=>state.counter.user)
    const creators=useSelector((state)=>state.counter.groupCreators)
    const currentCreator=creators.find((creator)=>creator?._id===chatId)

    const handleClick=(e)=>{
        setAnchorEl(e.currentTarget)
    }
    const handleClose=()=>{
        setAnchorEl(null)
    }

    const open=Boolean(anchorEl)
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
            {currentCreator?.creator===_id? <Typography variant="body2">Admin</Typography>:<div></div> }
            {userD._id===_id? <div></div>: <IconButton onClick={handleClick}>
                <DotIcon/>
            </IconButton>}
            </Stack>
            <MenuGroupMem open={open} handleClose={handleClose} anchorEl={anchorEl} _id={_id} membersRemove={membersRemove} />
        </div>
      )
}

export default GroupItems