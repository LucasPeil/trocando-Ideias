export const requestConfig = (method,data, image=null, token=null)=>{
    let config;
    if (image){
        congif={
            method,
            body:data,
            headers:{}
        }
    } else if(method =="DELETE" || data === null){
        config={
            method,
            headers:{},
        }      
    }else{
        config={
            method,
            body:JSON.stringfy(data),
            headers:{
                "Content-type:": "application/json"
            }
        }
    }

    if(token ) config.headers.Authorization = `Bearer ${token}`;

    return config;

}
export const api = "http://localhost:5000/api";