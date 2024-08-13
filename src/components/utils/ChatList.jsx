import { Divider, Stack, Typography} from "@mui/material"
import ChatItem from "./ChatItem"


const ChatList = ({sampleChats ,chatId,newMessagesAlert}) => {

  if(sampleChats.length===0){
    return <Typography>No chats available</Typography>
  }

  return (
    <Stack sx={{
        paddingTop:'1rem',
        paddingBottom:'1rem',
        overflowY:'auto',
        overflowX:'hidden',
        height:'100%',
    }} >
        {sampleChats?.map((data,index)=>{
            const {avatar,name,_id,groupChat,members}=data

            const newMessageAlert=newMessagesAlert.find(({chatId})=>chatId===_id)
            
            return(
                <>
                <ChatItem
                 avatar={avatar} 
                 name={name}
                  groupChat={groupChat} 
                  members={members} 
                  key={index} 
                  sameSender={chatId===_id}
                   _id={_id}
                   newMessageAlert={newMessageAlert}
                 />
                <Divider variant="middle"/>
            </>
            )
        })}
    </Stack>
  )
}

export default ChatList