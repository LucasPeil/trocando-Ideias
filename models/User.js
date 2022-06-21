const mongoose = require ("mongoose")
const {Schema} = mongoose;

const userSchema  = new Schema({
    name:String,
    email:String,
    password:String,
    profileImage:String 
},
{
    timestamps:true
});

module.exports = mongoose.model("User", userSchema);