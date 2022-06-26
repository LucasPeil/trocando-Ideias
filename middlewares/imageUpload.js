const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = "";
        if(req.baseUrl.includes("users")){
            folder="users"
        }else if(req.baseUrl.includes("posts")){
            folder="posts"
        }
        cb(null,`uploads/${folder}/`)
    },
    filename: function(req,file,next){
        let newName = Date.now() + path.extname(file.originalname);
        cb(null, newName)
    }
    
    });

    const imageUpload = multer({
        storage: imageStorage,
        fileFilter(req,file,cb){
            if(!file.originalname.match(/\.(png|jpg)$/)){
                return cb(new Error("Apenas arquivos .png ou.jpg são aceitos!!!"))
            }
            cb(null,true)
        }
    });

    module.exports = {imageUpload};