import { Router } from "express";
import * as CompanyControl from "./company.controller.js";
// import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";
import {uploadSingleFile } from "../../services/multer.Local.js";
import { addCompanyVal, paramVal, updateCompanyVal } from "./company.validate.js";
import { validation } from "../../middleWare/validation.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";



const router = Router();


//& Company :
router.route("/")
   .get( protectedRoutes , allowTo("admin" ,  "moderator" , "user") , CompanyControl.getAllCompany)
   .post(protectedRoutes , allowTo("admin" ,  "moderator" , "user") ,  uploadSingleFile("file") , validation(addCompanyVal) ,   CompanyControl.addCompany) ;

router.route("/:id")
   .delete(protectedRoutes , allowTo("admin" ,  "moderator") , validation(paramVal) ,  CompanyControl.deleteCompany)
   .put(protectedRoutes , allowTo("admin" ,  "moderator") ,  uploadSingleFile("file") , validation(updateCompanyVal) ,   CompanyControl.updateCompany)
   .get(protectedRoutes , allowTo("admin" ,  "moderator" , "user") , validation(paramVal) ,  CompanyControl.getSingleCompany) ;
   
export default router ;