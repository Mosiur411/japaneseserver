import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const storagePath = path.join(__dirname, "../uploads/profilePhoto");
    console.log(storagePath)



    cb(null,storagePath); // Directory to store profile photos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB max file size
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|webp|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
      return cb(null, true);
    }
    cb(new Error("Only images are allowed!"));
  },
});
