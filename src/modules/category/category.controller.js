
import {categoryModel} from "../../../DataBase/models/category.model.js"
import { AppError } from "../../utilities/AppError.js";
import { ApiFeature } from "../../utilities/apiFeatures.js";
import { catchError } from "../../utilities/catchError.js";


//& Get All Categories :
export const getAllCategory = catchError(
   async(req , res , next)=>{
      let apiFeature = new ApiFeature(categoryModel.find(), req.query ).pagination().fields().search().sort().filter();
      const categories = await apiFeature.mongooseQuery ;
      if(!categories.length) return next(new AppError("Categories is Empty" , 404))
      res.json({message:"success" ,page:apiFeature.pageNumber ,  categories})
   }
)


//& Get Single Category :
export const getSingleCategoryById = catchError(
   async(req , res , next)=>{
      const category = await categoryModel.findById(req.params?.id) ;

      !category && next(new AppError("Not Found Category" , 404))
      category && res.json({message:"success" , category})
   }
)


//& Add New Category :
export const addCategory = catchError(
   async(req , res , next)=>{
      const {name } = req.body ;

      //& Check On Category Name Is Present Or Not :
      const categoryExist = await categoryModel.findOne({name}) ;
      if(categoryExist){
         return next(new AppError("Name Already Exist" , 402))
      }

      //& Check On Size File Media Before Convert From k-byte to Mega byte :
      if(req.file){
         if((req.file.size > +process.env.UPLOAD_IMAGE_SIZE)){
            return next(new AppError("Size Media Should be Less than 200 k-Byte" , 404))
         }
         const image = req.file.filename ;
         req.body.image = image ;
      }
      const category = new categoryModel(req.body) ;
      await category.save() ;

      //& Get All Categories :
      const categories = await categoryModel.find();

      res.json({message:"success" , NewCategory:category , all_Categories:categories})
   }
)


//& Update Category By Id :
export const updateCategoryById = catchError(
   async(req , res , next)=>{
      const{name} = req.body ;
      const{id} = req.params 

      //& Check On Size File Media Before Convert From k-byte to Mega byte :
      if(req.file){
         // req.file.size = req.file.size / 1024 ;
         if((req.file.size > +process.env.UPLOAD_IMAGE_SIZE)){
            console.log(req.file);
            return next(new AppError("Size Media Should be Less than 200 k-Byte" , 404))
         }
         const image = req.file.filename ;
         req.body.image = image ;
      }
      const category = await categoryModel.findByIdAndUpdate(id , req.body , {new:true}) ;
      
      const categories = await categoryModel.find();

      !category &&  next(new AppError("Not Found Category" , 404))
      category && res.json({message:"success" , updateCategory:category , all_Categories:categories})
   }
)



//& Update Category By Id :
export const deleteCategory = catchError(
   async(req , res , next)=>{
      const category = await categoryModel.findByIdAndDelete(req.params.id , {new:true}) ;

      !category &&  next(new AppError("Not Found Category" , 404))
      category && res.json({message:"success" , deleteCategory:category })
   }
)


