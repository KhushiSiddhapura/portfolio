import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Achievement title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['Academic', 'Competition', 'Design', 'Hackathon', 'Other'],
      default: 'Academic',
    },
    date: {
      type: String,
      default: '',
    },
    certificateImage: {
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

achievementSchema.index({ displayOrder: 1, createdAt: -1 });

const Achievement = mongoose.model('Achievement', achievementSchema);
export default Achievement;
