const noteService = require("../../service/noteService");

const getNotes = () => {
  return noteService.getAll();
};

const getNote = ({ id }) => {
  return noteService.getByID(id);
};

const createNote = async ({ title, content }) => {
  const note = await noteService.create(title, content);
  return note;
};

const updateNote = async ({ id, title, content }) => {
  const note = await noteService.update(id, title, content);
  return note;
};

const deleteNote = async ({ id }) => {
  const note = await noteService.deleteById(id);
  return note ? note.id : null;
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
};
