const Joi = require('@hapi/joi')
// validation de l'inscription
const RegisterValidation = (data)=>{
    const schema = Joi.object ({
        username: Joi.string()
            .required()
            .min(6),
        password: Joi.string()
            .required()
            .min(6)
            .max(150)
    })
    return schema.validate(data)

}
const loginValidation = (data)=>{
    const schema = Joi.object ({
        username: Joi.string()
            .required()
            .min(6),
        password: Joi.string()
            .required()
            .min(6)
            .max(150)
    })
    return schema.validate(data)

}
module.exports.RegisterValidation = RegisterValidation
module.exports.loginValidation = loginValidation
