import { Router } from "express";
import * as categoryControl from "./category.controller.js";
import {uploadSingleFile } from "../../services/multer.Local.js";
import { validation } from "../../middleWare/validation.js";
import { addCategoryVal, updateCategoryVal } from "./category.validate.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";
import productRouter from "../product/product.routes.js"




const router = Router();

//^ Merge Params :
router.use("/:category/products" , productRouter)


router.route("/")
   .get(categoryControl.getAllCategory)
   // .get(protectedRoutes , allowTo("admin" , "moderator" , "user") ,  categoryControl.getAllCategory)
   .post(protectedRoutes , allowTo("admin" , "moderator") , uploadSingleFile("file") , validation(addCategoryVal) ,   categoryControl.addCategory) ;

router.route("/:id")
   .delete(protectedRoutes , allowTo("admin" ,  "moderator")  ,  categoryControl.deleteCategory)

   .put(protectedRoutes , allowTo("admin" ,  "moderator")  ,   uploadSingleFile("image") , validation(updateCategoryVal) , categoryControl.updateCategoryById)
   .get(protectedRoutes , allowTo("admin" , "moderator" , "user") , categoryControl.getSingleCategoryById) ;
   

export default router ;