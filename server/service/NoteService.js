const noteRepository = require('../repository/noteRepository');

const create = (...args) => {
    if (!args || args.length === 0)  {
        return null;
    }
    if (args.length === 1) {
        return noteRepository.create(args[0]);
    } 
    if (args.length === 2) {
        return noteRepository.create({ title: args[0], content: args[1] });
    }
        
};

const getAll = () => {
    return noteRepository.getAll();
};

const getByID = id => {
    return noteRepository.getByID(id);
};

const update = (...args) => {
    if (!args || args.length === 0) return null;
    if (args.length === 1) return noteRepository.update(args[0]);
    if (args.length === 3)
        return noteRepository.update({
            _id: args[0],
            title: args[1],
            content: args[2]
        });
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
