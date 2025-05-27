import express, { Application} from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import connectToDB from './config/db';
import userRoute from "./routes/user.route"
import restaruantRoute from "./routes/myrestaurant.route"

configDotenv()

const app:Application = express();
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

// Routes 
app.use("/api/my/user", userRoute)
app.use("/api/my/restaurant", restaruantRoute)
app.listen(PORT, ()=>{
    console.log("Server statred on localhost: " + PORT)
    connectToDB()
})