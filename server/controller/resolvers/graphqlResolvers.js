const noteService = require("../../service/noteService");

const getNotes = () => {
    return noteService.getAll();
};

const getNote = ({ id }) => {
    return noteService.getByID(id);
};

const createNote = async params => {
    const note = await noteService.create(params);
    return note;
};

const updateNote = async params => {
    const note = await noteService.update(params);
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
