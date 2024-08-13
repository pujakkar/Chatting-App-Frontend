import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'
import { server } from "../components/lib/server";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { isUser, notUser } from "../featured/counter/counterSlice";

const Login = () => {
  const { control, handleSubmit } = useForm();

  const dispatch=useDispatch()

  async function fetchData(){
    axios
    .get(`${server}/user/userProfile`,{withCredentials:true})
    .then((res)=>{
      const {user}=res.data
      dispatch(isUser(user))
    })
    .catch((err)=>{dispatch(notUser()) 
    })
  }
  

  const onSubmit = async ({fullName,email,password}) =>{
    const formData=new FormData()

    formData.append('email',email)
    formData.append('fullName',fullName)
    formData.append('password',password)
    

    try {
      const {data}=await axios.post(`${server}/user/login`,
        formData,
        {
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      toast.success(data.message)
      fetchData()
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }

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
            height: '25rem',
            width: '19rem',
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap='1rem'>
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
              <Typography variant="body1">
                Already have an account? 
                <Button variant="text" type="submit">
                  Signup
                </Button>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
