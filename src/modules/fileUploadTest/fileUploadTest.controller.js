
import {productModel} from "../../../DataBase/models/product.model.js"
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import { ApiFeature } from "../../utilities/apiFeatures.js";
// import cloudinary from "../../services/configCloudinary.js";
import { fileModel } from "../../../DataBase/models/file.model.js";



//& Add New Product :
export const addFileUpload = catchError(
   async(req , res , next)=>{
      //& Insert New Product in Data Base :
      const file = new fileModel(req.body) ;

      //& Uploads image On Cloudinary :
      // const {public_id , secure_url} = await cloudinary.uploader.upload(req.file.path ,{folder:`products/image/${req.body.title}`}) ;
      // file.image =  {public_id , secure_url} 


      //& Uploads image On Local :
      file.image = req.file.filename


      
      await file.save() ;
      res.json({message:"success" , File:file })
   }
)


//& Update Product By Id :
export const updateProduct = catchError(
   async(req , res , next)=>{
      
      //& File Uploads :
      if(req.file){
         //&Check On Size In Images Fields And Add Image :
         if(req.file){
            if((req.file.size > +process.env.UPLOAD_IMAGE_SIZE)){
               return next(new AppError("Size Media Should be Less than 200 k-Byte" , 404))
            }
            const image = req.file.filename ;
            req.body.imgCover = image ;
         }
      }

      const product = await productModel.findByIdAndUpdate(req.params.id , req.body , {new:true}) ;
      const products = await productModel.find();

      //&Check Found Product :
      !product &&  next(new AppError("Not Found Product" , 404))
      product && res.json({message:"success" , updateProduct:product , all_Products:products})
   }
)



//& Update Product By Id :
export const deleteProduct = catchError(
   async(req , res , next)=>{
      const product = await productModel.findByIdAndDelete(req.params.id , {new:true}) ;

      const products = await productModel.find();
      !product &&  next(new AppError("Not Found Product" , 404))
      product && res.json({message:"success" , deleteProduct:product , all_Products:products})
   }
)




// //& Uploading Cloudinary :
// //^ imageCover Single Image:
// export const imageCoverCloudinary = catchError(async(req , res, next)=>{
//    const{email} = req.body ;

//    //*=============================
//    // cloudinary.uploader.upload(req.file.path , (error , result)=>{
//    //    console.log(result);
//    // })

   
//    //*=============================
//    const {public_id , secure_url} = await cloudinary.uploader.upload(req.file.path ,{folder:`products/${product.name}`}) ;
//    const user = await userModel.findOne({email}) ;
//       user.imageCoverCloud =  {public_id , secure_url} 
//       await user.save() ;
//    return res.json({message:"success" , user })
// });

// //^ images Array Images:
// export const imagesCoverCloudinary = catchError(async(req , res, next)=>{
//    const{email} = req.body ;
//    const user = await userModel.findOne({email}) ;
//    if(!user){
//       next(new AppError("User Not Found" , 404))
//    }


//    let array = [];
//    for (let i = 0; i < req.files.length; i++) {
//       const {public_id , secure_url} = await cloudinary.uploader.upload(req.files[i].path, {folder:"MahmoudOthman/ArrayImage"}) ;
//       array.push({public_id , secure_url})
//    }

//    user.imagesCloud = array
//    await user.save() ;

//    return res.json({message:"success" , user})
// });



// //^ images Fields Images:
// export const imagesFieldsCloudinary = catchError(async(req , res, next)=>{

//    // console.log(req.files.images);
//    const{email} = req.body ;

//    // const images = req.files.images.map((ele)=>{
//    //    return ele.filename
//    // })

//    const user = await userModel.findOne({email});

//    if(!user){
//       next(new AppError("User Not Found" , 404))
//    }

//    const{public_id , secure_url} = await cloudinary.uploader.upload(req.files.image[0].path , {folder:"MahmoudOthman/FieldsImage"} )
//    user.imageCoverCloud = {public_id , secure_url}
   
//    let array = [];
//    for (let i = 0; i < req.files.images.length; i++) {
//       const{public_id , secure_url} = await cloudinary.uploader.upload(req.files.images[i].path , {folder:"MahmoudOthman/FieldsImage"} ) ;
//       array.push({public_id , secure_url})
//    }
   
//    console.log(array);
//    user.imagesCloud = array
//    await user.save() ;

//    return res.json({message:"success" , user})
// });




