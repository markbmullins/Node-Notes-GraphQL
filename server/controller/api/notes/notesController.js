const express = require('express');
const router = express.Router();
const noteService = require('../../../service/NoteService');

const validateId = noteService.validateId;

const handleError = (res, err) => {
    console.error('ERROR', err);
    res.status(err.status || 500);
    res.send({ message: err.message });
};

// Create
router.route('/').post(function(req, res) {
    const note = req.body;
    noteService
        .create(note)
        .then(note => {
            res.status(200).json(note);
        })
        .catch(err => {
            handleError(res, err);
        });
});

// Read all
router.route('/').get(function(req, res) {
    noteService
        .getAll()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            handleError(res, err);
        });
});

// Read one
router.route('/:id').get(function(req, res) {
    const { id } = req.params;
    noteService
        .getByID(id)
        .then(note => {
            res.status(200).json(note);
        })
        .catch(err => {
            handleError(res, err);
        });
});

// Update
router.route('/:id').put(function(req, res) {
    const note = req.body;
    noteService
        .update(note)
        .then(note => {
            res.json(note);
        })
        .catch(err => {
            handleError(res, err);
        });
});

// Delete
router.route('/:id').delete(function(req, res) {
    const { id } = req.params;
    noteService
        .deleteById(id)
        .then(note => {
            res.status(200).json(note);
        })
        .catch(err => {
            handleError(res, err);
        });
});

module.exports = router;
