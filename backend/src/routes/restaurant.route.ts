import { Router } from "express";
import { createMyRestaurantController } from "../controllers/restaurant.controller";
import { upload } from "../middlewares/multerStorage";
import { validateMyRestaurantRequest } from "../middlewares/validation";
import { jwtCheck, jwtParse } from "../middlewares/auth";

const router = Router()



router.post("/",upload.single("imageFile"),  validateMyRestaurantRequest, jwtCheck, jwtParse, createMyRestaurantController)




export default router