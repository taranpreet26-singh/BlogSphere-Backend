import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { userMiddleware } from "../Middleware/user.middleware.js";


const prisma = new PrismaClient()

const router  = Router()


router.get('/user/info',userMiddleware,async(req,res)=>{
 try {
       const id = req.id
       console.log(id)
       const response = await prisma.user.findFirst({
           where:{
               id
           }
       })
       if(response){
        res.status(200).json({
            msg:response
        })
       }else{
        res.status(402).json({
            msg:"User Not exist"
        })
       }
       
 } catch (error) {
    res.json({
        msg:"Unexpected Error"
    })
 }
})

export default router