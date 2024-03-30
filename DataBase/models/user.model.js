import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";


const schema = new Schema({
   name:{
      type:String , 
      required : true ,
      lowercase:true ,
      minLength:[2 , "Should be Character Count More Than 2 Character"] ,
      maxLength:[50 , "Should be Character Count Less Than 50 Character"] ,
   } ,
   email:{
      type:String ,
      required:[true , "Email is Required"] ,
      unique:true 
   } ,
   phone:{
      type:String ,
      required:[true , "Phone is Required"] ,
      unique:true 
   } ,
   password :{
      type:String ,
      required :[true , "Password is required"] 
   } ,
   isActive:{
      type:Boolean ,
      default:false
   } ,
   isBlocked:{
      type:Boolean ,
      default:false
   } ,
   confirmedEmail:{
      type:Boolean ,
      default:false
   } ,
   role:{
      type:String ,
      lowercase:true , 
      enum:["user" , "moderator" , "admin"] ,
      default:"user"
   } ,
   confirmedCode:{
      type:String 
   } ,
   passwordChangedAt:{
      type:Date 
   } ,
} , { timestamps:true } )


//& Hash Password Before Save When Add User :
schema.pre("save"  , function(){
   if(this.password) this.password = bcrypt.hashSync(this.password , 8) 
}) 


//& Hash Password Before Save When Update User :
schema.pre("findOneAndUpdate" , function(){
   if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password , 8) ; 
}) ;

export const userModel = model("user" , schema)
