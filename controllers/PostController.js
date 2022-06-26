const mongoose = require("mongoose");
const { findByIdAndDelete } = require("../models/Post");
const Post = require ("../models/Post")
const User = require("../models/User")

const insertPost = async(req,res)=>{
    const {title, text} = req.body;
    //const postImage = req.file.filename;
    const image = "heyyyyy"
    const reqUser = req.user;
   // const user = await User.findById(mongoose.Types.ObjectId(reqUser._id));
    const user = {_id:902352345678, name:"Cris"}
    const newPost = await Post.create({ title, text, image, userId:user._id, userName: user.name});

    if(!newPost){
        res.status(422).json({errors: ["Ops... Algo deu errado, tente novamente mais tarde"]})
        return;
    }
    res.status(201).json(newPost);
} 

const deletePost = async(req,res)=>{
    const {id} = req.params;
    const reqUser = req.user;
    const post = await Post.findById(mongoose.Types.ObjectId(id));
    
    if(!post){
        res.status(404).json({errors:["Post não encontrado!!"]});
        return;
    }

    if(!post.userId.equals(reqUser._id)){
        res.status(422).json({errors:["Ops... Algo deu errado, tente novamente mais tarde"]})
        return
    }
    await findByIdAndDelete(post._id);

    res.status(200).json({id: post._id, message: "Post excluido com sucesso!!"});

}

const getAllPosts = async(req,res)=>{
    const posts = await Post.find({})
    .sort([["createdAt", -1]])
    .exec();
    return res.status(200).json(posts);
}

const getUserPosts = async(req, res)=>{
    const {id} =  req.params;

    const posts = await Post.findById({userId:id}).sort([["createdAt", -1]]).exec();
    return res.status(200).json(posts);
}

const getPostsById = async(req,res)=>{
    const {id} = req.params;
    const post = await Post.findById(mongoose.Types.ObjectId(id));
    if (!post){
        res.status(404).json({errors:["Post não encontrado!"]});
        return;
    }

    res.status(200).json(post)
}

const updatePost = async (req,res)=>{
    const {id} = req.params;
    const {text, title} = req.body;

    let image;

    if (req.file){
        image = req.file.filename;
    }
    const reqUser = req.user;
    const post = await Post.findById(id);

    if(!post){
        res.status(404).json({errors:["Post não encontrado!"]});
        return;
    }

    if(!post.userId.equals(reqUser._id)){
        res.status(422).json({errors: ["Ops... Algo deu errado, tente novamente mais tarde"]});
        return;
    }

    if(title) post.title = title;
    if (image) post.image = image;
    await post.save();
    
    res.status(200).json({post, message:"Post atualizado com sucesso"});

};

const likePost = async(req,res)=>{
    const {id} = req.params;
    const reqUser = req.user;
    const post = await Post.findById(id);
    
    if(!post){
        res.status(404).json({errors:["Post não encontrado!"]});
        return;
    }

    //checks if the user already liked the post
    if(post.likes.include(reqUser_id)){
        res.status(422).json({errors: ["voce já curtiu essa foto"]});
        return;
    }
    post.likes.push(reqUser._id);
    await post.save();
    
    res.status(200).json({post, message:"Post curtido"});
    
}
const commentPost = async(req, res)=>{
    const {id} = req.params;
    const reqUser = req.user;
    const {comment} = req.body;
    
    const user = await User.findById(reqUser._id)
    const post = await Post.findById(id);

    if(!post){
        res.status(404).json({errors:["Post não encontrado"]});
        return;
    }

    const userComment = {comment, userName: user.name, userImage: user.profileImage, userId: user._id}

    post.comments.push(userComment);
    await post.save();

    res.status(200).json({comment: userComment, message: "Comentário adicionado com sucesso!!"});

} 
const searchPosts = async(req,res)=>{
    const {q} = req.query;
    const posts = await Post.find({title: new RegExp(q, "i")}).exec();
    res.status(200).json(posts);
}

module.exports = {
    insertPost,
    deletePost,
    getAllPosts,
    getUserPosts,
    getPostsById,
    updatePost,
    likePost,
    commentPost,
    searchPosts
}