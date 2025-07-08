import * as departmentService from "../../services/admin/department.js";


export const getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentService.getAllDepartments();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const department = await departmentService.createDepartment(req.body.name);
    res.status(201).json(department);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const updated = await departmentService.updateDepartment(req.params.id, req.body.name);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const result = await departmentService.deleteDepartment(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

