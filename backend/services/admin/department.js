import Admin from '../../models/admin.js';

export const getAllDepartments = async () => {
  return await Admin.Department.find().sort({ createdAt: -1 });
};

export const createDepartment = async (name) => {
  if (!name) throw new Error('Name is required');

  const exists = await Admin.Department.findOne({ name: name.trim() });
  if (exists) throw new Error('Department already exists');

  const department = new Admin.Department({ name: name.trim() });
  return await department.save();
};

export const updateDepartment = async (id, name) => {
  if (!name) throw new Error('Name is required');

  const updated = await Admin.Department.findByIdAndUpdate(id, { name: name.trim() }, { new: true });
  if (!updated) throw new Error('Department not found');

  return updated;
};
