import { Router } from "express";
import * as AuthControl from "./auth.controller.js";
import { changePasswordVal, changeUserInfoVal, confirmedEmailVal, signInVal, signUpVal } from "./auth.validate.js";
import { validation } from "../../middleWare/validation.js";
import { emailExist } from "../../middleWare/emailExist.js";



const router  = Router() ; 



router.route("/signUp")
      .post(validation(signUpVal)  , emailExist , AuthControl.signUp) 

router.route("/signIn")
      .post(validation(signInVal)  , AuthControl.signIn) 

router.route("/sendCode")
      .post(AuthControl.protectedRoutes , AuthControl.sendCode) 

router.route("/confirmedEmail")
      .post(AuthControl.protectedRoutes , validation(confirmedEmailVal)  , AuthControl.confirmedEmail) 

router.route("/changePassword")
      .patch(AuthControl.protectedRoutes , validation(changePasswordVal) , AuthControl.changePassword) 

router.route("/changeUserInfo")
      .put(AuthControl.protectedRoutes , validation(changeUserInfoVal) , AuthControl.changeUserInfo) 

export default router ;


