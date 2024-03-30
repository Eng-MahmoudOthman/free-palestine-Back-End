import Joi from "joi" ;
import env from "dotenv"
env.config()




export const addCompanyVal = Joi.object({
   name:Joi.string().min(2).max(50).trim().required() ,
   description:Joi.string().min(10).max(500).trim().required() ,


   image:Joi.object({
      fieldname:Joi.string().required(),
      originalname:Joi.string().required(),
      encoding: Joi.string().required() ,
      mimetype: Joi.string().valid("image/jpeg" , "image/jpg" ,"image/png" , "image/gif" ,"image/raw" ).required() ,
      destination: Joi.string().required() ,
      filename:Joi.string().required() ,
      path: Joi.string().required() ,
      size: Joi.number().max(+process.env.UPLOAD_IMAGE_SIZE).required() ,
   }).required() 
})






export const paramVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,
})



export const updateCompanyVal = Joi.object({
   id:Joi.string().hex().length(24).required()  ,

   name:Joi.string().min(2).max(50).trim() ,
   description:Joi.string().min(10).max(500).trim() ,


   image:Joi.object({
      fieldname:Joi.string(),
      originalname:Joi.string(),
      encoding: Joi.string() ,
      mimetype: Joi.string().valid("image/jpeg" , "image/jpg" ,"image/png" , "image/gif" ,"image/raw" ) ,
      destination: Joi.string() ,
      filename:Joi.string() ,
      path: Joi.string() ,
      size: Joi.number().max(+process.env.UPLOAD_IMAGE_SIZE) ,
   }) 
})
