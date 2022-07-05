import {api, requestConfig} from "../Utils/requestConfig"

// Register an User
const register = async(userData)=>{

    const config = requestConfig("POST", userData);

    try{
        const registerResponse =  await fetch(api + "/users/register", config).then((res)=> res.json()). catch((e)=>e);
        
        if (registerResponse) localStorage.setItem("user", JSON.stringify(registerResponse));
        return registerResponse;

    }catch(err){
        console.log(err)
    }
}

const logout = ()=>{
    localStorage.removeItem("user");
}
const login = async(userInfos)=>{
    const config = requestConfig("POST",userInfos)

    try{
        const loginResponse = await fetch(api + "/users/login", config).then((res)=>res.json()).catch((e)=> console.log(e));
        
        if (loginResponse) localStorage.setItem("user", JSON.stringify(loginResponse))

        return loginResponse;
    }catch(err){
        console.log(err)
    }
    
}

const authService = {register,login,logout}