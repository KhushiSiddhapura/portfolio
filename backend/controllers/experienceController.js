import Experience from '../models/Experience.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get all experience entries (Public)
// @route   GET /api/experience
// @access  Public
export const getExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.find().sort({ displayOrder: 1, createdAt: -1 });
  res.status(200).json({
    success: true,
    count: experience.length,
    data: experience,
  });
});

// @desc    Get all experience entries for admin
// @route   GET /api/admin/experience
// @access  Private/Admin
export const getAdminExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.find().sort({ displayOrder: 1, createdAt: -1 });
  res.status(200).json({
    success: true,
    count: experience.length,
    data: experience,
  });
});

// @desc    Create new experience entry
// @route   POST /api/admin/experience
// @access  Private/Admin
export const createExperience = asyncHandler(async (req, res) => {
  const { position, organization, startDate } = req.body;

  if (!position || !organization || !startDate) {
    return res.status(400).json({
      success: false,
      message: 'Position, organization, and start date are required',
    });
  }

  const experience = await Experience.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Experience entry created successfully',
    data: experience,
  });
});

// @desc    Update experience entry
// @route   PUT /api/admin/experience/:id
// @access  Private/Admin
export const updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!experience) {
    return res.status(404).json({ success: false, message: 'Experience entry not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Experience entry updated successfully',
    data: experience,
  });
});

// @desc    Delete experience entry
// @route   DELETE /api/admin/experience/:id
// @access  Private/Admin
export const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (!experience) {
    return res.status(404).json({ success: false, message: 'Experience entry not found' });
  }

  await experience.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Experience entry deleted successfully',
  });
});
