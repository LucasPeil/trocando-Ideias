const mongoose = require ("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtSecrete = process.env.JWT_SECRET;

//generete a token
const generateToken = (id)=>{
    return jwt.sign({id}, jwtSecrete, {expiresIn:"7d"});
}

const register = async(req,res)=>{
    const {username,email,password} = req.body;

    const user = await User.findOne({email});

    if (user){
        res.status(422).json({errors:["E-mail já cadastrado!"]})
        return;
    }

    //generate hashed password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password,salt)

    // creates an user

    const newUser = await User.create({username, email,password:passwordHash})

    if(!newUser){
        res.status(422).json({errors:["Ops... Algo deu errado. Tente novamente mais tarde"]});
        return;
    }
    res.status(201).json({
        id: newUser._id,
        token: generateToken(newUser._id)
     });
    } 
    
    // Get a Logged in user 
    const getLoggedUser = async (req,res)=>{
        const user = req.user;
        res.status(200).json(user)
    }

    // Sign user in
    const login = async(req,res)=>{
        const {email, password} = req.body;

        const user  = await User.findOne({email})

        if(!user){
            res.status(404).json({errors:["Usuario não encontrado"]})
            return;
        }

        //compare if password matches
        const checkPassword = bcrypt.compare(password, user.password)
        if (!checkPassword){
            res.status(422).json({errors:["Senha inválida"]})
            return;
        }

        res.status(200).json({ _id: user._id, profileImage: user.profileImage, token: generateToken(user._id)})

    }

    //update an user
    const updateUser = async(req,res)=>{
        const {name,password, bio} = req.body;
        let profileImage = null
        if (req.file){
            profileImage = req.file.filename;
        }
        if (profileImage) user.profileImage = profileImage;

        const reqUser = req.user;
        const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password"); // turns the id string into an objectId, as it is specified in the Schema

        if(name) user.name = name;
        
        if (password){
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;    
        }
       
        if(bio) user.bio = bio;

        await user.save();
        
        res.status(200).json(user);
    }


    // Get User By id
    const getUserById = async(req,res)=>{
        const {id} = req.params;

        const user = User.findById(mongoose.Types.ObjectId(id)).select("-password");

        if(!user){
            res.status(404).json({errors:["Usuario não encontrado"]})
            return;
        }

        res.status(200).json(user);
    }

    module.exports={register,getLoggedUser,login,updateUser,getUserById}



