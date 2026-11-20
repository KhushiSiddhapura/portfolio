import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Achievement from '../models/Achievement.js';
import Message from '../models/Message.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get dashboard metrics & recent items
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalProjects,
    publishedProjects,
    draftProjects,
    totalSkills,
    experienceCount,
    achievementsCount,
    totalMessages,
    unreadMessages,
    recentProjects,
    recentMessages,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ status: 'published' }),
    Project.countDocuments({ status: 'draft' }),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Achievement.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ isRead: false }),
    Project.find().sort({ createdAt: -1 }).limit(5).select('title slug category status featured coverImage createdAt'),
    Message.find().sort({ createdAt: -1 }).limit(5),
  ]);

  res.status(200).json({
    success: true,
    data: {
      counts: {
        totalProjects,
        publishedProjects,
        draftProjects,
        totalSkills,
        experienceCount,
        achievementsCount,
        totalMessages,
        unreadMessages,
      },
      recentProjects,
      recentMessages,
    },
  });
});
