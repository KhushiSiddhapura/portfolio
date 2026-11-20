import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, 'Organization is required'],
      trim: true,
    },
    employmentType: {
      type: String,
      default: 'Internship',
    },
    startDate: {
      type: String,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: String,
      default: '',
    },
    currentlyWorking: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
      default: 'Remote / Online',
    },
    description: {
      type: String,
      default: 'Online web development internship focusing on practical application development and modern web development workflows.',
    },
    technologies: {
      type: [String],
      default: ['JavaScript', 'HTML5', 'CSS3', 'React.js'],
    },
    logo: {
      url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

experienceSchema.index({ displayOrder: 1, createdAt: -1 });

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
