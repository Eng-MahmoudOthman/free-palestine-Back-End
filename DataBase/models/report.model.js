import { Schema, Types, model } from "mongoose";

const schema = new Schema({
   text :{
      type:String ,
      trim:true ,
   },
   phone:String ,
   product:{
      type:Types.ObjectId , 
      ref:"product"
   } ,
   exist:{
      type:Boolean ,
      enum:[true , false] ,
      default:false
   } ,
   createdBy:{
      type:Types.ObjectId , 
      ref:"user"
   } ,
} , {timestamps:true }) ;
// } , {timestamps:true , toJSON: { virtuals: true } }) ;


schema.pre("find" , function(){
   this.populate("product createdBy")
})



export const reportModel = model("report" , schema) ;