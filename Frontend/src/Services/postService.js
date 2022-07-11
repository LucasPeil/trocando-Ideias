import {api, requestConfig} from "../Utils/requestConfig"

const publishPost = async (data, token) => {
  let config = requestConfig("POST", data, true, token);
  try {
    const publishResp = await fetch(api + "/posts/", config ).then((res)=> res.json()).catch((err)=> err)
    return publishResp
  } catch (e) {
    console.log(e)
  }
} 

const getUserPosts = async (id)=>{
  const config = requestConfig("GET")
  
  try {
     const getUserPostsResp = await fetch(api + "/posts/user/" +id, config).then((res)=> res.json()).catch((err)=> err)
     return getUserPostsResp
    
  } catch (e) {
    console.log(e)
  }
 
}
const getPost = async(id)=>{
    const config = requestConfig("GET");
    try{
        const getPostResponse = await fetch(api + "/posts/" +id, config).then((res)=>res.json()).catch((err)=> err)
        return getPostResponse;

    }catch (e){
    console.log(e);
    }
}

const getAllPosts = async()=>{
    const config = requestConfig("GET")
    try {
        const getAllPostsResponse = await fetch(api + "/posts/", config).then((res)=>res.json()).catch((err)=> err)
        return getAllPostsResponse
    }catch (e) {
        console.log(e);
    }
}

const deletePost = async(id,token)=>{
    const config = requestConfig("DELETE", "", token)

    try {
        const deletePostResponse = await fetch(api + "/posts/" +id, config).then((res)=>res.json()).catch((err)=> err)
        return deletePostResponse;

    } catch (e) {
        console.log(e)
    }
}

const updatePost = async(data, id, token)=>{
    const config = requestConfig("PUT" ,data, token)
    try {
        const updatePostResponse = await fetch(api + "/posts/" +id, config).then((res)=> res.json()).catch((err)=> err)
        return updatePostResponse;
    } catch (e) {
        console.log(e)
    }
}

const searchPosts = async(query)=>{
    const config = requestConfig("GET");

    try {
        const searchPostsResponse  = await fetch(api +"/posts/search?q=" + query,config).then((res)=> res.json()).catch((err)=> err)
        return searchPostsResponse;
    } catch (e) {
        console.log(e) 
    }
}

const like = async(id,token)=>{
    const config = requestConfig("PUT",null,token)
    try {
        const likeResponse=  await fetch( api + "/posts/like/" +id, config).then((res)=> res.json()).catch((err)=> err)
        return likeResponse
        
    } catch (e) {
        console.log(e)
    }
}

const comment = async(id,token,data)=>{
    const config = requestConfig("PUT",data, token);
    try {
        const commentResponse = await fetch(api + "/posts/comment/" +id, config).then((res)=> res.json()).catch((err)=> err)
        return commentResponse

    } catch (e) {
        console.log(e)
    }

}
const postServices = {
    publishPost, 
    getUserPosts, 
    getPost, 
    getAllPosts,  
    deletePost, 
    updatePost, 
    searchPosts, 
    like, 
    comment
}

export default postService