import { Router } from "express";
import * as productControl from "./product.controller.js";
import { validation } from "../../middleWare/validation.js";
import { addProductVal , paramVal, updateProductVal } from "./product.validate.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";
// import {uploadSingleFile } from "../../services/multer.Local.js";
import {uploadSingleFile } from "../../services/multerCloudinary.js";



// const router = Router();
//^ Merge Params :
const router = Router({mergeParams:true});


//& Product :
router.route("/")
   .get(productControl.getAllProduct)
   .post(protectedRoutes , allowTo("admin" ,  "moderator" , "user") ,  uploadSingleFile("file") ,  validation(addProductVal)  ,   productControl.addProduct) ;


router.route("/:id")
   .delete(protectedRoutes , allowTo("admin" ,  "moderator") , validation(paramVal) ,  productControl.deleteProduct)
   .put(protectedRoutes , allowTo("admin" ,  "moderator") , uploadSingleFile("image") , validation(updateProductVal) , productControl.updateProduct)
   .get(validation(paramVal) ,  productControl.getSingleProductById) ;
   
router.route("/productsSpecificUser/:id")
   .get(validation(paramVal) ,  productControl.getProductsSpecificUser) ;
   
router.route("/active/:id")
   .patch(protectedRoutes , allowTo("admin" ,  "moderator") , validation(paramVal) ,  productControl.activeProduct) ;
   
router.route("/block/:id")
   .patch(protectedRoutes , allowTo("admin" ,  "moderator") , validation(paramVal) ,  productControl.blockProduct) ;
   

export default router ;