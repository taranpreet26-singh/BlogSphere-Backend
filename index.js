import express from "express"
import signup from "./Routers/signUpRouters.js"
import login from "./Routers/logInRouters.js"
import userInfo from "./Routers/userInfoRouter.js"
import blogRouter from "./Routers/blogRouter.js"
import blogReadRouter from "./Routers/blogReadRouter.js"
import allUserInfo from "./Routers/allUserInfo.js"
import allBlogHome from "./Routers/allBlogHome.js"
import dotenv  from "dotenv"
import cors from "cors"
import path from "path"
import url, { fileURLToPath } from "url"

const app = express()
const port  = 3000
dotenv.config()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

//API's

app.use('/api/v1',signup)
app.use('/api/v1',login)
app.use('/api/v1',userInfo)
app.use('/api/v1',blogRouter)
app.use('/api/v1',blogReadRouter)
app.use('/api/v1',allBlogHome)
app.use('/api/v1',allUserInfo)


app.listen(port,()=>{
    console.log(`Successfully connected with http://localhost:${port}`)
})