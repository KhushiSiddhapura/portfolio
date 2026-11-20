import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    websiteTitle: {
      type: String,
      default: 'Khushi Siddhapura | Full Stack Developer Portfolio',
    },
    websiteDescription: {
      type: String,
      default: 'Personal portfolio and developer showcase of Khushi Siddhapura, Full Stack Developer and IT Student.',
    },
    logoText: {
      type: String,
      default: 'Khushi',
    },
    logoImage: {
      url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    favicon: {
      url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    contactEmail: {
      type: String,
      default: 'khushi.siddhapura@example.com',
    },
    socialLinks: {
      github: { type: String, default: 'https://github.com' },
      linkedin: { type: String, default: 'https://linkedin.com' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    seo: {
      keywords: {
        type: [String],
        default: ['Khushi Siddhapura', 'Full Stack Developer', 'MERN Stack', 'BVM IT', 'Portfolio', 'Web Developer'],
      },
      metaTitle: {
        type: String,
        default: 'Khushi Siddhapura | Full Stack Developer & IT Student',
      },
      metaDescription: {
        type: String,
        default: 'Explore full-stack web applications, technical skills, and projects by Khushi Siddhapura.',
      },
      ogImage: {
        url: { type: String, default: '' },
        public_id: { type: String, default: '' },
      },
    },
    footerText: {
      type: String,
      default: 'Built with passion, clean code, and modern full-stack technologies.',
    },
    homepageSections: {
      showHero: { type: Boolean, default: true },
      showAbout: { type: Boolean, default: true },
      showFeaturedProjects: { type: Boolean, default: true },
      showSkills: { type: Boolean, default: true },
      showExperience: { type: Boolean, default: true },
      showAchievements: { type: Boolean, default: true },
      showContact: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
