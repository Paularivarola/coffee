const joi = require('joi')
const validator = (req, res, next) => {
    const schema = joi.object({
        name:joi.string().trim().min(2).max(20).required().pattern(new RegExp('[a-zA-Z]$')).messages({
            "string.empty":"Your name is required field",
            "string.min":"Your name must have at least 2 letters",
            "string.max":"Your name mustn't have more than 20 letters",
            "string.pattern.base":"The input name only supports letters"
        }),
        lastname:joi.string().trim().min(3).max(20).required().pattern(new RegExp('[a-zA-Z]$')).messages({
            "string.empty":"Your last name is required field",
            "string.min":"Your last name must have at least 3 letters",
            "string.max":"Your last name mustn't have more than 20 letters",
            "string.pattern.base":"The input last name only supports letters"
        }),
        email:joi.string().trim().email().required().messages({
            "string.email":"Please write a valid email address",
            "string.empty":"Your email is required field",
        }),
        password:joi.string().min(6).trim().required().pattern(/(?=.*\d)(?=.*[A-z])/).messages({
            "string.empty":"Your password is required field",
            "string.pattern.base": "Password must be 6 characters min. with at least one uppercase, one lowercase and one number",
            "string.min": "Your password must contain at least 6 characters"
        }),
        image:joi.string().required().uri().messages({
            "string.uri": "You should used a valid URL",
            "string.empty":"You should used a valid URL"
        }),
    
    })
    const validation = schema.validate(req.body, {abortEarly:false})
    if (validation.error) {
        res.render("signup", {
            title: "Sign Up",
            error: validation.error.details,
            loggedIn: false,
    })
}
    next()
}
module.exports = validator