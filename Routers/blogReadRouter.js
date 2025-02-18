import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router()
const prisma = new PrismaClient()

router.get('/blog',async(req,res)=>{
    try {
        const { id }  = req.query
        console.log("ID",id)
        const response = await prisma.blog.findFirst({
            where:{
                id
            }
        })
        console.log(response)
        res.json({
            msg:response
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg:"Unexpected Error"
        })
    }
})

export default router