import { Router } from "express";
import { addBlog, deleteBlog, getBlog, updateBlog } from "../Controllers/blogController.js";
import { imageCloudinary } from "../Middleware/imageClodinary.js";
import { userMiddleware } from "../Middleware/user.middleware.js";
import multer from "multer";
import cloudinary from "cloudinary"


const router = Router()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() }); // Storing in memory for debugging

// router.post('/blog/add',userMiddleware,imageCloudinary,addBlog)

router.post("/blog/add", upload.single("image"),imageCloudinary,userMiddleware,addBlog);

router.get('/blog/read',userMiddleware,getBlog)
router.put('/blog/update',upload.single("image"),imageCloudinary,userMiddleware,updateBlog)
router.delete('/blog/delete',userMiddleware,deleteBlog)

export default router