import Admin from '../../models/admin.js';

export const getAllSessions = async () => {
  return await Admin.Session.find().sort({ createdAt: -1 });
};

export const createSession = async (name) => {
  if (!name) throw new Error('Name is required');

  const exists = await Admin.Session.findOne({ name: name.trim() });
  if (exists) throw new Error('Session already exists');

  const session = new Admin.Session({ name: name.trim() });
  return await session.save();
};

export const updateSession = async (id, name) => {
  if (!name) throw new Error('Name is required');

  const updated = await Admin.Session.findByIdAndUpdate(id, { name: name.trim() }, { new: true });
  if (!updated) throw new Error('Session not found');

  return updated;
};

export const deleteSession = async (id) => {
  const deleted = await Admin.Session.findByIdAndDelete(id);
  if (!deleted) throw new Error('Session not found');
  return { message: 'Session deleted successfully' };
};
