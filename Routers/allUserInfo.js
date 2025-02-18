import { Router } from "express";
import { PrismaClient } from "@prisma/client";


const router  = Router()
const prisma = new PrismaClient()
router.get('/userinfo',async(req,res)=>{
   try {
    const { id } = req.query
    console.log(id)
    console.log("userinfo")
    const respones = await prisma.user.findFirst({
        where:{
            id
        }
    })
    res.json({
        msg:respones
    })
    console.log(respones)
   } catch (error) {
    res.json({
        msg:"Unexpected Error"
    })
   }
})


export default router