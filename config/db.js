import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config();
const databaseUrl = process.env.DB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(databaseUrl);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

export default connectDB;
