import Profile from '../models/Profile.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get public profile data
// @route   GET /api/profile
// @access  Public
export const getProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({});
  }
  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @desc    Update profile
// @route   PUT /api/admin/profile
// @access  Private/Admin
export const updateProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create(req.body);
  } else {
    profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
      new: true,
      runValidators: true,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: profile,
  });
});

// @desc    Get resume download info
// @route   GET /api/resume
// @access  Public
export const getResume = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne();
  if (!profile || !profile.resumeUrl) {
    return res.status(404).json({
      success: false,
      message: 'Resume is not currently available for download',
    });
  }

  res.status(200).json({
    success: true,
    data: {
      resumeUrl: profile.resumeUrl,
      filename: profile.resumeFilename || 'Khushi_Siddhapura_Resume.pdf',
    },
  });
});

