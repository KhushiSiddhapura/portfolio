import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');

// Ensure local uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Storage in memory so buffer can be streamed to Cloudinary or saved to local disk
const storage = multer.memoryStorage();

const fileFilter = (allowedTypes) => (req, file, cb) => {
  const mimeMatch = allowedTypes.some((type) => file.mimetype.includes(type));
  if (mimeMatch) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`), false);
  }
};

export const uploadImage = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter(['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif']),
});

export const uploadDocument = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: fileFilter(['application/pdf']),
});

// Helper to save buffer to local disk if Cloudinary is not configured
export const saveLocalFile = async (buffer, originalname, folder = '') => {
  const targetDir = folder ? path.join(uploadsDir, folder) : uploadsDir;
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const ext = path.extname(originalname);
  const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const filePath = path.join(targetDir, uniqueName);
  await fs.promises.writeFile(filePath, buffer);
  
  const relativePath = folder ? `/uploads/${folder}/${uniqueName}` : `/uploads/${uniqueName}`;
  return {
    url: relativePath,
    public_id: `local-${uniqueName}`,
    filename: uniqueName,
  };
};

