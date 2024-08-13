import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../featured/counter/counterSlice'
import {api} from '../service/api'
export const store = configureStore({
  reducer: {
    counter:counterReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})