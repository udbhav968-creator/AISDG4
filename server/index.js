import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import apiRouter from './routes/api.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Attach io instance to app
app.set('io', io);

// Mount API routes
app.use('/api/v1', apiRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'SurakshaOne Full-Stack Backend', timestamp: new Date().toISOString() });
});

// Socket.io Real-Time Connection Handler
io.on('connection', (socket) => {
  console.log(`⚡ [Socket.io] Client connected: ${socket.id}`);

  // Broadcast simulated live GPS telemetry stream
  const interval = setInterval(() => {
    socket.emit('telemetry_update', {
      vehicleId: 'bus-512',
      speed: `${Math.floor(30 + Math.random() * 15)} km/h`,
      gps: [28.6105 + (Math.random() * 0.002), 77.2185 + (Math.random() * 0.002)],
      timestamp: new Date().toISOString()
    });
  }, 4000);

  socket.on('disconnect', () => {
    console.log(`🔌 [Socket.io] Client disconnected: ${socket.id}`);
    clearInterval(interval);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 [SurakshaOne Server] Full-Stack Backend listening on port ${PORT}`);
});
