import { Router } from "express";
import * as reportControl from "./report.controller.js";
import { validation } from "../../middleWare/validation.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";
import { addReportVal, paramVal } from "./report.validate.js";



const router = Router();


//& Product :
router.route("/")
   .get(reportControl.getAllReport)
   .post(protectedRoutes , allowTo( "admin" ,  "moderator" , "user") , validation(addReportVal) ,   reportControl.addReport)


router.route("/:id")
   .get( validation(paramVal) ,  reportControl.getSingleReport)
   // .get(protectedRoutes , allowTo("user") , validation(paramVal) ,  reportControl.getSingleReport)
   .delete(protectedRoutes , allowTo("admin") , validation(paramVal) ,  reportControl.deleteReport)

export default router ;