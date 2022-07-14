import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {postService} from "../Services/postService"

const initialState = {
    postData:[],
    postsData:{},
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

export const searchPosts = createAsyncThunk("post/searchPosts", async(query,thunkAPI)=>{
    const data = await postService.searchPosts(query);
    if (data.errors) return thunkAPI.rejectWithValue(data.errors[0])
    return data
})

export const like = createAsyncThunk("post/like", async(id,thunkAPI)=>{
    const token = thunkAPI.getState().auth.user.token;
    const data = await postService.like(id,token);
    if (data.errors) return thunkAPI.rejectWithValue(data.errors[0])
    return data
})

export const comment = createAsyncThunk("post/comment", async(id,textData,thunkAPI)=>{
    const token = thunkAPI.getState().auth.user.token;
    const data = await postService.comment(id,token,textData);
    if (data.errors) return thunkAPI.rejectWithValue(data.errors[0])
    return data
})

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers:{
        resetMessage: (state)=>{
            state.message =null;
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(publishPost.pending, (state)=>{
            state.loading = true;
            state.error= null
        })
        .addCase(publishPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.error=null;
            state.success = true;
            state.postData = action.payload;
            state.postsData.unshift(state.postData)
            state.message = "Post publicado com sucesso!"
        })
        .addCase(publishPost.rejected, (state,action)=>{
            state.loading= false;
            state.error=action.payload;
            state.postData=null
        })
        .addCase(getUserPosts.pending, (state)=>{
          state.loading =true;
          state.error = null;
        })
        .addCase(getUserPosts.fulfilled, (state, action)=>{
          state.loading=false;
          state.success=true;
          state.error =null;
          state.postsData = action.payload   
        })
        .addCase(getUserPosts.rejected, (state,action)=>{
            state.loading= false;
            state.error=action.payload;
            state.postsData=null
        })
    
      .addCase(getPost.pending, (state)=>{
          state.loading =true;
          state.error= null
      } )
      .addCase(getPost.fulfilled, (state, action)=>{
        state.loading = false;
        state.success = true
        state.postData = action.payload;
        state.error = null;
      })
      .addCase(getPost.rejected, (state,action)=>{
        state.loading = false;
        state.error= action.payload;
        state.postData = null;
      })
      .addCase(getAllPosts.pending, (state)=>{
        state.loading =true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action)=>{
        state.loading=false;
        state.success=true;
        state.error =null;
        state.postsData = action.payload
        
      })
      .addCase(getAllPosts.rejected, (state) =>{
        state.loading =false;
        state.error=action.payload;
        state.postsData=null
      })
    .addCase(deletePost.pending, (state)=>{
        state.loading =true;
        state.error= null
    } )
    .addCase(deletePost.fulfilled, (state,action)=>{
      state.loading = false;
      state.success = true
      state.error = null;
      state.postsData = state.postsData.filter((post)=> post._id !== action.payload.id)  
      state.message = action.payload.message;  
    })
    .addCase(deletePost.rejected, (state,action)=>{
      state.loading = false;
      state.postData = null;
      state.error = action.payload;
    })
    .addCase(updatePost.pending, (state)=>{
        state.loading =true;
        state.error = null;
 
      })
      .addCase(updatePost.fulfilled, (state, action)=>{
        state.loading=false;
        state.success=true;
        state.error =null;
        state.postsData.map((post)=>{
            if(post._id === action.payload.post._id){
                post.title = action.payload.post.title;
                post.text = action.payload.post.text;
                return post
            }
            return post;
        });
        state.message = action.payload.message;
        
      })
      .addCase(updatePost.rejected, (state)=>{
        state.loading =false;
        state.error=action.payload;
        state.postData=null
      })
    .addCase(searchPosts.pending, (state)=>{
        state.loading =true;
        state.error= null
    } )
    .addCase(searchPosts.fulfilled, (state, action)=>{
      state.loading = false;
      state.success = true
      state.postData = action.payload;
      state.error = null;
    })
    .addCase(searchPosts.rejected, (state,action)=>{
      state.loading = false;
      state.error= action.payload;
      state.postData = null;
    })
    .addCase(like.fulfilled, (state, action)=>{
        state.loading=false;
        state.success=true;
        state.error =null;
        if(state.postData.likes){
            state.postData.likes.push(action.payload.userId)
        }
        //reload template withe the like
        state.postsData.map((post)=>{
            if(postData._id === action.payload.postDataId){
                return postData.likes.push(action.payload.userId)
            }
            return post;
        })
        state.message = action.payload.message
      })
    .addCase(like.rejected, (state) =>{
        state.loading =false;
        state.error=action.payload;
      })
    .addCase(comment.pending, (state)=>{
        state.loading =true;
        state.error= null
    } )
    .addCase(comment.fulfilled, (state, action)=>{
      state.loading = false;
      state.success = true
      state.error = null;
      state.postData.comments.push(action.payload.comment);
      state.message = action.payload.message
    })
    .addCase(comment.rejected, (state,action)=>{
      state.loading = false;
      state.error= action.payload;

    })
  
  }
    
})