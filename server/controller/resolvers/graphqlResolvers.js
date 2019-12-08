const noteService = require("../../service/noteService");

const getNotes = () => {
    return noteService.getAll();
};

const getNote = ({ id }) => {
    return noteService.getByID(id);
};

const createNote = async params => {
    return await noteService.create(params);
};

const updateNote = async params => {
    return await noteService.update(params);
};

const deleteNote = async ({ id }) => {
    return await noteService.deleteById(id);
};

module.exports = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
};
