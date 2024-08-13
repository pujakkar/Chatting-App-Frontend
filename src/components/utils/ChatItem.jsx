import { Avatar, AvatarGroup, Box, Stack, Typography } from "@mui/material"
import { memo } from "react"
import { Link } from "../styled/StyledComp"
import { useDispatch} from "react-redux"
import { toggle } from "../../featured/counter/counterSlice"
import { transformImage } from "../lib/fileformat"



const ChatItem = memo(({avatar,_id,name,groupChat,sameSender ,newMessageAlert,handleDeleteChatOpen}) => {
    const dispatch=useDispatch()
    // const [alertMess,setAlertMess]=useState(null)
    //const newMessagesAlert=useSelector((state) => state.counter.newMessagesAlert);
    // console.log(newMessagesAlert)
    // useEffect(()=>{
    //   if(newMessagesAlert && newMessagesAlert.length>0){
    //     //console.log('hii')
    //     setAlertMess(newMessagesAlert.find((alertMess)=>alertMess.chat?._id===_id))
    //   }
    //   return()=>{
    //    // console.log('hii')
    //     setAlertMess(null)
    //   }
    // },[newMessagesAlert])

    //console.log(alertMess)
  return (
    <Link to={`/chat/${_id}`} onClick={()=>dispatch(toggle('home'))} onContextMenu={(e)=>handleDeleteChatOpen(e,_id,groupChat)}>
        <div style={{
            backgroundColor:sameSender?'rgb(58, 190, 249)':'unset',
            color:sameSender?'white':'unset',
            height:'4rem',
            display:'flex',
            alignItems:'center',
            paddingLeft:'1rem',
        }}>
            <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} width={'100%'}>
              <AvatarGroup max={4}>
              {avatar.map((ava,index)=>(
            <Avatar src={transformImage(ava)} key={index}/>
              ))}
              </AvatarGroup>
            <Typography>{name}</Typography>
            <Box sx={{
              flexGrow:'1',
            }}/> 
            {newMessageAlert && (
              <Box sx={{
                paddingRight:'2rem'
              }}>
              <Typography variant="body2" sx={{
                height:'1.5rem',
                width:'1.5rem',
                borderRadius:'50%',
                backgroundColor:'rgb(6, 208, 1)',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                color:'white'
              }}>{newMessageAlert.count}</Typography>
              </Box>
            )}
            </Stack>
        </div>
    </Link>
  )
})

ChatItem.displayName='ChatItem'
export default ChatItem