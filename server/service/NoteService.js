const noteRepository = require('../repository/noteRepository');

const create = note => {
    return noteRepository.create(note);
};

const getAll = () => {
    return noteRepository.getAll();
};

const getByID = id => {
    return noteRepository.getByID(id);
};

const update = note => {
    return noteRepository.update(note);
};

const deleteById = id => {
    return noteRepository.deleteById(id);
};

const validateId = id => {
    return noteRepository.validateId(id);
};

module.exports = {
    getAll,
    update,
    getByID,
    deleteById,
    create,
    validateId
};
