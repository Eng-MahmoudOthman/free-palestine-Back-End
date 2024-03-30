
//! Handle Error External Express => Start the Code :
process.on("uncaughtException" , (error)=>{
   console.log("Error" , error);
})


import express from 'express'
import { initApp } from './src/initApp.js';
import { dbConnection } from './DataBase/dbConnection.js';
import cors from 'cors';
// import { CronJob } from 'cron';


const app = express()
const port =  process.env.PORT || 5000 ;



// mongoose.set("debug" , true) ;
// mongoose.set("strictQuery" , true) ;


//& Express Middle Ware Cors To Production :
app.use(cors()) ;

//& Express Middle Ware :
app.use(express.json()) ;
app.use("/" , express.static("Uploads")) ;

initApp(app)

//& Data Base Connection :
dbConnection()




// const job = new CronJob(
// 	'*/5 * * * *', // cronTime
// 	function () {
//       // fetch('https://jsonplaceholder.typicode.com/todos/1')
//       // .then(response => response.json())
//       // .then(json => console.log(json))
//       console.log("Print To 10 Minute");
// 	}, // onTick
// 	null, // onComplete
// 	true, // start
// 	'America/Los_Angeles' // timeZone
// );




//! Handle Error dbConnection And External Express => End the Code :
process.on("unhandledRejection" , (error)=>{
   console.log("Error" , error);
});


app.listen(port, () => console.log(`Server is running ....`))
