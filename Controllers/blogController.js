import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function addBlog(req,res) {
    try {
        const {title,subtitle,content} = req.body
        const imageUrl = req.imageUrl
        const userId = req.id

        console.log(userId,imageUrl)

        console.log(imageUrl,title,subtitle,content)

        const response = await prisma.blog.create({
            data:{
                title,
                subtitle,
                content,
                image:imageUrl,
                userId
            }
        })

        console.log(response)

        if(response){
            res.status(200).json({
                msg:`Successfully ${title} this blog is added`
            })
        }else{
            res.status(402).json({
                msg:'Your Blog is not added'
            })
        }
        

    } catch (error) {
        console.log(error)
        res.status(402).json({
            msg:"Unexpected Error"
        })
    }
    
}

export async function getBlog(req,res) {
    try {
        let { searchStr } = req.query
        const userId = req.id
        console.log(searchStr,"searchStr")

        if(!searchStr || searchStr == null){
            searchStr = ""
        }
        
        const response = await prisma.blog.findMany({
            where:{
                userId:userId,
                OR:[
                    {title:{startsWith: searchStr}},
                    {title:{endsWith: searchStr}},
                    {title:{contains: searchStr}},
                    {content:{startsWith:searchStr}},
                    {content:{endsWith:searchStr}},
                    {content:{contains:searchStr}},
                    {subtitle:{startsWith:searchStr}},
                    {subtitle:{endsWith:searchStr}},
                    {subtitle:{contains:searchStr}}
                ]
            }
        })
        console.log(response)

        res.status(200).json({
            msg:response
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg:"Unexpected Error"
        })
    }
    
}

export async function updateBlog(req,res) {


    try {
        
        const {title,subtitle,content,id} = req.body
        const imageUrl = req.imageUrl
        const userId = req.id
        console.log("update section")
        console.log(userId,imageUrl)

        console.log(imageUrl,title,subtitle,content)

        const response = await prisma.blog.update({
            where:{
                id
            },
            data:{
                title,
                subtitle,
                content,
                image:imageUrl,
                userId
            }
        })

        console.log(response)

        if(response){
            res.status(200).json({
                msg:`Successfully ${title} this blog is updated`
            })
        }else{
            res.status(402).json({
                msg:'Your Blog is not updated'
            })
        }
        

    } catch (error) {
        console.log(error)
        res.status(402).json({
            msg:"Unexpected Error"
        })
    }
    

    
}

export async function deleteBlog(req,res) {

    const { id } = req.body
    console.log("delete inside")
    console.log(id)
    console.log(req.body)
    try {
        
        const response = await prisma.blog.delete({
            where:{
                id
            }
            
        })
        console.log(response)
        res.status(200).json({
            msg:"Successfully blog is deleted"
        })

    } catch (error) {
        console.log(error)
        res.json({
            msg:"Unexpected Error"
        })
    }
    
}