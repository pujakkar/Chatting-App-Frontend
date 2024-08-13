import { Box, Button, Dialog,Stack, Typography } from "@mui/material"
import axios from 'axios'
import { server } from "../lib/server"
import { useDispatch } from "react-redux"
import { notUser } from "../../featured/counter/counterSlice"
import toast from "react-hot-toast"


const Logout = ({handleClose}) => {

  const dispatch=useDispatch()

  const handlesubmit=()=>{
    axios
    .get(`${server}/user/logout`,{withCredentials:true})
    .then((res)=>{
      dispatch(notUser())
      toast.success(res.data.message)
    })
    .catch((err)=>toast.error('Something went wrong'))
  }
  return (
    <Dialog open onClose={handleClose}>
        <Stack p={'2rem'} width={'25rem'} spacing={'1.5rem'}>
          <Typography variant="h6">Log out?</Typography>
          <Typography variant="body2">are you sure you want to Log out?</Typography>
          <Box>
            <Button variant="contained" color="error" onClick={()=>handlesubmit()}>Log out</Button>
            <Button>Cancle</Button>
          </Box>
        </Stack>
    </Dialog>
  )
}

export default Logout