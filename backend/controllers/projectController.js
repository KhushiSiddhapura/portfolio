import Project from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateSlug } from '../utils/generateSlug.js';

// @desc    Get published projects (Public)
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req, res) => {
  const { category, search, tech, page = 1, limit = 12 } = req.query;

  const query = { status: 'published' };

  if (category && category !== 'All') {
    query.category = category;
  }

  if (tech) {
    query.technologies = { $in: [new RegExp(tech, 'i')] };
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
      { technologies: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const total = await Project.countDocuments(query);
  const projects = await Project.find(query)
    .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  res.status(200).json({
    success: true,
    count: projects.length,
    total,
    pages: Math.ceil(total / limitNum) || 1,
    currentPage: pageNum,
    data: projects,
  });
});

// @desc    Get featured published projects (Public)
// @route   GET /api/projects/featured
// @access  Public
export const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ status: 'published', featured: true })
    .sort({ displayOrder: 1, createdAt: -1 })
    .limit(4);

  // If fewer than 3 featured, fill with latest published projects
  if (projects.length < 3) {
    const existingIds = projects.map((p) => p._id);
    const filler = await Project.find({
      status: 'published',
      _id: { $nin: existingIds },
    })
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(4 - projects.length);
    projects.push(...filler);
  }

  res.status(200).json({
    success: true,
    data: projects,
  });
});

// @desc    Get published project by slug with next/previous links (Public)
// @route   GET /api/projects/:slug
// @access  Public
export const getProjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const project = await Project.findOne({ slug, status: 'published' });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found or is currently in draft mode',
    });
  }

  // Find next and previous published projects for navigation
  const prevProject = await Project.findOne({
    status: 'published',
    createdAt: { $lt: project.createdAt },
  })
    .sort({ createdAt: -1 })
    .select('title slug coverImage category');

  const nextProject = await Project.findOne({
    status: 'published',
    createdAt: { $gt: project.createdAt },
  })
    .sort({ createdAt: 1 })
    .select('title slug coverImage category');

  res.status(200).json({
    success: true,
    data: {
      project,
      navigation: {
        prev: prevProject || null,
        next: nextProject || null,
      },
    },
  });
});

// @desc    Get all projects for admin (including drafts)
// @route   GET /api/admin/projects
// @access  Private/Admin
export const getAdminProjects = asyncHandler(async (req, res) => {
  const { status, category, search } = req.query;
  const query = {};

  if (status && status !== 'all') {
    query.status = status;
  }
  if (category && category !== 'All') {
    query.category = category;
  }
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
    ];
  }

  const projects = await Project.find(query).sort({ displayOrder: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

// @desc    Get single project by ID for admin editor
// @route   GET /api/admin/projects/:id
// @access  Private/Admin
export const getAdminProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found',
    });
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

// @desc    Create new project
// @route   POST /api/admin/projects
// @access  Private/Admin
export const createProject = asyncHandler(async (req, res) => {
  let { title, slug } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: 'Project title is required' });
  }

  if (!slug) {
    slug = generateSlug(title);
  } else {
    slug = generateSlug(slug);
  }

  // Ensure unique slug
  let existing = await Project.findOne({ slug });
  if (existing) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }

  const projectData = {
    ...req.body,
    slug,
    publishedAt: req.body.status === 'published' ? new Date() : null,
  };

  const project = await Project.create(projectData);

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project,
  });
});

// @desc    Update project
// @route   PUT /api/admin/projects/:id
// @access  Private/Admin
export const updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  // Handle slug change if title or slug was modified
  if (req.body.slug && req.body.slug !== project.slug) {
    let newSlug = generateSlug(req.body.slug);
    const existing = await Project.findOne({ slug: newSlug, _id: { $ne: project._id } });
    if (existing) {
      newSlug = `${newSlug}-${Date.now().toString().slice(-4)}`;
    }
    req.body.slug = newSlug;
  }

  // Handle publishedAt timestamp
  if (req.body.status === 'published' && project.status !== 'published') {
    req.body.publishedAt = new Date();
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Project updated successfully',
    data: project,
  });
});

// @desc    Update project status (draft/published) or featured
// @route   PATCH /api/admin/projects/:id/status
// @access  Private/Admin
export const updateProjectStatus = asyncHandler(async (req, res) => {
  const { status, featured } = req.body;
  const updateData = {};

  if (status !== undefined) {
    updateData.status = status;
    if (status === 'published') {
      updateData.publishedAt = new Date();
    }
  }

  if (featured !== undefined) {
    updateData.featured = Boolean(featured);
  }

  const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Project status updated successfully',
    data: project,
  });
});

// @desc    Duplicate an existing project
// @route   POST /api/admin/projects/:id/duplicate
// @access  Private/Admin
export const duplicateProject = asyncHandler(async (req, res) => {
  const source = await Project.findById(req.params.id);

  if (!source) {
    return res.status(404).json({ success: false, message: 'Source project not found' });
  }

  const newTitle = `${source.title} (Copy)`;
  const newSlug = generateSlug(`${source.slug}-copy-${Date.now().toString().slice(-4)}`);

  const clonedData = source.toObject();
  delete clonedData._id;
  delete clonedData.createdAt;
  delete clonedData.updatedAt;

  clonedData.title = newTitle;
  clonedData.slug = newSlug;
  clonedData.status = 'draft';
  clonedData.featured = false;
  clonedData.publishedAt = null;

  const newProject = await Project.create(clonedData);

  res.status(201).json({
    success: true,
    message: 'Project duplicated successfully as draft',
    data: newProject,
  });
});

// @desc    Delete project
// @route   DELETE /api/admin/projects/:id
// @access  Private/Admin
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully',
  });
});
