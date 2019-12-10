const noteService = require("../../service/noteService");

const getNotes = () => noteService.getAll();

const getNote = ({ id }) => noteService.getByID(id);

const createNote = async params => await noteService.create(params);

const updateNote = async params => await noteService.update(params);

const deleteNote = async ({ id }) => await noteService.deleteById(id);

module.exports = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
};
