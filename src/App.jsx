import {Route,Routes,BrowserRouter} from 'react-router-dom'
import { Suspense,lazy,  useEffect} from 'react'
import Chat from './pages/Chat'
import ProtectRoute from './components/lib/ProtectRoute'
import {Toaster} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { isUser,  } from './featured/counter/counterSlice'
import { SocketProvider } from './components/utils/Socket'
import { useGetUserProfileQuery, } from './service/api'

const Home=lazy(()=>import('./pages/Home'))
const Login=lazy(()=>import('./pages/Login'))
const Signup=lazy(()=>import('./pages/Signup'))

function App() {

  const dispatch=useDispatch()


  const userData=useGetUserProfileQuery('')


  // if(userData.data){
  //   console.log(userData.data)
  // }

  useEffect(()=>{
    if(userData.data){
      console.log(userData.data)
      dispatch(isUser(userData.data.user))
    }
    return()=>{
      dispatch(isUser(null))
    }
  },[userData.data])

 

  const userD = useSelector((state) => state.counter.user);
  //console.log('redux user',userD)

  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route element={<SocketProvider>
        <ProtectRoute user={userD}/>
      </SocketProvider>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat/:chatId' element={<Chat/>}/>
      </Route>
      <Route element={<ProtectRoute user={!userD} redirect='/'/>}>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Route>
    </Routes>
    </Suspense>
    <Toaster position="bottom-center"/>
    </BrowserRouter>
  )
}

export default App
