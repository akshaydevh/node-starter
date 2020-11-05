import mongoose from "mongoose";
import { logger } from "./utils/logger";

export const dbConnect = async (dbURI) => {
    try {
        mongoose.connect(dbURI, { useNewUrlParser: true }).then(console.log('connected to database'))
    } catch (error) {
        logger.error(error)
    }

}