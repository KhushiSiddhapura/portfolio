import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: [
        'Programming Languages',
        'Frontend Development',
        'Backend Development',
        'Database',
        'Tools and Technologies',
      ],
    },
    icon: {
      type: String,
      default: '',
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 80,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

skillSchema.index({ category: 1, displayOrder: 1 });

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;

