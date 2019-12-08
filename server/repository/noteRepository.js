const Note = require("../schema/notes.model");
const mongoose = require("mongoose");

const create = note => {
    const noteObj = new Note(note);
    return noteObj.save();
};

const getAll = () => Note.find({}).exec();

const getByID = id => Note.findById(id).exec();

const update = newValues => {
    return Note.findById(newValues.id)
        .exec()
        .then(note => {
            delete newValues.id;
            return Object.assign(note, newValues).save();
        });
};

const deleteById = id => Note.findByIdAndDelete(id).exec();

const validateId = id => mongoose.Types.ObjectId.isValid(id);

module.exports = {
    getAll,
    update,
    getByID,
    deleteById,
    validateId,
    create
};
