import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadToCloudinary, isCloudinaryReady } from '../config/cloudinary.js';
import { saveLocalFile } from '../middleware/uploadMiddleware.js';
import Profile from '../models/Profile.js';

// @desc    Upload an image (Cloudinary with local fallback)
// @route   POST /api/admin/upload/image
// @access  Private/Admin
export const uploadImageFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please provide an image file to upload' });
  }

  const folder = req.body.folder || 'general';

  // If Cloudinary credentials are valid, stream to Cloudinary
  if (isCloudinaryReady()) {
    try {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: `khushi_portfolio/${folder}`,
      });
      return res.status(200).json({
        success: true,
        message: 'Image uploaded to Cloudinary successfully',
        data: {
          url: result.url,
          public_id: result.public_id,
        },
      });
    } catch (err) {
      console.warn('Cloudinary upload error, falling back to local storage:', err.message);
    }
  }

  // Fallback to local uploads
  const localResult = await saveLocalFile(req.file.buffer, req.file.originalname, folder);
  res.status(200).json({
    success: true,
    message: 'Image saved locally',
    data: localResult,
  });
});

// @desc    Upload resume PDF
// @route   POST /api/admin/resume
// @access  Private/Admin
export const uploadResumeFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please provide a PDF resume file to upload' });
  }

  let fileInfo;

  if (isCloudinaryReady()) {
    try {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: 'khushi_portfolio/documents',
        resource_type: 'raw',
      });
      fileInfo = {
        url: result.url,
        public_id: result.public_id,
        filename: req.file.originalname,
      };
    } catch (err) {
      console.warn('Cloudinary resume upload error, saving locally:', err.message);
    }
  }

  if (!fileInfo) {
    fileInfo = await saveLocalFile(req.file.buffer, req.file.originalname, 'resumes');
  }

  // Update profile with resume URL and filename
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({
      resumeUrl: fileInfo.url,
      resumePublicId: fileInfo.public_id,
      resumeFilename: req.file.originalname,
    });
  } else {
    profile.resumeUrl = fileInfo.url;
    profile.resumePublicId = fileInfo.public_id;
    profile.resumeFilename = req.file.originalname;
    await profile.save();
  }

  res.status(200).json({
    success: true,
    message: 'Resume uploaded and published successfully',
    data: {
      resumeUrl: fileInfo.url,
      filename: req.file.originalname,
    },
  });
});
