import { Schema , model } from "mongoose";

const schema =new Schema({
   image:{
      type:Object
   } ,
   title:String ,
   description:String ,
   company:String ,
   category:String ,
} , {timestamps:true}) ;



export const fileModel = model("file" , schema) ;