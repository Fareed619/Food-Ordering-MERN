import express, { Application, Request, Response } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectToDB from "./config/db";

// Routes
import userRoute from "./routes/user.route";
import myrestaruantRoute from "./routes/myrestaurant.route";
import restaurantRoute from "./routes/restaurant.route";
import orderRoute from "./routes/order.route";

configDotenv();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health Ok!" });
});

// Routes
app.use("/api/my/user", userRoute);
app.use("/api/my/restaurant", myrestaruantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

app.listen(PORT, () => {
  console.log("Server statred on localhost: " + PORT);
  connectToDB();
});
