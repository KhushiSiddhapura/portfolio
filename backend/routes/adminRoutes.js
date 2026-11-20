import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { updateProfile } from '../controllers/profileController.js';
import {
  getAdminProjects,
  getAdminProjectById,
  createProject,
  updateProject,
  deleteProject,
  updateProjectStatus,
  duplicateProject,
} from '../controllers/projectController.js';
import {
  getAdminSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  reorderSkills,
} from '../controllers/skillController.js';
import {
  getAdminExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController.js';
import {
  getAdminAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementController.js';
import {
  getMessages,
  markMessageAsRead,
  deleteMessage,
} from '../controllers/messageController.js';
import { updateSettings } from '../controllers/settingController.js';
import { uploadImageFile, uploadResumeFile } from '../controllers/uploadController.js';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { uploadImage, uploadDocument } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Profile
router.put('/profile', updateProfile);

// Projects
router.get('/projects', getAdminProjects);
router.post('/projects', createProject);
router.get('/projects/:id', getAdminProjectById);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);
router.patch('/projects/:id/status', updateProjectStatus);
router.post('/projects/:id/duplicate', duplicateProject);

// Skills
router.get('/skills', getAdminSkills);
router.post('/skills', createSkill);
router.put('/skills/reorder', reorderSkills);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

// Experience
router.get('/experience', getAdminExperience);
router.post('/experience', createExperience);
router.put('/experience/:id', updateExperience);
router.delete('/experience/:id', deleteExperience);

// Achievements
router.get('/achievements', getAdminAchievements);
router.post('/achievements', createAchievement);
router.put('/achievements/:id', updateAchievement);
router.delete('/achievements/:id', deleteAchievement);

// Messages
router.get('/messages', getMessages);
router.patch('/messages/:id/read', markMessageAsRead);
router.delete('/messages/:id', deleteMessage);

// Settings
router.put('/settings', updateSettings);

// Media Uploads
router.post('/upload/image', uploadImage.single('image'), uploadImageFile);
router.post('/resume', uploadDocument.single('resume'), uploadResumeFile);

export default router;
