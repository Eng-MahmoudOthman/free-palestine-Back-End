
import {productModel} from "../../../DataBase/models/product.model.js"
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import { ApiFeature } from "../../utilities/apiFeatures.js";
import cloudinary from "../../services/configCloudinary.js";



//& Get All Products And Get All Products Specific Category :
export const getAllProduct = catchError(
   async(req , res , next)=>{
      let result = [];

      //^ Merge Params
      let filterObj = {};
      if(req.params.category){
         filterObj.category = req.params.category
         filterObj.active = true
      }

      if(req.query.active && req.query.isProcess){
         filterObj.active = req.query.active ;
         filterObj.isProcess = req.query.isProcess ;
         result = await productModel.find(filterObj)
      }
      else{
         result = await productModel.find()
      }

      let apiFeature = new ApiFeature(productModel.find(filterObj), req.query ).pagination().fields().search().filter().sort();
      const products = await apiFeature.mongooseQuery ;
      if(!products.length) return next(new AppError("Products is Empty" , 404))

      let currentPag = apiFeature.pageNumber ;
      let numberOfPages = Math.ceil(result.length  /apiFeature.limit)  ;
      let limit = apiFeature.limit  ;
      let nextPage = numberOfPages - apiFeature.pageNumber ;
      let prevPage = (numberOfPages - nextPage) - 1 ;

      let metadata = {
         currentPag: currentPag ,
         numberOfPages: numberOfPages || 0 ,
         limit: limit || 50 ,
         }

         if(nextPage <  numberOfPages  && nextPage != 0){
            metadata.nextPage  = nextPage
         }
         if(currentPag <=  numberOfPages  && prevPage != 0 ){
            metadata.prevPage  = prevPage
         }
      res.json({message:"success" , results:result.length ,  metadata: metadata ,  products}) ;
   }
)


//& Get All Products Specific User :
export const getProductsSpecificUser = catchError(
   async(req , res , next)=>{

      const products = await productModel.find({createdBy:req.params.id}) ;
      if(!products.length) return next(new AppError("Products is Empty" , 404))

      res.json({message:"success" ,  products}) ;
   }
)



//& Active Product :
export const activeProduct = catchError(
   async(req , res , next)=>{
      const product = await productModel.findByIdAndUpdate(req.params.id , {isProcess:false , active:true} , {new:true}) ;
      !product &&  next(new AppError("Product Not Found" , 404))

      res.json({message:"success" ,  product}) ;
   }
)



//& Block Product :
export const blockProduct = catchError(
   async(req , res , next)=>{
      const product = await productModel.findByIdAndUpdate(req.params.id , {isProcess:false , active:false} , {new:true}) ;
      !product &&  next(new AppError("Product Not Found" , 404))

      res.json({message:"success" ,  product}) ;
   }
)



//& Get Single Product :
export const getSingleProductById = catchError(
   async(req , res , next)=>{
      const product = await productModel.findById(req.params?.id) ;

      !product && next(new AppError("Not Found Product" , 404))
      product && res.json({message:"success" , product})
   }
)



//& Add New Product :
export const addProduct = catchError(
   async(req , res , next)=>{
      //& Check On Product Name Is Present Or Not :
      const productExist = await productModel.findOne({title:req.body.title}) ;
      if(productExist){
         return next(new AppError("Product Name Already Exist" , 402))
      }

      //& Insert New Product in Data Base :
      const product = new productModel(req.body) ;

      //& Active Automatic Product when Added By Admin :
      if(req.user.role == "admin"){
         product.active = true
         product.isProcess = false
      }else if(req.user.role == "moderator"){
         product.active = true
         product.isProcess = false
      }

      //& Uploads image On Cloudinary :
      const {public_id , secure_url} = await cloudinary.uploader.upload(req.file.path ,{folder:`free-palestine/products/image/${req.body.title}`}) ;
      product.imgCover =  {public_id , secure_url} 
      product.createdBy = req.user._id

       //& Uploads image On Local :
      // product.imgCover = req.file.filename


      await product.save() ;

      //& Get All Products :
      const products = await productModel.find();

      res.json({message:"success" , NewProduct:product , all_Products:products})
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



//& Delete Product By Id :
export const deleteProduct = catchError(
   async(req , res , next)=>{
      const product = await productModel.findByIdAndDelete(req.params.id) ;

      //^ Delete Image From cloudinary:
      if(product.imgCover.public_id){
         //! Delete image From Cloudinary :
         await cloudinary.uploader.destroy(product.imgCover.public_id);
         
         //! Delete Folder image From Cloudinary :
         await cloudinary.api.delete_folder(`free-palestine/products/image/${product.title}`)
      }



      const products = await productModel.find();
      !product &&  next(new AppError("Not Found Product" , 404))
      product && res.json({message:"success" , deleteProduct:product , all_Products:products})
   }
)