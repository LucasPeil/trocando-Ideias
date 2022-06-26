const mongoose = require ("mongoose")
const {Schema} = mongoose;

const postSchema = new Schema({
    title: String,
    text: String,
    image: String,
    likes: Array,
    comments: Array,
    userId: mongoose.Schema.Types.ObjectId,
    userName: String
},
{
  timestamps:true,  
}
);

module.exports = mongoose.model("Post", postSchema);