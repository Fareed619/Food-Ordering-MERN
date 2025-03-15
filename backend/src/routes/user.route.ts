import { Router } from "express";
import { createCurrentUserController, updateUserProfileController, getUserProfileInfoController } from './../controllers/user.controller';
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyUserRequest } from "../middlewares/validation";

const router = Router()

router.post("/", jwtCheck, createCurrentUserController)
router.put("/", jwtCheck,  jwtParse, validateMyUserRequest,  updateUserProfileController)
router.get("/", jwtCheck, jwtParse, getUserProfileInfoController)


export default router;