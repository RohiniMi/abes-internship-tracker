import express from 'express';
import StudentLogin from '../../models/studentLogin.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const search = req.query.search;
    const regex = new RegExp(search, 'i');

    const users = await StudentLogin.find({
      $or: [{ name: regex }, { email: regex }]
    }).select('_id name email');

    res.json(users);
  } catch (err) {
    console.error('Error in search:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
