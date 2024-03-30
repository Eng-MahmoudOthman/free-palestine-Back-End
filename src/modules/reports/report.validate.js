import Joi from "joi" ;
import env from "dotenv"
env.config()




export const addReportVal = Joi.object({
   text:Joi.string().min(1).max(500).trim().required() ,
   phone:Joi.string().trim().required() ,
   product:Joi.string().hex().length(24) ,
   exist:Joi.string().valid("true" , "false").required()
})





export const paramVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,
})