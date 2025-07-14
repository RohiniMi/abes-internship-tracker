// import express from 'express';
// import dotenv from 'dotenv';
// import Message from '../../models/Messenger/Message.js';
// import { Configuration, OpenAIApi } from 'openai';

// dotenv.config(); // ✅ Load .env

// const router = express.Router();

// // === OpenAI Setup ===
// const configuration = new Configuration({
//   apiKey: process.env.MESSAGE_API, // ✅ make sure this is defined in .env
// });
// const openai = new OpenAIApi(configuration);

// const AI_USER_ID = 'vk805365@gmail.com'; // AI user2

// // === Get messages between user1 (client) and user2 (AI)
// router.get('/:user1/:user2', async (req, res) => {
//   const { user1, user2 } = req.params;
//   const messages = await Message.find({
//     $or: [
//       { senderId: user1, receiverId: user2 },
//       { senderId: user2, receiverId: user1 },
//     ],
//   }).sort({ timestamp: 1 });
//   res.json(messages);
// });

// // === Handle client message and AI response ===
// router.post('/', async (req, res) => {
//   const { senderId, content } = req.body;

//   // Validate input
//   if (!senderId || !content) {
//     return res.status(400).json({ error: 'Missing senderId or content' });
//   }

//   const receiverId = AI_USER_ID; // Force AI as receiver (user2)

//   // Save user's message
//   const userMessage = new Message({ senderId, receiverId, content });
//   await userMessage.save();

//   let aiResponseText = '';

//   try {
//     const aiRes = await openai.createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'You are a helpful assistant.' },
//         { role: 'user', content },
//       ],
//     });

//     aiResponseText = aiRes.data.choices[0].message.content;
//   } catch (err) {
//     console.error('OpenAI error:', err.response?.data || err.message);
//     aiResponseText = "Sorry, I'm unable to respond right now.";
//   }

//   // Save AI's reply
//   const aiMessage = new Message({
//     senderId: receiverId,      // AI
//     receiverId: senderId,      // back to client
//     content: aiResponseText,
//   });
//   await aiMessage.save();

//   res.json({ success: true });
// });

// export default router;
import express from 'express';
import Message from "../../models/Messenger/Message.js";
const router = express.Router();

router.get('/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;
  const messages = await Message.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 },
    ],
  }).sort({ timestamp: 1 });
  res.json(messages);
});

router.post('/', async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  const message = new Message({ senderId, receiverId, content });
  await message.save();
  res.json(message);
});
export default router;
