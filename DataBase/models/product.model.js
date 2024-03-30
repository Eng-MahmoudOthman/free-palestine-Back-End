import mongoose, { Types } from "mongoose";

const schema =new mongoose.Schema({
   title:{
      type:String ,
      trim:true ,
      lowercase:true ,
      unique:[true , "Product Title Already Exist"] ,
      required:[true , "Product Title is required"] ,
      minLength:[2 , "Product Title is Short, should be Contain More Than 2 Character"] ,
      maxLength:[200 , "Product Title is Long, should be Contain Less Than 200 Character"] ,
   } ,
   description:{
      type:String ,
      minLength:[10 , " More than 10 Character"] ,
      maxLength:[1500 , " Less than 500 Character"] ,
      required:[true , " description is required"]
   } ,
   company:{
      type:Types.ObjectId , 
      ref:"company"
   } ,
   imgCover:{
      type:Object
   } ,
   // imgCover:{
   //    type:String
   // } ,
   active:{
      type:Boolean ,
      default: false ,
   } ,
   isProcess:{
      type:Boolean ,
      default: true ,
   } ,
   category:{
      type:Types.ObjectId , 
      ref:"category"
   } ,
   brand:{
      type:String
   } ,
   createdBy:{
      type:Types.ObjectId , 
      ref:"user"
   } ,
// } , {timestamps:true}) ;

} , {timestamps:true , toJSON: { virtuals: true } }) ;


// schema.post("init" , function(doc){
//    if(doc.imgCover) {
//       doc.imgCover = process.env.BASE_URL + doc.imgCover
//    }
// })


schema.pre(/^find/ , function(){
   this.populate("company category createdBy")
})


//& Virtual Populate in Mongoose Virtuals :
schema.virtual('All_Reports', {
   ref: 'report',
   localField: '_id',
   foreignField: 'product',
   // justOne: true
});

schema.pre("findOne" , function(){
   this.populate("All_Reports")
})



export const productModel = mongoose.model("product" , schema) ;