import express, {Request, Response, Application} from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';

configDotenv()

const app:Application = express();
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.get("/test", async(req: Request, res:Response) => {
    res.json({message: "hello man!", state:"success"})
})

app.listen(PORT, ()=>{
    console.log("Server statred on localhost: " + PORT)
})