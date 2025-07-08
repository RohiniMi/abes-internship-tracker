import * as sessionService from '../../services/admin/session.js';
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await sessionService.getAllSessions();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSession = async (req, res) => {
  try {
    const session = await sessionService.createSession(req.body.name);
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateSession = async (req, res) => {
  try {
    const updated = await sessionService.updateSession(req.params.id, req.body.name);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const result = await sessionService.deleteSession(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
