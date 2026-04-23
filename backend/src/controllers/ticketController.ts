import { Request, Response } from 'express';
import pool from '../config/db';

export const createTicket = async (req: any, res: Response) => {
  try {
    const { subject, description, priority } = req.body;
    const userId = req.user.id;

    if (!subject || !description) {
      return res.status(400).json({ message: 'Subject and description are required' });
    }

    const insertQuery = `
      INSERT INTO tickets (user_id, subject, description, priority)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await pool.query(insertQuery, [userId, subject, description, priority || 'Medium']);
    res.status(201).json({ message: 'Ticket raised successfully', ticket: result.rows[0] });
  } catch (error: any) {
    console.error('Error creating ticket:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserTickets = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const ticketsQuery = `
      SELECT 
        id, subject, description, priority, status, 
        to_char(created_at, 'YYYY-MM-DD HH24:MI') as date
      FROM tickets
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(ticketsQuery, [userId]);
    res.json(result.rows);
  } catch (error: any) {
    console.error('Error fetching user tickets:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllTickets = async (req: Request, res: Response) => {
  try {
    const ticketsQuery = `
      SELECT 
        t.id, t.subject, t.description, t.priority, t.status, 
        to_char(t.created_at, 'YYYY-MM-DD HH24:MI') as date,
        u.name as customer_name, u.email as customer_email
      FROM tickets t
      LEFT JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC;
    `;
    const result = await pool.query(ticketsQuery);
    res.json(result.rows);
  } catch (error: any) {
    console.error('Error fetching all tickets:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTicketStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;

    let updateQuery = 'UPDATE tickets SET ';
    const params = [];
    let count = 1;

    if (status) {
      updateQuery += `status = $${count++}, `;
      params.push(status);
    }
    if (priority) {
      updateQuery += `priority = $${count++}, `;
      params.push(priority);
    }

    if (params.length === 0) {
      return res.status(400).json({ message: 'No updates provided' });
    }

    // Remove last comma and space
    updateQuery = updateQuery.slice(0, -2);
    updateQuery += ` WHERE id = $${count} RETURNING *`;
    params.push(id);

    const result = await pool.query(updateQuery, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json({ message: 'Ticket updated successfully', ticket: result.rows[0] });
  } catch (error: any) {
    console.error('Error updating ticket:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
