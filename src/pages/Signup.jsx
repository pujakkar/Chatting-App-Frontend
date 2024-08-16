import { Avatar, Box, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { VisuallyHiddenInput } from "../components/styled/StyledComp";
import { useFileHandler } from '6pp';
import axios from 'axios'
import { server } from "../components/lib/server";
import {toast} from 'react-hot-toast'
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";



const Signup = () => {
  const { control, handleSubmit } = useForm();
  const avatar = useFileHandler('single');
  const [redirect,setRedirect]=useState(false)

  const navigate=useNavigate()


  const onSubmit = async ({email,password,fullName,username}) => {
    console.log(avatar.file);
    const formData=new FormData()

    formData.append('email',email)
    formData.append('password',password)
    formData.append('fullName',fullName)
    formData.append('userName',username)
    formData.append('avatar',avatar.file)

    try {
      const {data}=await axios.post(`${server}/user/signup`,
        formData,
        {
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      console.log('signup',data.message)
      toast.success(data.message)
      setRedirect(true)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "something went wrong")
    }

  };

  if(redirect){
    return <Navigate to="/login" />;
  }

  return (
    <div style={{
      backgroundColor:'rgb(167, 230, 255)'
    }}>
      <Container
        component='main'
        maxWidth='xs'
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Paper 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '40rem',
            width: '19rem',
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
            Signup
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap='1rem'>
              <Controller
                name='avatar'
                control={control}
                render={({ field }) => (
                  <Box 
                  {...field}
                  sx={{
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: "center",
                    position: 'relative'
                  }}>
                    <Avatar
                      alt="remy sharp"
                      src={avatar.file ? URL.createObjectURL(avatar.file) : ''}
                      sx={{
                        height: 150,
                        width: 150,
                      }}
                    />
                    <IconButton
                      component="label"
                      sx={{
                        position: 'absolute',
                        bottom: '0',
                        right: '0'
                      }}
                    >
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </IconButton>
                  </Box>
                )}
              />
              <Controller
                name="fullName"
                control={control}
                rules={{
                  required: 'Full name is required'
                }}
                render={({ field, fieldState: { error } }) => 
                  <TextField
                    {...field}
                    required
                    label='Full Name'
                    variant="outlined"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                }
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field, fieldState: { error } }) => 
                  <TextField
                    {...field}
                    required
                    label='Email'
                    variant="outlined"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                }
              />
              <Controller
                name="username"
                control={control}
                rules={{
                  required: 'Username is required'
                }}
                render={({ field, fieldState: { error } }) => 
                  <TextField
                    {...field}
                    required
                    label='Username'
                    variant="outlined"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                }
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required'
                }}
                render={({ field, fieldState: { error } }) => 
                  <TextField
                    {...field}
                    required
                    label='Password'
                    variant="outlined"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                }
              />
              <Button type="submit" variant="contained" sx={{ width: '5rem' }}>
                Submit
              </Button>
              <Typography marginTop='-0.5rem'>Already have an account ? <Button variant="text" type="submit" onClick={()=>navigate('/login')}>
                  Login
                </Button></Typography>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;
