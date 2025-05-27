import multer from "multer";

// This tells Multer to store uploaded files in memory (as Buffers), not on disk.
// Useful when you plan to immediately upload files to a cloud service like Cloudinary, AWS S3, etc.
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});
