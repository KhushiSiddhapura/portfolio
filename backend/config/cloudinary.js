import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const isConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export const isCloudinaryReady = () => isConfigured;

export const uploadToCloudinary = async (fileBuffer, options = {}) => {
  if (!isConfigured) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'khushi_portfolio',
        resource_type: options.resource_type || 'auto',
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          bytes: result.bytes,
        });
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!isConfigured || !publicId) return null;
  try {
    return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (err) {
    console.error(`Error deleting ${publicId} from Cloudinary:`, err.message);
    return null;
  }
};

export default cloudinary;

