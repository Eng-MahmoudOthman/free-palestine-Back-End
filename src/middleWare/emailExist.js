import { userModel } from "../../DataBase/models/user.model.js";
import { AppError } from "../utilities/AppError.js";
import { catchError } from "../utilities/catchError.js";


export const emailExist = catchError(
   async(req , res , next)=>{
      let userEmail = await userModel.findOne({email:req.body?.email}) ;
      if(userEmail) return next(new AppError("Email Already Exist" , 409)) ;

      let userPhone = await userModel.findOne({phone:req.body?.phone}) ;
      if(userPhone) return next(new AppError("Phone Already Exist" , 409)) ;
      next() ;
   }
)








// export const emailExist = catchError(
//    async(req , res , next)=>{
//       let user = await userModel.findOne({
//          $or:[
//             {email:req.body?.email} ,
//             {phone:req.body?.phone} 
//          ]
//       }) ;
//       if(user) return next(new AppError("User Already Exist" , 409)) ;
//       next() ;
//    }
// )