import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Achievement from '../models/Achievement.js';
import Setting from '../models/Setting.js';
import { connectDB } from '../config/db.js';

export const seedInitialData = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@khushisiddhapura.dev';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      console.log('[Seed] Seeding initial admin account...');
      await User.create({
        name: process.env.ADMIN_NAME || 'Khushi Siddhapura',
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'AdminPassword123!',
        role: 'admin',
      });
      console.log(`[Seed] Admin created: ${adminEmail}`);
    }

    // Seed Profile
    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
      console.log('[Seed] Seeding initial profile...');
      await Profile.create({
        name: 'Khushi Siddhapura',
        title: 'Full Stack Developer / B.Tech IT Student',
        smallIntro: "Hello, I'm",
        heroIntroduction:
          'I enjoy turning ideas into practical digital experiences. I build web applications, explore new technologies, and continuously improve my development skills.',
        aboutIntroduction:
          'A passionate Information Technology student interested in full-stack web development, building practical applications, exploring new technologies, and creating useful digital experiences.',
        developerJourney:
          'My journey into software development started with curiosity about how web applications solve real-world problems. Throughout my B.Tech studies in Information Technology at Birla Vishvakarma Mahavidyalaya (BVM), I focused on building structured, practical projects across the MERN stack and relational databases. From managing college NCC records to competing in hackathons and UI/UX design challenges, I continuously apply my problem-solving ability and engineering discipline.',
        email: 'khushi.siddhapura@example.com',
        location: 'Gujarat, India',
        education: [
          {
            institution: 'Birla Vishvakarma Mahavidyalaya (BVM), Gujarat',
            degree: 'B.Tech in Information Technology',
            duration: 'Pursuing',
            description: 'Focused on core computer science subjects, database engineering, software development life cycle, and modern web application development.',
          },
        ],
        technicalInterests: [
          'Full-Stack Web Development',
          'MERN Stack Architecture',
          'RESTful API Engineering',
          'UI/UX & Design Systems',
          'Database Management',
        ],
        currentLearningFocus:
          'Expanding proficiency in scalable full-stack application architecture, state orchestration, and performance tuning.',
        availabilityStatus: {
          isAvailable: true,
          text: 'Available for internships & full-stack development roles',
        },
        socialLinks: {
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: '',
          instagram: '',
        },
      });
    }

    // Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      console.log('[Seed] Seeding initial technical skills...');
      const initialSkills = [
        // Programming Languages
        { name: 'C', category: 'Programming Languages', proficiency: 80, displayOrder: 1 },
        { name: 'C++', category: 'Programming Languages', proficiency: 85, displayOrder: 2 },
        { name: 'JavaScript', category: 'Programming Languages', proficiency: 90, displayOrder: 3 },
        { name: 'PHP', category: 'Programming Languages', proficiency: 75, displayOrder: 4 },

        // Frontend Development
        { name: 'HTML', category: 'Frontend Development', proficiency: 95, displayOrder: 1 },
        { name: 'CSS', category: 'Frontend Development', proficiency: 90, displayOrder: 2 },
        { name: 'JavaScript', category: 'Frontend Development', proficiency: 90, displayOrder: 3 },
        { name: 'React.js', category: 'Frontend Development', proficiency: 88, displayOrder: 4 },
        { name: 'Tailwind CSS', category: 'Frontend Development', proficiency: 88, displayOrder: 5 },

        // Backend Development
        { name: 'Node.js', category: 'Backend Development', proficiency: 85, displayOrder: 1 },
        { name: 'Express.js', category: 'Backend Development', proficiency: 85, displayOrder: 2 },
        { name: 'PHP', category: 'Backend Development', proficiency: 75, displayOrder: 3 },
        { name: 'REST APIs', category: 'Backend Development', proficiency: 88, displayOrder: 4 },

        // Database
        { name: 'MongoDB', category: 'Database', proficiency: 82, displayOrder: 1 },
        { name: 'MySQL', category: 'Database', proficiency: 80, displayOrder: 2 },

        // Tools and Technologies
        { name: 'Git', category: 'Tools and Technologies', proficiency: 85, displayOrder: 1 },
        { name: 'GitHub', category: 'Tools and Technologies', proficiency: 85, displayOrder: 2 },
        { name: 'VS Code', category: 'Tools and Technologies', proficiency: 92, displayOrder: 3 },
        { name: 'Figma', category: 'Tools and Technologies', proficiency: 82, displayOrder: 4 },
        { name: 'Vite', category: 'Tools and Technologies', proficiency: 88, displayOrder: 5 },
      ];

      await Skill.insertMany(initialSkills);
    }

    // Seed Experience
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      console.log('[Seed] Seeding initial experience...');
      await Experience.create({
        position: 'Web Development Intern',
        organization: 'My Job Grow',
        employmentType: 'Online Internship',
        startDate: 'January 2026',
        endDate: '',
        currentlyWorking: true,
        location: 'Online / Remote',
        description: 'Engaged in web development tasks, building structured components, exploring modern web technologies, and gaining practical developer experience.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
        displayOrder: 1,
      });
    }

    // Seed Achievements
    const achCount = await Achievement.countDocuments();
    if (achCount === 0) {
      console.log('[Seed] Seeding initial achievements...');
      await Achievement.insertMany([
        {
          title: 'Second Highest Score in HSC',
          description: 'Achieved academic excellence by securing the 2nd highest score in the Higher Secondary Certificate (HSC) examinations.',
          category: 'Academic',
          date: 'Academic Milestone',
          displayOrder: 1,
        },
        {
          title: 'Second Rank in Cracking the Code Competition',
          description: 'Secured 2nd rank in the "Cracking the Code" programming and problem-solving competition held during First Year (FY) IT.',
          category: 'Competition',
          date: 'FY IT',
          displayOrder: 2,
        },
        {
          title: 'Best Three Static Designs in Figma UI/UX Competition',
          description: 'Recognized among the top three static interface designs in a college-level Figma UI/UX design competition.',
          category: 'Design',
          date: 'College UI/UX Contest',
          displayOrder: 3,
        },
      ]);
    }

    // Seed Initial Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('[Seed] Seeding initial projects with structured content blocks...');
      const initialProjects = [
        {
          title: 'NCC Management Web Application',
          slug: 'ncc-management-web-application',
          shortDescription: 'A web application developed for college NCC-related management for 38 GUJ BN NCC.',
          fullDescription:
            'A full-stack web application designed and developed to manage cadet records, attendance, camp participations, and administrative workflows for 38 GUJ BN NCC.',
          category: 'Full Stack',
          organization: '38 GUJ BN NCC',
          role: 'Full-stack development and implementation',
          duration: 'Academic Project',
          technologies: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'Tailwind CSS'],
          status: 'published',
          featured: true,
          displayOrder: 1,
          publishedAt: new Date(),
          contentBlocks: [
            {
              type: 'heading',
              data: { text: 'Overview & Background', level: 2 },
              order: 1,
            },
            {
              type: 'paragraph',
              data: {
                text: 'Developed specifically for 38 GUJ BN NCC, this web application centralizes cadet documentation, camp attendance tracking, and administrative record-keeping that was previously maintained through manual registers.',
              },
              order: 2,
            },
            {
              type: 'feature-list',
              data: {
                title: 'Core Features',
                items: [
                  'Cadet enrollment and profile record management',
                  'Attendance logging for regular parades and drill sessions',
                  'Camp participation records and certification tracking',
                  'Role-based administrative views for coordinators and officers',
                  'Searchable cadet database with filtered exports',
                ],
              },
              order: 3,
            },
            {
              type: 'callout',
              data: {
                title: 'Engineering Challenge',
                text: 'Structuring relational data patterns (such as cadet attendance across diverse parade dates and multiple camp types) cleanly within a document-oriented database while ensuring rapid administrative lookups.',
                type: 'info',
              },
              order: 4,
            },
            {
              type: 'technology-list',
              data: {
                title: 'Technology Stack',
                technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
              },
              order: 5,
            },
            {
              type: 'quote',
              data: {
                quote: 'Digitizing cadet record workflows provided valuable hands-on experience in full-stack architecture, database design, and real-world user requirements.',
                author: 'Khushi Siddhapura, Project Lead',
              },
              order: 6,
            },
          ],
        },
        {
          title: 'E-Commerce Web Application',
          slug: 'e-commerce-web-application',
          shortDescription: 'An academic e-commerce application with product browsing, user authentication, and cart functionality.',
          fullDescription:
            'A comprehensive academic e-commerce platform built using PHP and MySQL featuring product catalog browsing, cart operations, customer authentication, and order workflows.',
          category: 'Academic',
          organization: 'Birla Vishvakarma Mahavidyalaya',
          role: 'Full-stack development',
          duration: 'Academic Term Project',
          technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
          status: 'published',
          featured: true,
          displayOrder: 2,
          publishedAt: new Date(),
          contentBlocks: [
            {
              type: 'heading',
              data: { text: 'Project Overview', level: 2 },
              order: 1,
            },
            {
              type: 'paragraph',
              data: {
                text: 'An academic web engineering project designed to master the fundamentals of server-side scripting with PHP, relational database normalization in MySQL, and client-side interactions with vanilla JavaScript.',
              },
              order: 2,
            },
            {
              type: 'feature-list',
              data: {
                title: 'Implemented Capabilities',
                items: [
                  'Secure user registration and session-based authentication',
                  'Categorized product catalog with search and price filtering',
                  'Persistent shopping cart with dynamic quantity adjustments',
                  'Checkout flow with order summary and database persistence',
                  'Relational MySQL schema with foreign key constraints',
                ],
              },
              order: 3,
            },
            {
              type: 'technology-list',
              data: {
                title: 'Technologies Applied',
                technologies: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
              },
              order: 4,
            },
          ],
        },
        {
          title: 'Task Management Application',
          slug: 'task-management-application',
          shortDescription: 'A task management application with To-do, In Progress, and Completed task lifecycle statuses.',
          fullDescription:
            'A responsive productivity application facilitating task creation, status categorization (To-do, In Progress, Completed), and priority assignment.',
          category: 'Frontend',
          organization: 'Personal Project',
          role: 'Frontend / Full-stack Developer',
          duration: '2026',
          technologies: ['React.js', 'Tailwind CSS', 'JavaScript'],
          status: 'published',
          featured: true,
          displayOrder: 3,
          publishedAt: new Date(),
          contentBlocks: [
            {
              type: 'heading',
              data: { text: 'Application Concept', level: 2 },
              order: 1,
            },
            {
              type: 'paragraph',
              data: {
                text: 'A clean and focused task tracker designed to streamline daily personal and academic productivity. Features visual status columns to move tasks seamlessly through each stage of execution.',
              },
              order: 2,
            },
            {
              type: 'feature-list',
              data: {
                title: 'Task Lifecycle Features',
                items: [
                  'Create, edit, and organize tasks with titles and deadlines',
                  'Status classification across To-Do, In Progress, and Completed states',
                  'Instant search and tag-based filtering',
                  'Persistent local storage state synchronization',
                  'Clean responsive UI adhering to modern design tokens',
                ],
              },
              order: 3,
            },
          ],
        },
        {
          title: 'AI Content Transformation Engine',
          slug: 'ai-content-transformation-engine',
          shortDescription: 'Smart India Hackathon (SIH 26154) conceptual engine accepting diverse inputs to generate structured outputs.',
          fullDescription:
            'A hackathon solution concept for Smart India Hackathon problem statement 26154, designed to ingest unstructured input data and transform it into standardized structured formats.',
          category: 'AI / ML',
          organization: 'Smart India Hackathon (SIH 26154)',
          role: 'Concept Design & Full-stack Architecture',
          duration: 'Hackathon Initiative',
          technologies: ['React.js', 'Node.js', 'Express.js', 'Python', 'REST APIs'],
          status: 'draft',
          featured: false,
          displayOrder: 4,
          contentBlocks: [
            {
              type: 'heading',
              data: { text: 'Smart India Hackathon Problem Statement 26154', level: 2 },
              order: 1,
            },
            {
              type: 'paragraph',
              data: {
                text: 'Formulated to solve problem statement 26154 at Smart India Hackathon. The platform concept accepts multi-format raw input (such as unstructured text, documents, or data dumps) and processes them into standardized, consumable structures.',
              },
              order: 2,
            },
            {
              type: 'callout',
              data: {
                title: 'Implementation Status',
                text: 'This project is currently in the architectural draft and prototyping phase. Editable sections are provided for verified AI models and pipeline benchmarks as they are finalized.',
                type: 'warning',
              },
              order: 3,
            },
          ],
        },
        {
          title: 'URL Shortener',
          slug: 'url-shortener',
          shortDescription: 'A backend / full-stack URL shortening service with redirection and click analytics.',
          fullDescription:
            'A URL shortening service generating compact, unique identifiers for long URLs with high-performance redirection.',
          category: 'Backend',
          organization: 'Personal Project',
          role: 'Backend Engineering',
          duration: '2026',
          technologies: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
          status: 'draft',
          featured: false,
          displayOrder: 5,
          contentBlocks: [
            {
              type: 'heading',
              data: { text: 'Service Architecture', level: 2 },
              order: 1,
            },
            {
              type: 'paragraph',
              data: {
                text: 'A practical exploration of hash generation, unique key indexing in MongoDB, and low-latency HTTP 302 redirects.',
              },
              order: 2,
            },
          ],
        },
      ];

      await Project.insertMany(initialProjects);
    }

    // Seed Settings
    const existingSettings = await Setting.findOne();
    if (!existingSettings) {
      console.log('[Seed] Seeding initial settings...');
      await Setting.create({
        websiteTitle: 'Khushi Siddhapura | Full Stack Developer Portfolio',
        websiteDescription: 'Portfolio of Khushi Siddhapura, Full Stack Developer and IT Student at BVM Gujarat.',
        logoText: 'Khushi',
        contactEmail: 'khushi.siddhapura@example.com',
        socialLinks: {
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: '',
          instagram: '',
        },
        footerText: 'Built with passion, clean code, and modern full-stack technologies.',
      });
    }

    console.log('[Seed] Database initialization completed successfully.');
  } catch (err) {
    console.error('[Seed Error]', err.message);
  }
};

// If run directly from CLI
if (process.argv[1]?.endsWith('seedAdmin.js')) {
  (async () => {
    await connectDB();
    await seedInitialData();
    await mongoose.connection.close();
    process.exit(0);
  })();
}

