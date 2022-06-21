const mongoose = require ("mongoose")
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

const conn = async()=>{
    try{
        const dbConnection = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.f3di6pb.mongodb.net/?retryWrites=true&w=majority`
        )
        
        console.log("Voce se conectou ao banco de dados!")

        return dbConnection;
    }catch(e){
        console.log(e)
    }

}

conn();
module.exports = conn