import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export async function userMiddleware(req,res,next) {
    console.log("usermiddleware")
    const token = req.headers.authorization
    console.log(token)
    
    const response = jwt.verify(token,process.env.SIGNATURE)
    console.log(response)
    const userExist = await prisma.user.findFirst({
        where:{
            id:response.id
        }
    })
    console.log(userExist)
    if(userExist){
        req.id = userExist.id
        console.log("next")
        next()
    }else{
        res.status(402).json({
            msg:"User Invalid"
        })
    }
}