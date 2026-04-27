import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import adminRoutes from './routes/admin';
import ticketRoutes from './routes/tickets';
import bookingRoutes from './routes/bookings';
import tourRoutes from './routes/tours';
import packageRoutes from './routes/packages';
import planRoutes from './routes/plans';
import path from 'path';

import pool from './config/db';

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('DB Connected:', res.rows[0]);
  } catch (err) {
    console.error('DB Connection Error:', err);
  }
})();
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
app.use('/api/tours', tourRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/plans', planRoutes);

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
