import { userModel } from "../../../DataBase/models/user.model.js"
import { AppError } from "../../utilities/AppError.js";
import { ApiFeature } from "../../utilities/apiFeatures.js";
import { catchError } from "../../utilities/catchError.js";
// import jwt  from 'jsonwebtoken' ;
// import { deleteOne } from "../handlers/handlers.js";






//& Get All Users :
export const getAllUser = catchError(
   async(req , res , next)=>{

      let apiFeature = new ApiFeature(userModel.find(), req.query ).pagination().fields().search().filter().sort();
      const users = await apiFeature.mongooseQuery;

      if(!users.length) return next(new AppError("Users is Empty" , 404))


      const result = await userModel.find()

      let currentPag = apiFeature.pageNumber ;
      let numberOfPages = Math.ceil(result.length  /apiFeature.limit)  ;
      let limit = apiFeature.limit  ;
      let nextPage = numberOfPages - apiFeature.pageNumber ;
      let prevPage = (numberOfPages - nextPage) - 1 ;

      let metadata = {
         currentPag: currentPag ,
         numberOfPages: numberOfPages ,
         limit: limit ,
         }

         if(nextPage <  numberOfPages  && nextPage != 0){
            metadata.nextPage  = nextPage
         }
         if(currentPag <=  numberOfPages  && prevPage != 0 ){
            metadata.prevPage  = prevPage
         }
      res.json({message:"success" , results:result.length ,  metadata: metadata ,  users}) ;
   }

)


//& Add User :
export const addUser = catchError(
   async (req , res , next)=>{
      const user = new userModel(req.body) ;
      await user.save();
      return res.json({message:"success" , NewUser:{name:user.name , phone:user.phone , email:user.email ,password:req.body.password ,  role:user.role} }) ;
   }
)


//& Get Single User :
export const getSingleUser = catchError(
   async(req , res , next)=>{
      const user = await userModel.findById(req.params.id) ;

      !user && next(new AppError("Not Found User" , 404))
      user && res.json({message:"success" , user})
   }
)



//& Update User By Id :
export const updateUser = catchError(
   async(req , res , next)=>{
      const user = await userModel.findById(req.params.id) ;
      if(req.body.name){
         user.name = req.body.name
      }
      if(req.body.email){
         user.email = req.body.email
      }
      if(req.body.phone){
         user.phone = req.body.phone
      }
      if(req.body.role){
         user.role = req.body.role
      }
      
      await user.save();
      !user &&  next(new AppError("Not Found User" , 404))
      user && res.json({message:"success" , updateUser:user})
   }
)


// //& Update User By Id :
// export const updateUser = catchError(
//    async(req , res , next)=>{
//       const user = await userModel.findByIdAndUpdate(req.params.id , req.body , {new:true}) ;
//       !user &&  next(new AppError("Not Found User" , 404))
//       user && res.json({message:"success" , updateUser:user})
//    }
// )


//& Delete User By Id :
export const deleteUser = catchError(
   async(req , res , next)=>{
      const user = await userModel.findByIdAndDelete(req.params.id , {new:true}) ;

      !user && next(new AppError("Not Found User" , 404))
      user && res.json({message:"success" , user})
   }
)
