

import multer from "multer"


const multerCloudinary = ()=>{
   const storage = multer.diskStorage({})
   const fileFilter = function (req , file , cb){
      if(file.mimetype.startsWith("image")){
         cb(null , true)
      }else{
         cb(new AppError("Type Media Not valid  *image Only!" , 404) , false)
      }
   }
   
   const upload = multer({ storage: storage  , fileFilter:fileFilter})
   return upload;
}








export const uploadSingleFile = (fieldName)=>{
   return multerCloudinary().single(fieldName) ;
}


export const uploadArrayOfFiles = (fieldName)=>{
   return multerCloudinary().array(fieldName , 10) ;
}


export const uploadFields = (fields)=>{
   return multerCloudinary().fields(fields) ;
}











