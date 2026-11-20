import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Khushi Siddhapura',
    },
    title: {
      type: String,
      required: true,
      default: 'Full Stack Developer & IT Student',
    },
    smallIntro: {
      type: String,
      default: "Hello, I'm",
    },
    tagline: {
      type: String,
      default: 'Turning ideas into practical digital experiences with clean architecture and modern web technologies.',
    },
    heroIntroduction: {
      type: String,
      default:
        'I enjoy turning ideas into practical digital experiences. I build web applications, explore new technologies, and continuously improve my development skills.',
    },
    aboutIntroduction: {
      type: String,
      default:
        'A passionate Information Technology student interested in full-stack web development, building practical applications, exploring new technologies, and creating useful digital experiences.',
    },
    developerJourney: {
      type: String,
      default:
        'My journey into software development started with curiosity about how web applications solve real-world problems. Throughout my B.Tech studies in Information Technology, I focused on building structured, practical projects across the MERN stack and relational databases. From managing national NCC records to competing in hackathons and UI/UX design challenges, I continuously apply my problem-solving ability and engineering discipline.',
    },
    profileImage: {
      url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    email: {
      type: String,
      default: 'khushi.siddhapura@example.com',
    },
    location: {
      type: String,
      default: 'Gujarat, India',
    },
    socialLinks: {
      github: { type: String, default: 'https://github.com' },
      linkedin: { type: String, default: 'https://linkedin.com' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    education: [
      {
        institution: {
          type: String,
          default: 'Birla Vishvakarma Mahavidyalaya (BVM), Gujarat',
        },
        degree: {
          type: String,
          default: 'B.Tech in Information Technology',
        },
        duration: {
          type: String,
          default: '2025 – 2029',
        },
        score: {
          type: String,
          default: 'CGPA: 8.52 / 10',
        },
        description: {
          type: String,
          default: 'Studying core computer science and IT fundamentals, algorithms, database systems, and modern web engineering.',
        },
      },
    ],
    resumeSummary: {
      type: String,
      default:
        'I am a Full Stack Developer and 2nd year B.Tech Information Technology student at Birla Vishvakarma Mahavidyalaya (CGPA: 8.52/10). Strong frontend expertise in React.js, JavaScript, and Tailwind CSS, complemented by backend engineering using Node.js, Express, MongoDB, and MySQL. Passionate about building scalable, secure, and user-centric digital experiences with clean architecture and modern development standards.',
    },
    resumeActivities: {
      type: [String],
      default: [
        'Active volunteer participating in NSS (National Service Scheme).',
        'Attended live college workshops on MERN stack & web applications security.',
        'Personal interests: Reading, Travelling, and Music.',
      ],
    },
    technicalInterests: {
      type: [String],
      default: ['Full-Stack Web Development', 'MERN Stack Architecture', 'RESTful API Engineering', 'UI/UX & Design Systems', 'Database Modeling'],
    },
    currentLearningFocus: {
      type: String,
      default: 'Deepening advanced React design patterns, distributed backend services, and scalable state management.',
    },
    availabilityStatus: {
      isAvailable: { type: Boolean, default: true },
      text: { type: String, default: 'Available for internships & collaborations' },
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    resumePublicId: {
      type: String,
      default: '',
    },
    resumeFilename: {
      type: String,
      default: 'Khushi_Siddhapura_Resume.pdf',
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;

