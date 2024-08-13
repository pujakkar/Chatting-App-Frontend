import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from "@mui/material"
import { memo } from "react"
import { useAcceptReqMutation } from "../../service/api"


const Notification = ({handleClose,sampleNotification}) => {
    const handleFriendReq=({_id,accept})=>{

    }
  return (
    <Dialog open onClose={handleClose}>
        <Stack p={'2rem'} width={'25rem'}>
            <DialogTitle textAlign={'center'}>Notification</DialogTitle>
            {sampleNotification.length>0?(
                sampleNotification.map(({_id,sender})=>(
                    <NotificationItem key={_id} _id={_id} sender={sender} handler={handleFriendReq} handleClose={handleClose}/>
                ))
            ):(<Typography textAlign={'center'}>No New Notification</Typography>)}
        </Stack>
    </Dialog>
  )
}

const NotificationItem=memo(({_id,sender,handler,handleClose})=>{
    const {fullName,avatar}=sender

    const [acceptReq]=useAcceptReqMutation()

    handler=({_id,accept})=>{
        console.log(accept)
        acceptReq({requestId:_id,accept}).then(({data})=>console.log(data)).catch((err)=>console.log(err))
        handleClose()
    }
    return(
        <ListItem>
            <Stack direction={'row'} alignItems={'center'} spacing={'2rem'} width={'100%'}>
                <Avatar src={avatar}/>
                <Typography variant="body1"
                sx={{
                    flexGrow:1,
                    display:'-webkit-box',
                    WebkitLineClamp:1,
                    WebkitBoxOrient:'vertical',
                    overflow:'hidden',
                    textOverflow:'ellipsis',
                    width:'100%'
                }} >{`${fullName} sent you a friend request`}</Typography>
            </Stack>
            <Stack>
                <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
                <Button onClick={()=>handler({_id,accept:false})} color="error">Reject</Button>
            </Stack>
        </ListItem>
    )
})
NotificationItem.displayName = "NotificationItem";

export default Notification