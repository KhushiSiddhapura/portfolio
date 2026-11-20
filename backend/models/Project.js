import mongoose from 'mongoose';

const contentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        'heading',
        'paragraph',
        'image',
        'gallery',
        'video',
        'feature-list',
        'technology-list',
        'code-block',
        'quote',
        'architecture-image',
        'two-column',
        'callout',
      ],
    },
    // Generic payload depending on block type
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    fullDescription: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: ['Full Stack', 'Frontend', 'Backend', 'AI / ML', 'Academic', 'UI / UX'],
      default: 'Full Stack',
    },
    organization: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'Full-stack development and implementation',
    },
    duration: {
      type: String,
      default: '',
    },
    technologies: {
      type: [String],
      default: [],
    },
    coverImage: {
      url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    gallery: [
      {
        url: { type: String, required: true },
        public_id: { type: String, default: '' },
        caption: { type: String, default: '' },
      },
    ],
    links: {
      github: { type: String, default: '' },
      live: { type: String, default: '' },
      documentation: { type: String, default: '' },
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    // Dynamic Content Blocks
    contentBlocks: [contentBlockSchema],
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ title: 'text', shortDescription: 'text', fullDescription: 'text' });

const Project = mongoose.model('Project', projectSchema);
export default Project;

