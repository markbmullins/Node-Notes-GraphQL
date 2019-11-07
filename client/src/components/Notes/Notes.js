import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllNotes, updateNote } from '../../utils/api/apiUtils';
import './Notes.scss';
const ReactMarkdown = require('react-markdown');

const Notes = () => {
    const [notes, setNotes] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [currentNote, setCurrentNote] = useState(0);
    const [currentContent, setCurrentContent] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');

    // Get all notes on initial render;
    useEffect(() => {
        setLoading(true);
        getAllNotes().then(resp => {
            setNotes(resp.data);
            setLoading(false);
        });
    }, []);

    const selectNote = index => {
        setCurrentNote(index);
        setCurrentContent(notes[index].content);
        setCurrentTitle(notes[index].title);
    };

    const updateNotes = newNote => {
        setNotes(
            notes.map(note => {
                if (note._id === newNote._id) {
                    return newNote;
                } else {
                    return note;
                }
            })
        );
    };

    const handleTitleChange = event => {
        // Update field state
        const newTitle = event.target.value;
        setCurrentTitle(newTitle);

        // Update notes state
        const newNote = notes[currentNote];
        newNote.title = newTitle;
        updateNotes(newNote);
    };

    const handleContentChange = event => {
        // Update field state
        const newContent = event.target.value;
        setCurrentContent(newContent);

        // Update notes state
        const newNote = notes[currentNote];
        newNote.content = newContent;
        updateNotes(newNote);
    };

    const saveNote = newNote => {
        updateNote(newNote).then(resp => {
            updateNotes(newNote);
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        saveNote(notes[currentNote]);
    };

    return (
        <div className="window">
            <div className="flex-row full-window">
                <div className="border-solid third-window">
                    <div>All Notes:</div>
                    <div>Notes:</div>
                    {loading ? (
                        <div>Loading.....</div>
                    ) : (
                        <div>
                            {notes &&
                                notes[0] &&
                                notes.map((note, index) => {
                                    return (
                                        <div onClick={() => selectNote(index)}>
                                            <div>{note.title}</div>
                                            <div>
                                                {note.content.substring(0, 15) +
                                                    '...'}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
                <div className="border-solid third-window">
                    {/* Individual note */}
                    <form onSubmit={handleSubmit} id="notes-form">
                        <div>
                            <label>
                                <div>Name: </div>
                                <input
                                    type="text"
                                    value={currentTitle}
                                    onChange={handleTitleChange}
                                    className="title-input"
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                <div>Content: </div>
                                <textarea
                                    spellCheck="false"
                                    onChange={handleContentChange}
                                    value={currentContent}
                                    className="content-input">
                                    ...
                                </textarea>
                            </label>
                        </div>
                        <div>
                            <input type="submit" value="Save Note" />
                            <button>New Note</button>
                        </div>
                    </form>
                </div>
                <div third-window>
                    <ReactMarkdown source={currentContent} />
                </div>
            </div>
        </div>
    );
};

export default Notes;
