import { Router } from "express";
import { createCurrentUserController } from './../controllers/user.controller';
import { jwtCheck } from "../middlewares/auth";

const router = Router()

router.post("/", jwtCheck, createCurrentUserController)


export default router;