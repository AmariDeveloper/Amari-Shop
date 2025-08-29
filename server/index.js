import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectToDb from "./config/dbconnection.js";
import UserRoutes from "./routes/userRoutes.js";
import ProductRoutes from "./routes/productRoutes.js";
import ClientRoutes from "./routes/clientRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
//initialize .env file
dotenv.config();

//Initialize express app
const app = express();
const port = process.env.SERVER_PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

const allowedOrigins = [
       "http://localhost:5173",
       "http://localhost:5174",
       "http://localhost:5175",
       "https://amari.africa"
] 

const corsOptions = {
       origin: function(origin, callback) {
              if(allowedOrigins.indexOf(origin) !== -1 || !origin){
                     callback(null, true); //allow the request
              }else{
                     callback(new Error("Not allowed by CORS")); //block the request
              }
       },
       credentials: true,
}

app.use(cors(corsOptions))

//Routes
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/client", ClientRoutes);
//Error handling
app.use(notFound);
app.use(errorHandler);

//Run the server
app.listen(port, () => console.log(`Server listening at port: ${port}`))

//MongoDB Connection
connectToDb();
