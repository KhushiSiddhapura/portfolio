import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';
import { seedInitialData } from './scripts/seedAdmin.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect database
  await connectDB();

  // Auto-seed initial data if database is empty
  await seedInitialData();

  const server = app.listen(PORT, () => {
    console.log(`[Server] Khushi Portfolio API running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
    // server.close(() => process.exit(1));
  });
};

startServer();
