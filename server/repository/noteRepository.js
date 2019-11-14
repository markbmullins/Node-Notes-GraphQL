const Note = require('../schema/notes.model');
const mongoose = require('mongoose');

const create = note => {
    let noteObj = new Note(note);
    return noteObj.save();
};

const getAll = () => {
    return Note.find({}).exec();
};

const getByID = id => {
    return Note.findById(id).exec();
};

const update = note => {
    const { title, content } = note;
    return Note.findById(note._id)
        .exec()
        .then(note => {
            note.title = title;
            note.content = content;
            return note.save();
        });
};

const deleteById = id => {
    return Note.findByIdAndDelete(id).exec();
};

const validateId = id => {
    return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
    getAll,
    update,
    getByID,
    deleteById,
    validateId,
    create
};
