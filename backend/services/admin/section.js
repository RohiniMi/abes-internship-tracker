import Admin from '../../models/admin.js';

export const getAllSections = async () => {
  return await Admin.Section.find().sort({ createdAt: -1 });
};

export const createSection = async (name) => {
  if (!name) throw new Error('Name is required');

  const exists = await Admin.Section.findOne({ name: name.trim() });
  if (exists) throw new Error('Section already exists');

  const section = new Admin.Section({ name: name.trim() });
  return await section.save();
};

export const updateSection = async (id, name) => {
  if (!name) throw new Error('Name is required');

  const updated = await Admin.Section.findByIdAndUpdate(id, { name: name.trim() }, { new: true });
  if (!updated) throw new Error('Section not found');

  return updated;
};

export const deleteSection = async (id) => {
  const deleted = await Admin.Section.findByIdAndDelete(id);
  if (!deleted) throw new Error('Section not found');
  return { message: 'Section deleted successfully' };
};
