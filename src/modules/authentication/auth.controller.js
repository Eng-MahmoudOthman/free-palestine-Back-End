import { userModel } from "../../../DataBase/models/user.model.js";
import { sendEmail } from "../../Emails/userEmails/sendEmail.js";
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('123456789', 6)




export const signUp = catchError(
   async (req , res , next)=>{
      // req.body.password  = bcrypt.hashSync( req.body.password , 8) ;
      
      const user = new userModel(req.body) ;
      await user.save();
      const token = jwt.sign({userId:user._id , name:user.name , email:user.email , role:user.role}  , process.env.SECRET_KEY )
      return res.json({message:"success" , user:{name:user.name , email:user.email , role:user.role } , token}) ;
   }
)

export const signIn = catchError(
   async (req , res , next)=>{

      const user = await userModel.findOne({
         $or:[
            {email:req.body.email} ,
            {phone:req.body.phone} 
         ]
      }) ;
      if(!user) return next(new AppError("User Not Found" , 404)) ;

      if(user.isBlocked) return next(new AppError("User is Blocked Or Deleted" , 401)) ;
      if(user && bcrypt.compareSync(req.body.password , user.password)) {
         const token = jwt.sign({userId:user._id , name:user.name , email:user.email , role:user.role} , process.env.SECRET_KEY )
         return res.json({message:"success"  , user:{ name:user.name , email:user.email , phone:user.phone  , confirmedEmail:user.confirmedEmail , confirmedCode:user.confirmedCode } ,  token}) ;
      }
      return next(new AppError("Email Or Password InCorrect" , 401)) ;
   }
)





export const changePassword = catchError(
   async (req , res , next)=>{
      const{oldPassword , newPassword} = req.body ;
      const user = await userModel.findById(req.user._id) ;
      if(user && bcrypt.compareSync(oldPassword , user.password)) {
         const token = jwt.sign({userId:user._id , name:user.name , email:user.email , role:user.role} , process.env.SECRET_KEY )

         await userModel.findByIdAndUpdate(req.user._id , {password:newPassword , passwordChangedAt:Date.now()})

         // await userModel.findByIdAndUpdate(req.user._id , {password:bcrypt.hashSync( req.body.newPassword , 8)  , passwordChangedAt:Date.now()})
         return res.json({message:"success"  , token}) ;
      }
      return next(new AppError("Email Or Old Password InCorrect" , 401)) ;
   }
)

export const changeUserInfo = catchError(
   async (req , res , next)=>{
      const{name , phone} = req.body ;

      const userExist = await userModel.findOne({phone:phone} , {new:true}) ;

      if(userExist && !(userExist._id.toString() === req.user._id.toString())){
         return next(new AppError("Phone Already Exist" , 401))
      }else{
         const user = await userModel.findByIdAndUpdate(req.user._id , req.body , {new:true}) ;

         user && res.json({message:"success"  , user:{ name:user.name , email:user.email , phone:user.phone }}) ;
         !user && next(new AppError("Data Not Valid" , 401)) ;
      }
   }
)


export const sendCode = catchError(
   async (req , res , next)=>{
      const user = await userModel.findById(req.user._id) ;
      if(!user) return next(new AppError("User Not Found")) ; 
      let codeNum = nanoid()
      let code = ()=>{
         return `
         <h2>${codeNum}</h2>
         `
      }
      user.confirmedCode = codeNum ;
      await userModel.updateOne({_id:user._id},{confirmedCode:codeNum})
      console.log(codeNum);
      sendEmail(req.user.email ,code )



         // user.confirmedEmail = true ;
         // user.isActive = true ;
         // await user.save() ;
      res.json({message:"success"})
   }
)




export const confirmedEmail = catchError(
   async (req , res , next)=>{
      const user = await userModel.findById(req.user._id) ;
      if(!user) return next(new AppError("User Not Found")) ;

      if(user.confirmedCode == req.body.code){
         await userModel.updateOne({_id:user._id},{isActive:true , confirmedEmail:true})
         return res.json({message:"success"}) ;
      }
      return next(new AppError("InCorrect Code")) ;
   }
)






export const protectedRoutes = catchError(
   async (req , res , next)=>{
      const{token} = req.headers ;

      // 1- Check Token Exist Or Not
      if(!token) return next(new AppError("Token Not Exist" , 401)) ;

      // 2- verify Token
      let decoded = jwt.verify(token , process.env.SECRET_KEY) ;
      if(!decoded) return next(new AppError("Token Not Valid" , 401)) ;

      // 3- Check Exist User Or Not
      const user = await userModel.findById(decoded.userId) ;
      if(!user) return next(new AppError("User Not Exist.?" , 401)) ;

      if(user.passwordChangedAt){
         // 4- Change Password And Token Expired
         let time = parseInt(user?.passwordChangedAt.getTime() / 1000) ;
         // console.log(time , "|" , decoded.iat);
         if(time > decoded.iat) return next(new AppError("Token Not Valid..Login again" , 401)) ;
      }

      req.user = user
      next();
   }
)




export const allowTo = (...roles)=>{

   return  catchError(
      async (req , res , next)=>{
         let adminRole = roles.includes(req.user.role) ;
         if(!adminRole) return next(new AppError("Not Authorization Entered"))
         next()
      }
   )
}
