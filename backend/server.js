import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import connect from "./database/conn.js";
import router from './router/route.js';
import bodyParser from 'body-parser';

const app=express();

//middleware
app.use(express.json());
app.use(cors(
   /* {
        origin:["https://deploy-mern-lwhq.vercel.app"]
    }*/
));
app.use(morgan('tiny'));
app.disable('x-powered-by'); //less hackers know about our stack
app.use(bodyParser.json({ limit: '30mb' }))

const port = 8080;

/**HTTP GET Request */
app.get('/',(req,res)=>{
    res.status(201).json("home GET Request")
});

//api routes
app.use('/api',router)

/**start server only when we have valid connection */
connect().then(()=>{
    try {
        /**start server */
        app.listen(port,()=>{
        console.log(`Server connected to http://localhost:${port}`);
})
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error=>{
    console.log("Invalid database connection..!")
})



