import z from "zod"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const loginZod = z.object({
    email: z.string(),
    password: z.string()
})
export async function loginController(req, res) {
    const result = loginZod.safeParse(req.body)
    console.log(req.body)

    if (result.success) {
        const { email, password } = req.body

        const response = await prisma.user.findFirst({
            where: {
                email,
                password
            },
            select: {
                id: true
            }
        })
        if(response.id === null){
            return res.json({
                data:{msg:"You're not registered"}
            })
        }
        if (response) {
            const token = jwt.sign({ id }, process.env.SIGNATURE)
            console.log(token)
            res.status(200).json({
                msg: "Login Successfully",
                token: token
            })
        } else {
            res.status(402).json({
                msg: "Incorrect Email & password"
            })
        }
    } else {
        res.json({
            msg: "Type Error"
        })
    }

}
