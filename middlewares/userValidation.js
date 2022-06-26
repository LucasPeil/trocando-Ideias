const {body} = require("express-validator")

const createUserValidation = ()=>{
    return[
        body("name").isString().withMessage("O nome é obrigatório.")
            .isLength({min:3, max:15}).withMessage("Seu nome precisa ter entre 3 e 15 caracteres"),

        body("email").isString().withMessage("O email é obrigatório.")
            .isEmail().withMessage("Insira um email válido!"),

        body("password").isString().withMessage("A senha é obrigatoria")
            .isLength({min:8}).withMessage("Sua senha precisa ter pelo menos 8 caracteres"),

        body("confirmPassword").isString().withMessage("A confirmação de senha é obrigatória.")
            .custom((value, {req})=>{
                if(value != req.body.password) throw new Error("As senahs precisam ser iguais!");
                return true;
            })
    ]

}

const loginValidation = ()=>{
    return [
        body("email").isString().withMessage("O email é obrigatório.")
        .isEmail().withMessage("Insira um email válido!"),

        body("password").isString().withMessage("A senha é obrigatória.")
    ]
}

const userUpdateValidation = ()=>{
    return [
        body("name").optional().isLength({ min: 3 }).withMessage("O nome precisa ter no mínimo 3 caracteres."),
        
        body("password").optional().isLength({ min: 5 }).withMessage("A senha precisa de no mínimo 5 caracteres.")
    ]
}

module.exports = {createUserValidation, loginValidation, userUpdateValidation}