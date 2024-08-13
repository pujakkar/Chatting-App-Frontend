import { Box, Stack, Typography } from "@mui/material"
import moment from 'moment'
import RenderAttachments from "./RenderAttachments"
import {file as fileFormat } from "../lib/fileformat"


const MessageComponent = ({message,user,isGroup}) => {
    const {attachments,content,sender,createdAt}=message
    const sameSender=user._id===sender._id

    // console.log(message)
    // console.log(attachments)

    const timeago=moment(createdAt).fromNow()
  return (
    <>
        <Stack sx={{
        alignSelf:sameSender?'flex-end' : 'flex-start',
        padding:'0.5rem',
        backgroundColor:'white',
        borderRadius:'0.5rem',
        width:'fit-content'
    }}>
      {isGroup===false ? <div></div>: <Typography variant="body2" sx={{color:'blue'}}>{sender.fullName}</Typography>}
        {content && (<Typography>{content}</Typography>)}

        {
          attachments.length >0 && (
            attachments.map((attachment,index)=>{
              const {url}=attachment
              const file=fileFormat(url)
              return(
                <Box key={index}>
                  <a href={url}
                  download
                  target="_blank">
                    <RenderAttachments url={url} file={file}/>
                  </a>
                </Box>
              )
            })
          )
        }
        <Typography variant="caption" color='text.secondary'>{timeago}</Typography>
    </Stack>
    </>
  )
}

export default MessageComponent