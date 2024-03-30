
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import { ApiFeature } from "../../utilities/apiFeatures.js";
import { reportModel } from "../../../DataBase/models/report.model.js";



//& Get All Reports :
export const getAllReport = catchError(
   async(req , res , next)=>{
      let apiFeature = new ApiFeature(reportModel.find(), req.query ).pagination().fields().search().filter().sort();
      const reports = await apiFeature.mongooseQuery ;
      if(!reports.length) return next(new AppError("Reports is Empty" , 404))
      res.json({message:"success" ,page:apiFeature.pageNumber ,  reports})
   }
)



//& Get Single report :
export const getSingleReport = catchError(
   async(req , res , next)=>{
      const report = await reportModel.findById(req.params?.id) ;

      !report && next(new AppError("Not Found Report" , 404))
      report && res.json({message:"success" , report})
   }
)



// //& Add New report :
// export const addReport = catchError(
//    async(req , res , next)=>{
//       //& Check On Report Name is Present Or Not :
//       const reportExist = await reportModel.findOne({product:req.body.product , createdBy:req.user._id}) ;
//       if(reportExist){
//          const report = await reportModel.findByIdAndUpdate({_id:reportExist._id} , {text:req.body.text , phone:req.body.phone , product:req.body.product ,  createdBy:req.user.userId} , {new:true}) ;
//          console.log("true");

//          //& Get All reports :
//          const reports = await reportModel.find();
//          res.json({message:"success" , NewReport:report , all_reports:reports})
//       }else{
//          const report = new reportModel({text:req.body.text , phone:req.body.phone , product:req.body.product ,  createdBy:req.user._id} ) ;
//          await report.save() ;

//          //& Get All reports :
//          console.log("false");
//          const reports = await reportModel.find();
//          res.json({message:"success" , NewReport:report , all_reports:reports})
//       }
//    }
// )



//& Delete Single report :
export const deleteReport = catchError(
   async(req , res , next)=>{
      const report = await reportModel.findByIdAndDelete(req.params?.id) ;

      !report && next(new AppError("Not Found Report" , 404))
      report && res.json({message:"success" , report})
   }
)













//& Add New report :
export const addReport = catchError(
   async(req , res , next)=>{
      //& Check On Report Name is Present Or Not :
      const reportExist = await reportModel.findOne({product:req.body.product , createdBy:req.user._id}) ;

      if(reportExist){
         const report = await reportModel.findByIdAndUpdate({_id:reportExist._id} , req.body , {new:true}) ;

         //& Get All reports :
         const reports = await reportModel.find();
         res.json({message:"success" , NewReport:report , all_reports:reports})
      }else{
         req.body.createdBy = req.user._id ;
         const report = await reportModel.insertMany(req.body) ;

         //& Get All reports :
         const reports = await reportModel.find();
         res.json({message:"success" , NewReport:report , all_reports:reports})
      }
   }
)
