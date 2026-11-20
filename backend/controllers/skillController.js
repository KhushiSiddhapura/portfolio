import Skill from '../models/Skill.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get all visible skills grouped by category (Public)
// @route   GET /api/skills
// @access  Public
export const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find({ isVisible: true }).sort({ displayOrder: 1, createdAt: 1 });

  // Group by category
  const categories = [
    'Programming Languages',
    'Frontend Development',
    'Backend Development',
    'Database',
    'Tools and Technologies',
  ];

  const grouped = categories.map((cat) => ({
    category: cat,
    skills: skills.filter((s) => s.category === cat),
  }));

  res.status(200).json({
    success: true,
    count: skills.length,
    data: skills,
    grouped,
  });
});

// @desc    Get all skills for admin
// @route   GET /api/admin/skills
// @access  Private/Admin
export const getAdminSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ category: 1, displayOrder: 1, createdAt: 1 });
  res.status(200).json({
    success: true,
    count: skills.length,
    data: skills,
  });
});

// @desc    Create new skill
// @route   POST /api/admin/skills
// @access  Private/Admin
export const createSkill = asyncHandler(async (req, res) => {
  const { name, category, icon, proficiency, isVisible, displayOrder } = req.body;

  if (!name || !category) {
    return res.status(400).json({ success: false, message: 'Skill name and category are required' });
  }

  const skill = await Skill.create({
    name,
    category,
    icon: icon || '',
    proficiency: proficiency !== undefined ? proficiency : 80,
    isVisible: isVisible !== undefined ? isVisible : true,
    displayOrder: displayOrder || 0,
  });

  res.status(201).json({
    success: true,
    message: 'Skill created successfully',
    data: skill,
  });
});

// @desc    Update skill
// @route   PUT /api/admin/skills/:id
// @access  Private/Admin
export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!skill) {
    return res.status(404).json({ success: false, message: 'Skill not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Skill updated successfully',
    data: skill,
  });
});

// @desc    Delete skill
// @route   DELETE /api/admin/skills/:id
// @access  Private/Admin
export const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({ success: false, message: 'Skill not found' });
  }

  await skill.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Skill deleted successfully',
  });
});

// @desc    Bulk reorder skills
// @route   PUT /api/admin/skills/reorder
// @access  Private/Admin
export const reorderSkills = asyncHandler(async (req, res) => {
  const { items } = req.body; // Array of { id, displayOrder }

  if (!Array.isArray(items)) {
    return res.status(400).json({ success: false, message: 'Invalid items array' });
  }

  const bulkOps = items.map((item) => ({
    updateOne: {
      filter: { _id: item.id },
      update: { $set: { displayOrder: item.displayOrder } },
    },
  }));

  await Skill.bulkWrite(bulkOps);

  res.status(200).json({
    success: true,
    message: 'Skills reordered successfully',
  });
});

