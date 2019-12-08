const noteRepository = require("../repository/noteRepository");

const create = params => {
    if (!params) return null;
    return noteRepository.create(params);
};

const getAll = () => {
    return noteRepository.getAll();
};

const getByID = id => {
    return noteRepository.getByID(id);
};

const update = params => {
    if (!params || !params.id) return null;
    return noteRepository.update(params);
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
