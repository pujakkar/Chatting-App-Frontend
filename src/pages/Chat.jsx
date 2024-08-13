import { Grid } from "@mui/material"
import LeftBar from "../components/layout/LeftBar"
import Chatting from "../components/utils/Chatting"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import UserProfile from "../components/utils/UserProfile"




const Chat = () => {
    const params=useParams()

    const chatId=params.chatId

    const isUserProfileOpen=useSelector((state)=>state.counter.isUserProfile);
    const userChats=useSelector((state)=>state.counter.userChats)

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
            <Grid item lg={4} md={4}
            sx={{
                display:{
                    xs:'none',
                    md:'block',
                    lg:'block',
                },
                height:'100%',
                width:'100%',
                backgroundColor:'white'
            }}>
                <LeftBar/>
            </Grid>
            {
                isUserProfileOpen? ( <>
                        <Grid item lg={4} md={4}
                                sx={{
                                    display:{
                                        xs:'none',
                                        md:'block',
                                        lg:'block',
                                    },
                                    height:'100%',
                                    width:'100%',
                                    backgroundColor:'rgb(202, 244, 255)',
                                    boxShadow:' inset 0 0 10px rgba(0, 0, 0, 0.2)'
                                }}>
                                    <Chatting chatId={chatId}/>
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}
                                sx={{
                                    display:{
                                        xs:'block',
                                        md:'block',
                                        lg:'block',
                                    },
                                    height:'100%',
                                    width:'100%',
                                    backgroundColor:'white',
                                }}>
                                    <UserProfile chatId={chatId} sampleChats={userChats}/>

                        </Grid>
                </>) : (
                    <Grid item lg={8} md={8} xs={12}
                    sx={{
                        display:{
                            xs:'block',
                            md:'block',
                            lg:'block',
                        },
                        height:'100%',
                        width:'100%',
                        backgroundColor:'rgb(202, 244, 255)',
                        boxShadow:' inset 0 0 15px rgba(0, 0, 0, 0.2)'
                    }}>
                        <Chatting chatId={chatId} sampleChats={userChats}/>
                    </Grid>
                )
            }
        </Grid>
        </div>
      )
}

export default Chat