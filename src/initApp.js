import { globalError } from "./middleWare/globalError.js";
import userRouter from "./modules/user/user.routes.js"
import authRouter from "./modules/authentication/auth.routes.js"
import categoryRouter from "./modules/category/category.routes.js"
import productRouter from "./modules/product/product.routes.js"
import reportRouter from "./modules/reports/report.routes.js"
import companyRouter from "./modules/company/company.routes.js"
import fileRouter from "./modules/fileUploadTest/fileUploadTest.routes.js"

import env from "dotenv"

env.config()


export const initApp = (app)=>{
   
   //^ User Routing :
   app.use("/api/v1/users" , userRouter) ;
   app.use("/api/v1/auth" , authRouter) ;

   app.use("/api/v1/categories" ,   categoryRouter) ;
   app.use("/api/v1/products" ,   productRouter) ;
   app.use("/api/v1/reports" ,   reportRouter) ;
   app.use("/api/v1/company" ,   companyRouter) ;
   // app.use("/api/v1/file" ,   fileRouter) ;





   //^ Express Middle Ware
   app.get('/*', (req, res) => res.json({message:'Not_Found_Page'}))





   //^ global Error Handling Middle Ware :
   app.use(globalError) ;
}