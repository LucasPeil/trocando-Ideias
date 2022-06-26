const {body} = require("express-validator");

const postInsertValdiation = ()=>{
    return[
        body("title").not().equals("undefined").withMessage("Seu post precisa ter um título!")
            .isString().withMessage("O título precisa ser uma string de caracteres!")
            .isLength({min:3, max:15}).withMessage("O título do seu post deve ter entre 3 e 15 caracteres"),

        body("image").custom((value,{req})=>{
            if(!req.file) throw new Error("Seu post precisa ter uma imagem")
            return true;
        }),
        body("text").not().equals("undefined").withMessage("Seu post precisa ter texto!")
            .isString().withMessage("O texto precisa ser uma string de caracteres!")
            .isLength({min:100, max:12500}).withMessage("O título do seu post deve ter entre 100 e 12500 caracteres")
    ]
}

const postUpdateValidation = ()=>{
    return[
        body("image").optional().custom((value,{req})=>{
            if(!req.file) throw new Error("Seu post precisa ter uma imagem")
            return true;
        }),
        body("title").optional().isString().withMessage("O título precisa ser uma string de caracteres")
            .isLength({min:3, max:15}).withMessage("O título do seu post deve ter entre 3 e 15 caracteres")
    ]
}

const commentValidation = ()=>{
    return[body("comment").isString().withMessage("O comentário precisa ser uma string de caracteres")]
};
  
module.exports={postInsertValdiation, postUpdateValidation, commentValidation };
  
  