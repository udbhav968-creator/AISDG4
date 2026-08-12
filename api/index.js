import express from 'express';
import cors from 'cors';
import apiRouter from '../server/routes/api.js';

const app = express();

app.use(cors());
app.use(express.json());

// Mount API routes under /api/v1
app.use('/api/v1', apiRouter);

// Root health check endpoint for Vercel
app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    platform: 'Vercel Serverless Functions',
    service: 'SurakshaOne Full-Stack API',
    timestamp: new Date().toISOString()
  });
});

export default app;
