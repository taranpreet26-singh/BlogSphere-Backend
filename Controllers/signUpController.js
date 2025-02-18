import { PrismaClient } from "@prisma/client"
import z from "zod"

const prisma = new PrismaClient()

const signUpZod = z.object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
})

export async function signUpController(req, res) {


    const response = signUpZod.safeParse(req.body)
    console.log(response)
    const { email, firstName, lastName, password } = req.body
    if (response.success) {
        try {

            console.log(req.body)
            const response = await prisma.user.create({
                data: {
                    email,
                    firstName,
                    lastName,
                    password
                }
            })
            if (response) {
                res.status(200).json({
                    msg: `${email} is registered `
                })
            }

        } catch (error) {
            if (error.meta.target.includes("email")) {
                res.status(402).json({
                    msg: `This email is not unique ${email}`
                })
            } else {
                res.json({
                    msg: `Unexpected Error`
                })
            }
        }
    }else{
        res.json({
            msg:"Type Error"
        })
    }

}