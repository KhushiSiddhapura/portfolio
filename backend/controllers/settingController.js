import Setting from '../models/Setting.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get website settings (Public)
// @route   GET /api/settings
// @access  Public
export const getSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne();
  if (!settings) {
    settings = await Setting.create({});
  }
  res.status(200).json({
    success: true,
    data: settings,
  });
});

// @desc    Update website settings
// @route   PUT /api/admin/settings
// @access  Private/Admin
export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne();
  if (!settings) {
    settings = await Setting.create(req.body);
  } else {
    settings = await Setting.findByIdAndUpdate(settings._id, req.body, {
      new: true,
      runValidators: true,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Settings updated successfully',
    data: settings,
  });
});

