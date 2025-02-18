import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function imageCloudinary(req, res, next){
  try {
       console.log("Received FormData: ");
       console.log(req.body); // Logs text fields
       console.log(req.file); // Logs the uploaded file
   
       // Check if a file was uploaded
       if (!req.file) {
         return res.status(400).json({ msg: "No file uploaded" });
       }
   
       // Convert the buffer to a base64 string (required by Cloudinary)
       const fileBase64 = req.file.buffer.toString('base64');
       const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;
   
       // Upload the image to Cloudinary
       const result = await cloudinary.uploader.upload(fileUri, {
         folder: 'blog_images', // Optional: specify a folder in Cloudinary
         resource_type: 'auto', // Automatically detect the file type
       });
   
       console.log("Cloudinary upload result: ", result.secure_url);
       
       // Return the Cloudinary URL in the response

         req.imageUrl =  result.secure_url, // Cloudinary URL of the uploaded image

       next()
     } catch (error) {
       console.log(error);
       return res.status(500).json({ msg: "Unexpected error" });
     }
    
};
