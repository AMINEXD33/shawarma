import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./alerts/reducers";




export const store = configureStore({
    reducer:{
        alerts: reducer
    }
})
export type RootState = ReturnType<typeof store.getState>;