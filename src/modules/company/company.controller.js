
import { AppError } from "../../utilities/AppError.js" ;
import { catchError } from "../../utilities/catchError.js" ;
import { ApiFeature } from "../../utilities/apiFeatures.js" ;
import { companyModel } from "../../../DataBase/models/company.model.js" ;



//& Get All Companys :
export const getAllCompany = catchError(
   async(req , res , next)=>{
      let apiFeature = new ApiFeature(companyModel.find(), req.query ).pagination().fields().search().filter().sort();
      const companies = await apiFeature.mongooseQuery ;
      if(!companies.length) return next(new AppError("companies is Empty" , 404))
      res.json({message:"success" ,page:apiFeature.pageNumber ,  companies})
   }
)


//& Get Single Company :
export const getSingleCompany= catchError(
   async(req , res , next)=>{
      const company = await companyModel.findById(req.params?.id) ;

      !company && next(new AppError("Not Found Company" , 404))
      company && res.json({message:"success" , company})
   }
)


//& Add New Company :
export const addCompany = catchError(
   async(req , res , next)=>{

      //& Check On Company Name Is Present Or Not :
      const companyExist = await companyModel.findOne({name:req.body.name}) ;
      if(companyExist){
         return next(new AppError("Company Name Already Exist" , 402))
      }

      //& Insert New Company in Data Base :
      req.body.image = req.file.filename
      req.body.createdBy = req.user._id
      console.log(req.file);
      const Company = await companyModel.insertMany(req.body) ;

      //& Get All Companys :
      const Companies = await companyModel.find();

      res.json({message:"success" , NewCompany:Company , all_Companies:Companies})
   }
)


//& Update Company :
export const updateCompany = catchError(
   async(req , res , next)=>{
      
      //& File Uploads :
      if(req.file){
         if((req.file.size > +process.env.UPLOAD_IMAGE_SIZE)){
            return next(new AppError("Size Media Should be Less than 200 k-Byte" , 404))
         }else{
            req.body.image = req.file.filename ;
         }
      }

      const company = await companyModel.findByIdAndUpdate(req.params.id , req.body , {new:true}) ;
      const companys = await companyModel.find();

      //&Check Found Company :
      !company &&  next(new AppError("Not Found company" , 404))
      company && res.json({message:"success" , updateCompany:company , all_Companys:companys})

   }
)


//& Delete Company :
export const deleteCompany = catchError(
   async(req , res , next)=>{
      const Company = await companyModel.findByIdAndDelete(req.params.id , {new:true}) ;

      const Companys = await companyModel.find();
      !Company &&  next(new AppError("Not Found Company" , 404))
      Company && res.json({message:"success" , deleteCompany:Company , all_Companys:Companys})
   }
)