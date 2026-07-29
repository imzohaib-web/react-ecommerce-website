import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import http from 'node:http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { requireUser } from './middleware/requireUser.js';
import { notificationRouter } from './routes/notificationRoutes.js';
import { configureNotificationSocket } from './services/notificationService.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' } });

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/notifications', requireUser, notificationRouter);
app.use((error, _req, res, next) => {
  void next;
  console.error(error);
  res.status(500).json({ message: 'An unexpected server error occurred.' });
});

io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  if (!userId) return next(new Error('Authentication is required.'));
  socket.userId = userId;
  return next();
});
io.on('connection', (socket) => socket.join(`user:${socket.userId}`));
configureNotificationSocket(io);

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => server.listen(port, () => console.log(`Notification API listening on ${port}`)))
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
