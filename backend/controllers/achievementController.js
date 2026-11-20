import Achievement from '../models/Achievement.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get all achievements (Public)
// @route   GET /api/achievements
// @access  Public
export const getAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find().sort({ displayOrder: 1, createdAt: -1 });
  res.status(200).json({
    success: true,
    count: achievements.length,
    data: achievements,
  });
});

// @desc    Get all achievements for admin
// @route   GET /api/admin/achievements
// @access  Private/Admin
export const getAdminAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find().sort({ displayOrder: 1, createdAt: -1 });
  res.status(200).json({
    success: true,
    count: achievements.length,
    data: achievements,
  });
});

// @desc    Create new achievement
// @route   POST /api/admin/achievements
// @access  Private/Admin
export const createAchievement = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: 'Achievement title is required' });
  }

  const achievement = await Achievement.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Achievement created successfully',
    data: achievement,
  });
});

// @desc    Update achievement
// @route   PUT /api/admin/achievements/:id
// @access  Private/Admin
export const updateAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!achievement) {
    return res.status(404).json({ success: false, message: 'Achievement not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Achievement updated successfully',
    data: achievement,
  });
});

// @desc    Delete achievement
// @route   DELETE /api/admin/achievements/:id
// @access  Private/Admin
export const deleteAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findById(req.params.id);

  if (!achievement) {
    return res.status(404).json({ success: false, message: 'Achievement not found' });
  }

  await achievement.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Achievement deleted successfully',
  });
});

