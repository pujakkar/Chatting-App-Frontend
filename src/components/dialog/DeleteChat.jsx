import { Button, Dialog, Stack, Typography } from "@mui/material"



const DeleteChat = ({open,handleClose,deleteSet}) => {


  return (
    <Dialog open={open} onClose={handleClose}>
        <Stack padding='1.5rem'>
            <Typography marginBottom='1rem'>
                Confirm to delete this chat?
            </Typography>
            <Stack direction='row' spacing='1rem'>
                <Button variant="contained" onClick={()=>handleClose()}>Cancle</Button>
                <Button variant="outlined" color="error" onClick={()=>deleteSet()}>Delete</Button>
            </Stack>
        </Stack>
    </Dialog>
  )
}

export default DeleteChat