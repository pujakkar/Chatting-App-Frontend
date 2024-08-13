import { Grid, Stack, Typography } from "@mui/material"
import LeftBar from "../components/layout/LeftBar"
import { useMyGroupsQuery } from "../service/api"
import { useEffect } from "react"
import { isGroupCreator } from "../featured/counter/counterSlice"
import { useDispatch } from "react-redux"




const Home = () => {

    const dispatch=useDispatch()
    const {data,refetch,isLoading}=useMyGroupsQuery('')



    useEffect(()=>{
        if(data){
            console.log(data.transformChats.length)
            console.log('creator fetching')
            data.transformChats.map(({_id,creator})=>dispatch(isGroupCreator({_id,creator})))
        }
    },[data])

    // const handleLeft=useCallback(()=>{
    //     console.log('refetching')
    //     refetch()
    //   },[socket])
      
    //   useEffect(()=>{
    //     socket.on(GROUP_LEFT,handleLeft)
      
    //     return()=>{
    //       socket.off(GROUP_LEFT,handleLeft)
    //     }
    //   },[socket,handleLeft])
  return (
    <div style={{
        minHeight:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(5, 12, 156)'

    }}>
    <Grid container  sx={{
        height:'94vh',
        width:'94vw',
    }}>
        <Grid item lg={4} md={4} xs={12}
        sx={{
            display:{
                xs:'block',
                md:'block',
                lg:'block',
            },
            height:'100%',
            width:'100%',
            backgroundColor:'white'
        }}>
            <LeftBar/>
        </Grid>
        <Grid item lg={8} md={8} xs={12}
        sx={{
            display:{
                xs:'none',
                md:'block',
                lg:'block',
            },
            height:'100%',
            width:'100%',
            backgroundColor:'rgb(202, 244, 255)'
        }}>
            <Stack spacing={'1rem'} sx={{
                height:'100%',
                width:'100%',
                alignItems:'center',
                justifyContent:'center'
            }}>
            <Typography variant="h3">Welcome to my Chat App</Typography>
            <Typography variant="body1">Select a Chat to start Chatting</Typography>
            </Stack>
        </Grid>
    </Grid>
    </div>
  )
}

export default Home