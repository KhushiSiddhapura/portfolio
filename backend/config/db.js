import mongoose from 'mongoose';

let memoryServer = null;

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/khushi_portfolio';
    
    // Attempt connecting to the configured MongoDB URI
    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 2000,
      });
      console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (primaryErr) {
      console.warn(`[Database] Standard MongoDB connection failed (${primaryErr.message}). Checking MongoMemoryServer fallback...`);
      
      // Fallback to in-memory MongoDB for local development if standard MongoDB isn't running
      try {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        memoryServer = await MongoMemoryServer.create();
        const memUri = memoryServer.getUri();
        const conn = await mongoose.connect(memUri);
        console.log(`[Database] Connected to Embedded MongoMemoryServer at ${memUri}`);
        return conn;
      } catch (memErr) {
        console.error('[Database] MongoMemoryServer fallback also failed:', memErr.message);
        throw primaryErr;
      }
    }
  } catch (error) {
    console.error(`[Database Error] ${error.message}`);
    process.exit(1);
  }
};

export const closeDB = async () => {
  await mongoose.connection.close();
  if (memoryServer) {
    await memoryServer.stop();
  }
};
