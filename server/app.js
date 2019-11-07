const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const noteRoutes = express.Router();
const Note = require('./schema/notes.model.js');
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/notes', noteRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/notes', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
});

// Create
noteRoutes.route('/').post(function(req, res) {
    let note = new Note(req.body);
    note.save()
        .then(note => {
            console.log(`Created note with id: ${note.id}`);
            res.status(200).json(note);
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error: Adding new note failed');
        });
});

// Read all
noteRoutes.route('/').get(function(req, res) {
    Note.find({}, function(err, notes) {
        if (err) {
            console.error(err);
            res.status(400).send('Error: Retrieving notes failed');
        } else {
            console.log(notes); 
            console.log("Returning notes with ids: \n", notes.map(note => note.id));
            res.json(notes);
        }
    });
});

// Read one
noteRoutes.route('/:id').get(function(req, res) {
    const { id } = req.params;
    Note.findById(id, function(err, note) {
        if (err) {
            console.error(err);
            res.status(400).send(`Error: Retrieving note ${id} failed`);
        } else {
            console.log(`Returning note with id: ${note.id}`);
            res.json(note);
        }
    });
});

// Update
noteRoutes.route('/:id').put(function(req, res) {
    const { id } = req.params;
    Note.findById(id, function(err, note) {
        const { title, content } = req.body;
        if (!note) {
            console.error(err);
            res.status(404).send(`Error: Note ${id} cannot be found`);
        } else {
            note.title = title;
            note.content = content;
            console.log(`Saving note with id: ${note.id}...`);
            note.save()
                .then(note => {
                    console.log(`Saved note with id: ${note.id}.`);
                    res.json(note);
                })
                .catch(err => {
                    res.status(400).send(
                        `Error: Update of note ${req.params.id} failed`
                    );
                });
        }
    });
});

// Delete
noteRoutes.route('/:id').delete(function(req, res) {
    const { id } = req.params;
    console.log(`Deleting note with id: ${note.id}...`);
    Note.findByIdAndDelete(id, function(err, note) {
        if (!note) {
            res.status(400).send(`Error: Deleting note ${id} failed`);
        } else {
            console.log(`Deleted note with id: ${note.id}.`);
            res.status(200).json(note);
        }
    });
});

app.listen(PORT, function() {
    console.log('Server is running on Port: ' + PORT);
});
