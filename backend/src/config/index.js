import mongoose from "mongoose";

const DB_NAME = process.env.DB_NAME;
const connectDB = async () => {
    try {

        let uri = `${process.env.MONGODB_URI}/${DB_NAME}`;
        // console.log("uri", uri);  it was for debug
        
        const connectionInstance = await mongoose.connect(uri);
        // console.log(`[info]----------- MongoDB connected successfully -----------\nDatabase host: ${connectionInstance.connection.host}\n------------------------ Happy -----------------------`);
        
    } catch (error) {
        console.log("[Error] : MongoDB Connection failed");
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;