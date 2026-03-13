import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database connected successfully")
        })
        let mongoURL = process.env.MONGODB_URL;
        const projectName = 'resume-builder';
        if (mongoURL.endsWith('/')) {
            mongoURL = mongoURL.slice(0, -1)
        }
        await mongoose.connect(`${mongoURL}/${projectName}`)
    } catch (error) {
        console.error("Error connecting to MongoDB :", error);
    }
}

export default connectDB;