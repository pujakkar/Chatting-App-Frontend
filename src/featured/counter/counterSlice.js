import { createSlice } from '@reduxjs/toolkit'
import { getOrSaveItem } from '../../components/lib/fileformat'
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from '../../components/lib/event'

const initialState={
    value:'home',
    isUserProfile:false,
    user:null,
    userChats:null,
    isLoader:false,
    notificationCount: getOrSaveItem({
        key:NEW_REQUEST,
        get:true,
    }) || 0,
    newMessagesAlert:getOrSaveItem({
        key:NEW_MESSAGE_ALERT,
        get:true,
    }) || [
        {
        chat:null,
        count:0,
        }
    ],
    groupCreators:[
        {
            chatId:'',
            creator:null,
        },
    ]
}

export const counterSlice=createSlice({
    name:'counter',
    initialState,
    reducers:{
        toggle:(state,action)=>{
            state.value=action.payload
        },
        toggleUserProfile:(state)=>{
            state.isUserProfile=!state.isUserProfile
        },
        isUser:(state,action)=>{
            state.user=action.payload
        },
        notUser:(state)=>{
            state.user=null
        },
        isUserChat:(state,action)=>{
            state.userChats=action.payload
        },
        loader:(state,action)=>{
            state.isLoader=action.payload
        },
        notificationIncreament:(state)=>{
            state.notificationCount+=1
        },
        notificationReset:(state)=>{
            state.notificationCount=0
        },
        alertMessage:(state,action)=>{
            const chatId=action.payload.chat._id
            const toPush=action.payload.chat
            // console.log(chatId)
            // console.log(toPush)
            const index=state.newMessagesAlert.findIndex((item)=>item?.chat?._id===chatId)
            console.log(index)

            if(index!==-1){
                state.newMessagesAlert[index].count+=1
            }
            else{
                state.newMessagesAlert.push({
                    chat:toPush,
                    count:1,
                })
            }
        },
        resetAlert:(state,action)=>{
            state.newMessagesAlert=state.newMessagesAlert.filter((item)=>item.chatId!==action.payload)
        },
        isGroupCreator:(state,action)=>{

            const {_id,creator}=action.payload
            state.groupCreators.push({_id,creator})
        },
    }
})

export const {toggle,toggleUserProfile,isUser,notUser,isUserChat,loader,notificationIncreament,notificationReset,alertMessage,resetAlert,isGroupCreator}=counterSlice.actions

export default counterSlice.reducer