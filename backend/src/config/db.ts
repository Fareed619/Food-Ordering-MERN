import { configDotenv } from "dotenv";
import { connect } from "mongoose";
configDotenv()

const connectToDB = async() => {
    try {
        await connect(process.env.MONGO_URI as string);
        console.log("Connected To Mongo DB 👍👍")

    } catch (error) {
        console.log("Error in connecting to DB 💔💔")
        return ;
    }
}

export default connectToDB;
        

