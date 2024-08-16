import { Grid, Skeleton, Stack } from "@mui/material"


const ChatListLoader = () => {
  return (
    <Grid sx={{height:'100vh'}}>
        <Stack spacing='1rem'>
            {Array.from({length:10}).map((_,index)=>(
                <Skeleton key={index} height={'5rem'} variant="rounded"/> 
            ))}
        </Stack>
    </Grid>
  )
}

export default ChatListLoader