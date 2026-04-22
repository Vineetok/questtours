import { Request, Response } from 'express';
import pool from '../config/db';
import path from 'path';
import fs from 'fs';

export const uploadAvatar = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const userId = (req as any).user?.id;
  if (!userId) {
    // If auth middleware is not yet implemented or user ID not found
    // We should ideally have a user ID from the token
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const avatarUrl = `/uploads/${req.file.filename}`;

  try {
    // Update user avatar in DB
    await pool.query('UPDATE users SET avatar = $1, updated_at = NOW() WHERE id = $2', [avatarUrl, userId]);

    res.json({
      message: 'Avatar uploaded successfully',
      avatarUrl
    });
  } catch (error: any) {
    console.error('Error updating avatar:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  
  try {
    const result = await pool.query('SELECT id, name, email, role, avatar FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    // Check if email is already taken by another user
    const emailCheck = await pool.query('SELECT id FROM users WHERE email = $1 AND id != $2', [email, userId]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, updated_at = NOW() WHERE id = $3 RETURNING id, name, email, role, avatar',
      [name, email, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: result.rows[0]
    });
  } catch (error: any) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
