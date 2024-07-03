import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectToDb from "./config/dbconnection.js";
import UserRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
//initialize .env file
dotenv.config();

//Initialize express app
const app = express();
const port = process.env.SERVER_PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());
const corsConfig = {
       credentials: true,
       origin: `${process.env.CLIENT_APP_URL}`,
}
app.use(cors(corsConfig))


//Routes
app.use("/api/v1/user", UserRoutes);


//Error handling
app.use(notFound);
app.use(errorHandler);

//Run the server
app.listen(port, () => console.log(`Server listening at port: ${port}`))

//MongoDB Connection
connectToDb();