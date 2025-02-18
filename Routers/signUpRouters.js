import { Router } from "express";
import { signUpController } from "../Controllers/signUpController.js";

const router = Router()


router.post('/signup',signUpController)



export default  router