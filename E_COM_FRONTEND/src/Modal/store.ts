import { configureStore} from "@reduxjs/toolkit";
import CounterSlice from "../Controller/features/counter/CounterSlice";
import CartSlice from "../Controller/features/user/CartSlice";
import userSlice from "../Controller/features/user/userSlice";
// import { getDefaultMiddleware } from '@reduxjs/toolkit';
// const customizedMiddleware = getDefaultMiddleware({
//     serializableCheck: false
//   })
export const store=configureStore({
    reducer:{
        counter:CounterSlice,
        user:userSlice,
        cart:CartSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})