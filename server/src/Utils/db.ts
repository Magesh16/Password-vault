import mongoose from 'mongoose';
import {DB_STRING} from '../constant';
import logger from '../Utils/logger'
export async function connectDB(){
    try{
        await mongoose.connect(DB_STRING);
        logger.info("MongoDB connected successfully")
    }catch(err){
        logger.error(err);
        process.exit(1);
    }
}

export async function disconnectDB(){
    await mongoose.connection.close();
    logger.info('MongoDB disconnected')
    
}