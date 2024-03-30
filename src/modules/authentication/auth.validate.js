import Joi from "joi";


export const signUpVal = Joi.object({
   name:Joi.string().min(2).max(50).required().trim() ,
   email:Joi.string().email().required().trim() ,
   phone:Joi.string().pattern(/^(002)?01[0125][0-9]{8}$/).required().trim() ,
   password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/).required() ,
   rePassword:Joi.valid(Joi.ref("password")).required() ,
})


export const confirmedEmailVal = Joi.object({
   code:Joi.string().max(6) ,
})

export const signInVal = Joi.object({
   email:Joi.string().email().trim() ,
   phone:Joi.string().pattern(/^(002)?01[0125][0-9]{8}$/).trim() ,
   password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/) ,
})


export const changeUserInfoVal = Joi.object({
   name:Joi.string().trim() ,
   phone:Joi.string().pattern(/^(002)?01[0125][0-9]{8}$/).trim() ,
})



export const changePasswordVal = Joi.object({
   oldPassword:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/).required()  ,
   newPassword:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/).required()  ,
   rePassword:Joi.valid(Joi.ref("newPassword")).required() ,
})

