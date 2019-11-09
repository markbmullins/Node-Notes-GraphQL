import React, { useState, useEffect } from 'react';
import {
    getAllNotes,
    updateNote,
    createNote,
    deleteNote
} from '../../utils/api/apiUtils';
import './Notes.scss';
const ReactMarkdown = require('react-markdown');

const Notes = () => {
    const [notes, setNotes] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentContent, setCurrentContent] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');

    // Get all notes on initial render;
    useEffect(() => {
        setLoading(true);
        getAllNotes().then(resp => {
            setNotes(resp.data);
            if (resp.data && resp.data[0]) {
                const firstNote = resp.data[0];
                setCurrentContent(firstNote.content);
                setCurrentTitle(firstNote.title);
            }
            setLoading(false);
        });
    }, []);

    const selectNote = index => {
        setCurrentIndex(index);
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
        const newNote = notes[currentIndex];
        newNote.title = newTitle;
        updateNotes(newNote);
    };

    const handleContentChange = event => {
        // Update field state
        const newContent = event.target.value;
        setCurrentContent(newContent);

        // Update notes state
        const newNote = notes[currentIndex];
        newNote.content = newContent;
        updateNotes(newNote);
    };

    const saveNote = newNote => {
        if (newNote._id) {
            updateNote(newNote).then(resp => {
                updateNotes(newNote);
            });
        } else {
            createNote(newNote).then(resp => {
                updateNotes(resp.data);
            });
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        saveNote(notes[currentIndex]);
    };

    const initializeNewNote = () => {
        const newNotes = [...notes, { title: '', content: '' }];
        setCurrentIndex(newNotes.length - 1);
        setCurrentTitle('');
        setCurrentContent('');
        setNotes(newNotes);
    };

    const handleDelete = index => {
        const deletedNote = notes[index];
        const newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
        if (deletedNote) {
            deleteNote(deletedNote._id).then(resp => {
                setNotes(notes.filter(note => note._id !== deletedNote._id));
                setCurrentIndex(newIndex);
            });
        }
    };

    return (
        <div className="window">
            <div className="flex-row full-window">
                <div className="border-solid third-window">
                    <div className="notes-panel">
                        <div className="flex-row">
                            <div className="title underlined">Notes:</div>
                            {/* <div className="layout-switcher">Layout</div> */}
                        </div>

                        {loading ? (
                            <div>Loading.....</div>
                        ) : (
                            <div>
                                {notes &&
                                    notes[0] &&
                                    notes.map((note, index) => {
                                        return (
                                            <div
                                                key={index}
                                                onClick={() =>
                                                    selectNote(index)
                                                }
                                                className={
                                                    index === currentIndex
                                                        ? 'card-selected'
                                                        : 'card'
                                                }>
                                                <div className="card-body">
                                                    <div>{note.title}</div>
                                                    <div>
                                                        {note.content.substring(
                                                            0,
                                                            20
                                                        ) + '...'}
                                                    </div>
                                                </div>
                                                <div
                                                    className="delete-button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            currentIndex
                                                        )
                                                    }>
                                                    &#10006;
                                                </div>
                                            </div>
                                        );
                                    })}
                                <div
                                    className="card"
                                    onClick={() => initializeNewNote()}>
                                    {' '}
                                    <br /> + Add new note
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="border-solid third-window">
                    <div className="current-note-panel">
                        <form onSubmit={handleSubmit} id="notes-form">
                            <div>
                                <label>
                                    <div className="title underlined">
                                        Name:{' '}
                                    </div>
                                    <input
                                        type="text"
                                        value={currentTitle}
                                        onChange={handleTitleChange}
                                        className="title-input"
                                    />
                                </label>
                            </div>
                            <div className="content-input-section">
                                <label>
                                    <div className="title underlined">
                                        Content:{' '}
                                    </div>
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
                            </div>
                        </form>
                    </div>
                </div>
                <div className="third-window">
                    <div className="rendered-markdown">
                        <div className="title underlined">{currentTitle}</div>
                        <ReactMarkdown source={currentContent} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notes;
