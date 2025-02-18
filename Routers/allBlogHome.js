import { Router } from "express";
import { PrismaClient } from "@prisma/client";


const router  = Router()
const prisma = new PrismaClient()
router.get('/allblog',async(req,res)=>{
   try {
     const respones = await prisma.blog.findMany({
     })
     if(respones){
        res.json({
             msg:respones
         })
     }
   } catch (error) {
    res.json({
        msg:"Unexpected Error"
    })
   }
})


export default router