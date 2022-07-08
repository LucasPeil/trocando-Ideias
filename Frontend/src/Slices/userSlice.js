import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { get } from "mongoose";
import { create } from "../../../backend/models/User";
import userService from "../Services/userService"

const initialState = {
    user: {},
    error: null,
    sucess: false,
    loading: false,
    message: null,
}

export const profile = createAsyncThunk( "user/profile", async(user,thunkAPI)=>{
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.profile(user,token);
   
    
    return data;
})

export const updateProfile = createAsyncThunk("user/update", async(user, thunkAPI)=>{
    const token = thunkAPI.getState.auth.user.token;

    const data = await userService.updateProfile(user,token);
    
    if(data.errors) return thunkAPI.rejectWithValue(data.errors[0]);
    
    return data;
})

export const getUserDetails = createAsyncThunk("user/getDetails", async(id,thunkAPI)=>{
    const data = await userService.getUserDetails(id);
    return data

})

export const userSlice = {
    name: "user",
    initialState,
    reducers:{
        resetMessage: (state)=>{
            state.message = null
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(profile.pending, (state)=>{
                state.error = null,
                state.loading = true
            })
            .addCase(profile.fulfilled, (state,action)=>{
                state.error = null,
                state.loading=false,
                state.success = true,
                state.user = action.payload 
            })
            .addCase(updateProfile.pending, (state)=>{
                state.error = null,
                state.loading = true
            })
            .addCase(updateProfile.fulfilled, (state,action)=>{
                state.error = null,
                state.loading=false,
                state.success = true,
                state.user = action.payload,
                state.message = "Usuário atualizado com sucesso!"
            })
            .addCase(updateProfile.rejected, (state,action)=>{
                state.loading=false,
                state.user=null,
                state.error=action.payload
            })
            .addCase(getUserDetails.pending, (state)=>{
                state.error = null,
                state.loading = true
            })
            .addCase(getUserDetails.fulfilled, (state)=>{
                state.loading=false,
                state.error=null,
                state.success=true,
                state.user=action.payload
            })
    }
}

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;