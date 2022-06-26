const {validationResult} = require("express-validator");

const handleValidation = (req,res,next)=>{
    let errors = validationResult(req);
    if(!errors){
        return next()
    }
    let extractedErrors = []; 
    errors.array().map((e)=>{ extractedErrors.push(e.msg) });

    res.status(422).json({ errors: extractedErrors})
}
module.exports = handleValidation;