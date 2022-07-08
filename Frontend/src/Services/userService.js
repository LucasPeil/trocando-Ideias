import {api, requestConfig} from "../Utils/requestConfig"

export const profile = async (data, token)=>{
  const config = requestConfig("GET", data, token);
   try{
     const profileResponse = await fetch(api + "/users/profile", config).then((res)=> res.json()).catch((err)=> err);
     return profileResponse
     
   }catch(e){
     console.log(e)
   }
  
  
}

export const updateProfile = async (data,token) => {
  const config = requestConfig("PUT",data, true, token);
  try{
    const updateProfileResponse = await fetch(api+ "/users/",config).then((res)=> res.json()).catch((err)=>err);
    return updateProfileResponse;
  }catch(e){
    console.log(e)

  }
}

const getUserDetails = async(id)=>{
    const config = requestConfig("GET");
    try{
        const userDetailsResponse = await fetch(api + "/users/" +id, config).then((res)=> res.json()).catch((err)=>err);
        return userDetailsResponse;
    }catch(e){
        console.log(e)
    }
    
}

const userService = {profile,updateProfile,getUserDetails}