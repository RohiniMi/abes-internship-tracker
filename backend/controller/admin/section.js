import * as sectionService from '../../services/admin/section.js';
export const getAllSections = async (req, res) => {
  try {
    const sections = await sectionService.getAllSections();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSection = async (req, res) => {
  try {
    const section = await sectionService.createSection(req.body.name);
    res.status(201).json(section);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateSection = async (req, res) => {
  try {
    const updated = await sectionService.updateSection(req.params.id, req.body.name);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const result = await sectionService.deleteSection(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
