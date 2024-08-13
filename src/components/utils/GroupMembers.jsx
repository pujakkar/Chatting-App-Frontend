import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material"
import {Remove as RemoveIcon, Add as AddIcon} from "@mui/icons-material"
import { transformImage } from "../lib/fileformat"



const GroupMembers = ({avatar,_id,name,handler,isAdded}) => {

    return (
      <div style={{
          height:'4rem',
          display:'flex',
          alignItems:'center',
          paddingLeft:'1rem',
          paddingRight:'2rem',
      }}>
          <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} width={'100%'} >
          <Avatar
           src={transformImage(avatar)}/>
          <Typography>{name}</Typography>
          <Box sx={{
              flexGrow:'1'
          }}/>
          <Box>
          <IconButton onClick={()=>handler(_id)} size="small" sx={{
            bgcolor:isAdded?'error.main' :'primary.main',
            color:'white',
            '&:hover':{
              bgcolor: isAdded?'error.dark' :'primary.dark'
            },
          }}>
            {
              isAdded? <RemoveIcon color=""/>: <AddIcon/>
            }
          </IconButton>
          </Box>
          </Stack>
      </div>
    )
}

export default GroupMembers