import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import adminRoutes from './routes/admin';
import ticketRoutes from './routes/tickets';
import bookingRoutes from './routes/bookings';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('QuestTours API is running');
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: express.NextFunction) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
