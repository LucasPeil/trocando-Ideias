import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {postService} from "../Services/postService"

const initialState = {
    photos:[],
    photo:{},
    success: false,
    loading:false,
    error:false,
    message:null
}
const handleError = (err)=>{
   
}

export const publishPost = createAsyncThunk("post/publishPost", async(post, thunkAPI)=>{
    const token = thunkAPI.getState().auth.user.token;
    const data = await postService.publishPost(post,token);

    if(data.errors)  return thunkAPI.rejectWithValue(data.errors[0])

    return data
})
export const getUserPosts = createAsyncThunk("post/getUserPosts", async(id,thunkAPI)=>{
    const data = await postService.getUserPosts(id)
    
   if(data.errors)  return thunkAPI.rejectWithValue(data.errors[0])
    return data
})

export const getPost = createAsyncThunk("post/getPost", async(id,thunkAPI)=>{
    const data = await postService.getPost(id);
   if(data.errors)  return thunkAPI.rejectWithValue(data.errors[0])
    return data

})

export const getAllPosts = createAsyncThunk("post/getAllPosts", async(thunkAPI)=>{
    const data = await postService.getAllPosts();
    if(data.errors)  return thunkAPI.rejectWithValue(data.errors[0])

    return data
})

export const deletePost = createAsyncThunk("post/deletePost", async(id, thunkAPI)=>{
    const token = await thunkAPI.getState().auth.user.token;
    const data = await postService.deletePost(id,token);
    if(data.errors)  return thunkAPI.rejectWithValue(data.errors[0])

    return data
})
export const updatePost = createAsyncThunk("post/updatePost", async(postData, thunkAPI)=>{
    const token = await thunkAPI.getState().auth.user.token;
    const data = await postService.updatePost({title : postData.title, text: postData.text}, postData.id, token)
    if(data.erros) return thunkAPI.rejectWithValue(data.errors[0]);

    return data
})