import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import { connectDB } from '../config/db.js';

const updateProfileData = async () => {
  try {
    await connectDB();
    console.log('[Update] Connected to MongoDB.');

    await Profile.updateOne(
      {},
      {
        $set: {
          name: 'Khushi S Siddhapura',
          title: 'Full Stack Developer',
          smallIntro: "Hello, I'm",
          email: 'khushisiddhapura2010@gmail.com',
          phone: '+91 8200886093',
          location: 'Anand, Gujarat',
          heroIntroduction:
            'I am a Full Stack Developer and 2nd year B.Tech IT student at BVM. I build scalable, secure web applications across the MERN stack and relational databases, with practical experience in modern UI design and backend engineering.',
          aboutIntroduction:
            '2nd year B.Tech Information Technology student at Birla Vishvakarma Mahavidyalaya with an excellent academic record (CGPA 8.52/10) and keen interest in full-stack web engineering, web applications security, and practical digital experiences.',
          developerJourney:
            'My journey into software development started with a fascination for building functional, responsive digital applications. At BVM Engineering College, I deepened my foundation in computer science, database systems, and web architecture. From building the NCC management portal to developing responsive client solutions like Rangila Resto and participating in hackathons, I focus on writing clean, scalable, and maintainable code.',
          'profileImage.url': '/khushi.jpg',
          education: [
            {
              degree: 'B.Tech in Information Technology',
              institution: 'Birla Vishvakarma Mahavidyalaya (BVM), Gujarat',
              duration: '2025 – 2029',
              description: 'CGPA: 8.52 / 10 • Core focus on Data Structures, Database Systems, Web Engineering, and Network Security.',
            },
            {
              degree: '12th (Senior Secondary Examination)',
              institution: 'GSEB Board, Gujarat',
              duration: '2025',
              description: 'Score: 84% • Focused on Mathematics, Physics, and Computer Science.',
            },
            {
              degree: '10th (Secondary Examination)',
              institution: 'GSEB Board, Gujarat',
              duration: '2023',
              description: 'Score: 92% • Foundation in Science and Mathematics.',
            },
          ],
          socialLinks: {
            github: 'https://github.com/KhushiSiddhapura',
            linkedin: 'https://www.linkedin.com/in/khushi-siddhapura-7247a0397',
          },
        },
      },
      { upsert: true }
    );
    console.log('[Update] Profile updated with Khushi reference data.');

    // Upsert Rangila Resto project
    await Project.updateOne(
      { slug: 'rangila-resto' },
      {
        $set: {
          title: 'Rangila Resto (Restaurant Web Application)',
          slug: 'rangila-resto',
          shortDescription: 'A modern, responsive restaurant web application with interactive navigation, menu showcases, and online ordering flow.',
          fullDescription:
            'Rangila Resto is an academic and production-ready restaurant website built with HTML, CSS, and modern JavaScript. It features clean responsive layouts, structured dish menus, interactive customer engagement components, and continuous deployment on Vercel.',
          category: 'Frontend',
          role: 'Frontend Development & Deployment',
          duration: 'Dec 2025',
          technologies: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
          links: {
            github: 'https://github.com/KhushiSiddhapura/rangila-resto',
            live: 'https://rangila-resto-beta.vercel.app/',
          },
          status: 'published',
          featured: true,
          displayOrder: 2,
          publishedAt: new Date(),
        },
      },
      { upsert: true }
    );
    console.log('[Update] Rangila Resto project seeded/updated.');

    process.exit(0);
  } catch (err) {
    console.error('[Update] Error:', err);
    process.exit(1);
  }
};

updateProfileData();
