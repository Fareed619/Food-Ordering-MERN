import cloudinary from "../config/cloudinary";
// import cloudinary from "cloudinary"


export async function uploadToCloudinary (file: any) {
    
    const image = file as Express.Multer.File ;
    const base64Image = Buffer.from(image.buffer).toString('base64')
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder:'Food-ordering Mern'
    })
    return uploadResponse.url
}


