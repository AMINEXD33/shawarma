import { createSlice } from "@reduxjs/toolkit";


export type alertsStateType = {type: "null"|"error"|"success", msg: string};
const iniTialstate:alertsStateType = {type: "null", msg: ""};
const slice = createSlice({
    name: "alerts",
    initialState: iniTialstate,
    reducers:{
        ERROR: (state, action)=>{
            state.type = "error";
            state.msg = action.payload;
        },
        SUCCESS: (state, action)=>{
            state.type = "success";
            state.msg = action.payload;
        }
    }
});



export const { ERROR, SUCCESS }  = slice.actions;
export type alertsReducerType = typeof slice.reducer;
export const reducer = slice.reducer;




