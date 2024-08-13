import { Avatar, Box, IconButton, Stack, TextField, Typography } from "@mui/material"
import {ArrowBack as BackIcon , CameraAlt as CameraAltIcon,Edit as EditIcon,Done as DoneIcon} from '@mui/icons-material'
import {useFileHandler} from '6pp'
import { VisuallyHiddenInput } from "../styled/StyledComp"
import { useState } from "react"
import { useDispatch,useSelector } from 'react-redux'
import { toggle } from '../../featured/counter/counterSlice';

const ProfileCard = () => {
    const avatar=useFileHandler('single')
    const [isEdit,setIsEdit]=useState(true);
    const [name,setName]=useState('Pujak')
    const [bio,setBio]=useState('The Blade is Me');
    const [isEditBio,setIsEditBio]=useState(true)
    const dispatch=useDispatch()
    const user= useSelector((state) => state.counter.user);

    const handleEdit=()=>{
        setIsEdit(!isEdit)
    }
    const handleEditBio=()=>{
        setIsEditBio(!isEditBio)
    }
    const handleChange=(e)=>{
        setName(e.target.value)
    }
    const handleChangeBio=(e)=>{
        setBio(e.target.value)
    }
  return (

    <Stack sx={{
        height:'100%',
    }}>
        <Box sx={{
            display:'flex',
            alignItems:'center',
            height:'5rem',
            backgroundColor:'rgb(53, 114, 239)',
            color:'white'
        }}>
            <IconButton onClick={()=>dispatch(toggle('home'))}>
                <BackIcon sx={{
                    color:'white'
                }}/>
            </IconButton>
            <Typography>
                Profile
            </Typography>
        </Box>
        <Box
        sx={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        position: 'relative',
        height:'15rem',
        backgroundColor:'rgb(205, 245, 253)'
        }}>
        <Avatar
            alt="remy sharp"
            src={avatar.file ? URL.createObjectURL(avatar.file) : user.avatar}
            sx={{
            height: '10rem',
            width: '10rem',
            }}
        />
        <IconButton
            component="label"
            sx={{
            position: 'absolute',
            bottom: '2rem',
            right: '9rem'
            }}
        >
            <CameraAltIcon />
            <VisuallyHiddenInput
            type="file"
            onChange={avatar.changeHandler}
            />
        </IconButton>
        </Box>
        <Box sx={{
            padding:'2rem',
            height:'8rem'
        }}>
            <Typography>
                Your name
            </Typography>
            <Box sx={{
                display:'flex',
                alignItems:'center',
                marginTop:'1rem'
            }}>
            <TextField disabled={isEdit} variant="standard" value={user.fullName} onChange={handleChange} sx={{
                flexGrow:'1'
            }}/>
            <IconButton onClick={handleEdit}>
                {
                    !isEdit?<DoneIcon/> : <EditIcon/>
                }
            </IconButton>
            </Box>
        </Box>
        <Box sx={{
            paddingLeft:'2rem',
            paddingTop:'1rem',
            backgroundColor:'rgb(205, 245, 253)',
            height:'4rem',
        }}>
            <Typography>
                This name will be visible to your friends
            </Typography>
        </Box>
        <Box sx={{
            padding:'2rem',
            height:'8rem'
        }}>
            <Typography>
                Bio
            </Typography>
            <Box sx={{
                display:'flex',
                alignItems:'center',
                marginTop:'1rem'
            }}>
            <TextField disabled={isEditBio} variant="standard" value={bio} onChange={handleChangeBio} sx={{
                flexGrow:'1'
            }}/>
            <IconButton onClick={handleEditBio}>
                {
                    !isEditBio?<DoneIcon/> : <EditIcon/>
                }
            </IconButton>
            </Box>
        </Box>
        <Box sx={{
            backgroundColor:'rgb(205, 245, 253)',
            flexGrow:1
        }}></Box>
    </Stack>
  )
}

export default ProfileCard