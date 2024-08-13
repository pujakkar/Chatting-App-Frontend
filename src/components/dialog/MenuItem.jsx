import { Box,  Menu,  Stack } from "@mui/material"
import {Image as ImageIcon, Article as ArticleIcon, OndemandVideo as VideoIcon,AudioFile as AudioIcon} from '@mui/icons-material'
import { useRef } from "react"
import {toast} from 'react-hot-toast'
import { useSendAttachmentsMutMutation } from "../../service/api"



function MenuItem({open,anchorEl,handleClose,chatId}) {

  const imageRef=useRef(null)
  const documentRef=useRef(null)
  const audioRef=useRef(null)
  const videoRef=useRef(null)

  const selectRef=(ref)=>{
    ref.current.click()
  }

  const [sendAttachments]=useSendAttachmentsMutMutation()




  const fileChangeHandler=async (e,key)=>{
    const files=Array.from(e.target.files)

    if(files.length<0) return;

    if(files.length>5){
      return toast.error(`you can only send 5 ${key} at ones`)
    }
    handleClose()



    try {
      const myForm=new FormData();

      myForm.append("chatId",chatId)

      files.forEach((file)=>{myForm.append("files",file)
      })

      const res=await sendAttachments(myForm)
      //console.log(load)
      // if(load){
      //   toast.loading('sending')
      // }

      if(res.data){
        //dispatch(loader(false))
        toast.success(`${key} sent succesfully`)
      }
      else{
        toast.error(`failed to send ${key}`)
      }
    } catch (error) {
      toast.error(error)
    }

  }

  return (
    <Menu open={open} anchorEl={anchorEl} onClose={handleClose} 
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}>
      <div>
        <div onClick={()=>selectRef(imageRef)}>
          <Stack direction='row' spacing='0.4rem'  >
            <ImageIcon sx={{
              paddingLeft:'0.4rem'
            }}/>
            <Box sx={{
              paddingRight:'0.4rem'
            }}>Image</Box>
            <input 
            type="file"
            multiple
            accept="image/png, image/jgeg, image/gif"
            style={{display:'none'}}
            onChange={(e)=>fileChangeHandler(e,'Images')}
            ref={imageRef}/>
          </Stack>
        </div>
        <Box sx={{height:'0.4rem'}}></Box>
        <div onClick={()=>selectRef(documentRef)}> 
          <Stack direction='row' spacing='0.4rem'>
            <ArticleIcon sx={{
              paddingLeft:'0.4rem'
            }}/>
            <Box sx={{
              paddingRight:'0.4rem'
            }}>Document</Box>
            <input 
            type="file"
            multiple
            accept="*"
            style={{display:'none'}}
            onChange={(e)=>fileChangeHandler(e,'Files')}
            ref={documentRef}/>
          </Stack>
        </div>
        <Box sx={{height:'0.4rem'}}></Box>
        <div onClick={()=>selectRef(audioRef)}>
          <Stack direction='row' spacing='0.4rem'>
            <AudioIcon sx={{
              paddingLeft:'0.4rem'
            }}/>
            <Box sx={{
              paddingRight:'0.4rem'
            }}>Audio</Box>
            <input 
            type="file"
            multiple
            accept="audio/mpeg, audio/mp3, audio/wav"
            style={{display:'none'}}
            onChange={(e)=>fileChangeHandler(e,'Audios')}
            ref={audioRef}/>
          </Stack>
        </div>
        <Box sx={{height:'0.4rem'}}></Box>
        <div onClick={()=>selectRef(videoRef)}>
          <Stack direction='row' spacing='0.4rem'>
            <VideoIcon sx={{
              paddingLeft:'0.4rem'
            }}/>
            <Box sx={{
              paddingRight:'0.4rem'
            }}>Video</Box>
            <input 
            type="file"
            multiple
            accept="video/mp4, video/webm, video/ogg"
            style={{display:'none'}}
            onChange={(e)=>fileChangeHandler(e,'Videos')}
            ref={videoRef}/>
          </Stack>
        </div>
      </div>
    </Menu>
  )
}

export default MenuItem