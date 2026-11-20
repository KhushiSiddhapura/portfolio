import express from 'express';
import {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
} from '../controllers/projectController.js';
import { getProfile, getResume } from '../controllers/profileController.js';
import { getSkills } from '../controllers/skillController.js';
import { getExperience } from '../controllers/experienceController.js';
import { getAchievements } from '../controllers/achievementController.js';
import { getSettings } from '../controllers/settingController.js';
import { createMessage } from '../controllers/messageController.js';

const router = express.Router();

// Public data endpoints
router.get('/profile', getProfile);
router.get('/resume', getResume);

router.get('/projects', getProjects);
router.get('/projects/featured', getFeaturedProjects);
router.get('/projects/:slug', getProjectBySlug);

router.get('/skills', getSkills);
router.get('/experience', getExperience);
router.get('/achievements', getAchievements);
router.get('/settings', getSettings);

// Public contact submission
router.post('/messages', createMessage);

export default router;

