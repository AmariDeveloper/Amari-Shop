import mongoose from "mongoose";

const connectToDb = async () => {
       try{
            const con = await mongoose.connect(process.env.MONGO_URI);
            console.log(`MongoDB successfully connected at: ${con.connection.host}`)
       }catch(error){
            console.log(`Error: ${error.message}`);
            process.exit();
       }
}

export default connectToDb;