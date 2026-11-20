import Message from '../models/Message.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Submit a new contact message (Public)
// @route   POST /api/messages
// @access  Public
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required fields',
    });
  }

  const newMessage = await Message.create({
    name,
    email,
    subject: subject || 'General Inquiry',
    message,
  });

  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out! Your message has been sent successfully.',
    data: {
      id: newMessage._id,
      name: newMessage.name,
      createdAt: newMessage.createdAt,
    },
  });
});

// @desc    Get all messages for admin
// @route   GET /api/admin/messages
// @access  Private/Admin
export const getMessages = asyncHandler(async (req, res) => {
  const { isRead, search, page = 1, limit = 20 } = req.query;
  const query = {};

  if (isRead !== undefined && isRead !== 'all') {
    query.isRead = isRead === 'true';
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } },
      { message: { $regex: search, $options: 'i' } },
    ];
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const total = await Message.countDocuments(query);
  const unreadCount = await Message.countDocuments({ isRead: false });

  const messages = await Message.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  res.status(200).json({
    success: true,
    count: messages.length,
    total,
    unreadCount,
    pages: Math.ceil(total / limitNum) || 1,
    currentPage: pageNum,
    data: messages,
  });
});

// @desc    Mark message as read / unread
// @route   PATCH /api/admin/messages/:id/read
// @access  Private/Admin
export const markMessageAsRead = asyncHandler(async (req, res) => {
  const { isRead = true } = req.body;

  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { isRead },
    { new: true }
  );

  if (!message) {
    return res.status(404).json({ success: false, message: 'Message not found' });
  }

  const unreadCount = await Message.countDocuments({ isRead: false });

  res.status(200).json({
    success: true,
    message: `Message marked as ${isRead ? 'read' : 'unread'}`,
    data: message,
    unreadCount,
  });
});

// @desc    Delete message
// @route   DELETE /api/admin/messages/:id
// @access  Private/Admin
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    return res.status(404).json({ success: false, message: 'Message not found' });
  }

  await message.deleteOne();

  const unreadCount = await Message.countDocuments({ isRead: false });

  res.status(200).json({
    success: true,
    message: 'Message deleted successfully',
    unreadCount,
  });
});
