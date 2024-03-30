import  {Schema , Types, model } from "mongoose";


const schema = new Schema({
   name:{
      type:String ,
      trim:true ,
      unique:[true , "Company Title Already Exist"] ,
      required:[true , "Company Title is required"] ,
      minLength:[2 , "Company Title is Short, should be Contain More Than 2 Character"] ,
      maxLength:[50 , "Company Title is Long, should be Contain Less Than 50 Character"] ,
   } ,
   description:{
      type:String ,
      minLength:[10 , " More than 10 Character"] ,
      maxLength:[500 , " Less than 500 Character"] ,
      required:[true , " Description is required"]
   } ,
   image:String ,
   createdBy:{
      type:Types.ObjectId , 
      ref:"user"
   } ,
} , {timestamps:true}) ;


schema.pre("init" , function(doc){
   doc.image = process.env.BASE_URL +  doc.image
})


schema.pre(/^find/ , function(){
   this.populate("createdBy" , "name email phone")
})


export const companyModel = model("company" , schema) ;