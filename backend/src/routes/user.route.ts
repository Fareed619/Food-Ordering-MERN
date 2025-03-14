import { Router } from "express";
import { createCurrentUserController, updateUserProfileController } from './../controllers/user.controller';
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyUserRequest } from "../middlewares/validation";

const router = Router()

router.post("/", jwtCheck, createCurrentUserController)
router.put("/", jwtCheck,  jwtParse, validateMyUserRequest,  updateUserProfileController)


export default router;