import { Button, Dialog, Stack, Typography } from "@mui/material"
import { useLeaveGroupChatMutation } from "../../service/api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"



const LeaveGroup = ({open,handleClose,chatId}) => {

    const navigate=useNavigate()
    const [leaving]=useLeaveGroupChatMutation()

    const handleLeave=async()=>{
        console.log(chatId)
        const res=await leaving({chatId})

        if(res.data){
            toast.success('You left the group')
            handleClose()
            navigate('/')
            return
        }
        toast.error(res.error.message)
        handleClose()
    }
  return (
    <Dialog open={open} onClose={handleClose}>
                <Stack padding='1.5rem'>
            <Typography marginBottom='1rem'>
                Confirm to Leave
            </Typography>
            <Stack direction='row' spacing='1rem'>
                <Button variant="contained" onClick={()=>handleClose()}>Cancle</Button>
                <Button variant="outlined" color="error" onClick={(handleLeave)}>Leave</Button>
            </Stack>
        </Stack>
    </Dialog>
  )
}

export default LeaveGroup