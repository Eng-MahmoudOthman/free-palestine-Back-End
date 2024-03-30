import { Router } from "express";
import * as fileControl from "./fileUploadTest.controller.js";
// import {uploadSingleFile } from "../../services/multerCloudinary.js";
import {uploadSingleFile } from "../../services/multer.Local.js";



const router = Router();


//& Product :
router.route("/")
   .post( uploadSingleFile("file") ,   fileControl.addFileUpload) ;
   // .post( uploadSingleFile("file") ,   fileControl.addFileUpload) ;


export default router ;