import Joi from "joi" ;
import env from "dotenv"
env.config()




export const addProductVal = Joi.object({
   title:Joi.string().min(2).max(200).trim().required() ,
   company:Joi.string().hex().length(24).required()  ,
   description:Joi.string().min(10).max(1500).trim().required() ,
   category:Joi.string().hex().length(24).required()  ,


   image:Joi.object({
      fieldname:Joi.string().required(),
      originalname:Joi.string().required(),
      encoding: Joi.string().required() ,
      mimetype: Joi.string().valid("image/jpeg" , "image/jpg" ,"image/png" , "image/gif" ,"image/raw" ).required() ,
      destination: Joi.string().required() ,
      filename:Joi.string().required() ,
      path: Joi.string().required() ,
      size: Joi.number().max(+process.env.UPLOAD_IMAGE_SIZE).required() ,
   }).required() ,
})



// report:[{
//    reportText:String  ,
//    phone:String ,
//    user:{
//       type:Types.ObjectId , 
//       ref:"user"
//    }
// }] ,


export const paramVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,
})


export const paramCategoryVal = Joi.object({
   category:Joi.string().hex().length(24).required() ,
})



export const updateProductVal = Joi.object({
   id:Joi.string().hex().length(24).required()  ,

   title:Joi.string().min(2).max(200).trim() ,
   company:Joi.string().hex().length(24).required()  ,
   description:Joi.string().min(10).max(1500).trim() ,
   category:Joi.string().hex().length(24)  ,


   image:Joi.object({
      fieldname:Joi.string(),
      originalname:Joi.string(),
      encoding: Joi.string() ,
      mimetype: Joi.string().valid("image/jpeg" , "image/jpg" ,"image/png" , "image/gif" ,"image/raw" ) ,
      destination: Joi.string() ,
      filename:Joi.string() ,
      path: Joi.string() ,
      size: Joi.number().max(+process.env.UPLOAD_IMAGE_SIZE) ,
   }) ,
})
