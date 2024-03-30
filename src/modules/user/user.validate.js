import Joi from "joi";


export const addUserVal = Joi.object({
   name:Joi.string().min(2).max(50).required().trim() ,
   email:Joi.string().email().required().trim() ,
   phone:Joi.string().pattern(/^(002)?01[0125][0-9]{8}$/).required().trim() ,
   password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required() ,
   rePassword:Joi.valid(Joi.ref("password")).required() ,
   role:Joi.string().valid("admin" , "moderator" , "user").required().trim() ,
})




export const paramsIdVal = Joi.object({
   id:Joi.string().hex().length(24).required() 
})




export const updateUserVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,

   name:Joi.string().min(2).max(50).trim() ,
   email:Joi.string().email().trim() ,
   phone:Joi.string().pattern(/^(002)?01[0125][0-9]{8}$/).trim() ,
   role:Joi.string().valid("admin" , "moderator" , "user"),
   isActive:Joi.boolean(),
   isBlocked:Joi.boolean(),
})