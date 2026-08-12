import express from 'express';
import { db } from '../db/database.js';
import { generateToken, authenticateToken } from '../auth/authMiddleware.js';

const router = express.Router();

// 1. User Registration API
router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
  }

  const existing = db.findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ success: false, error: 'User with this email already exists' });
  }

  const user = await db.createUser({ name, email, password, phone });
  const token = generateToken(user);

  res.status(201).json({
    success: true,
    token,
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role }
  });
});

// 2. User Login API
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required' });
  }

  const user = db.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false, error: 'Invalid email or password' });
  }

  const isValid = await db.verifyPassword(user, password);
  if (!isValid) {
    return res.status(401).json({ success: false, error: 'Invalid email or password' });
  }

  const token = generateToken(user);
  res.json({
    success: true,
    token,
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role }
  });
});

// 3. User Profile API (Protected)
router.get('/me', authenticateToken, (req, res) => {
  const user = db.findUserById(req.user.id);
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });
  
  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      emergencyContacts: user.emergencyContacts
    }
  });
});

// 4. Add Emergency Contact API (Protected)
router.post('/contacts', authenticateToken, (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) return res.status(400).json({ success: false, error: 'Name and phone required' });

  const updatedUser = db.addEmergencyContact(req.user.id, { name, phone });
  res.status(201).json({ success: true, data: updatedUser.emergencyContacts });
});

export default router;
