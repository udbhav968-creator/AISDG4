import express from 'express';
import cors from 'cors';
import apiRouter from '../server/routes/api.js';

const app = express();

app.use(cors());
app.use(express.json());

// Support both /api/v1 and /v1 routes on Vercel
app.use('/api/v1', apiRouter);
app.use('/v1', apiRouter);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    platform: 'Vercel Serverless Functions',
    service: 'SurakshaOne Full-Stack API',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    platform: 'Vercel Serverless Functions',
    service: 'SurakshaOne Full-Stack API',
    timestamp: new Date().toISOString()
  });
});

export default app;
