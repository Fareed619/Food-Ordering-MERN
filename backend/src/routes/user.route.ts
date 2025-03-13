import { Router } from "express";
import { createCurrentUserController } from './../controllers/user.controller';

const router = Router()

router.post("/", createCurrentUserController)


export default router;