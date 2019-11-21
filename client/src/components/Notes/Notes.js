import React, { useState, useEffect } from "react";
import { getAllNotes, updateNote, createNote, deleteNote } from "../../utils/api/apiUtils";
import "./Notes.scss";
import PreviewPanel from "../PreviewPanel/PreviewPanel";
import ListPanel from "../ListPanel/ListPanel";
import EditPanel from "../EditPanel/EditPanel";

const Notes = () => {
    const [notes, setNotes] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentContent, setCurrentContent] = useState("");
    const [currentTitle, setCurrentTitle] = useState("");

    // Get all notes on initial render;
    useEffect(() => {
        setLoading(true);
        getAllNotes().then(resp => {
            if (resp.data && resp.data[0]) {
                setNotes(resp.data);
                setCurrentContent(resp.data[0].content);
                setCurrentTitle(resp.data[0].title);
            }
            setLoading(false);
        });
    }, []);

    const selectNote = index => {
        setCurrentIndex(index);
        setCurrentContent(notes[index].content);
        setCurrentTitle(notes[index].title);
    };

    const updateNoteByID = newNote => {
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

    const updateNoteByIndex = (newNote, newNoteIndex) => {
        setNotes(
            notes.map((note, index) => {
                if (index === newNoteIndex) {
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
        updateNoteByIndex(newNote, currentIndex);
    };

    const handleContentChange = event => {
        // Update field state
        const newContent = event.target.value;
        setCurrentContent(newContent);

        // Update notes state
        const newNote = notes[currentIndex];
        newNote.content = newContent;
        updateNoteByIndex(newNote, currentIndex);
    };

    const saveNote = newNote => {
        if (newNote._id) {
            updateNote(newNote).then(resp => {
                if (resp && resp.data) {
                    const { title, content, _id } = resp.data;
                    updateNoteByID({ title, content, _id });
                }
            });
        } else {
            createNote(newNote).then(resp => {
                if (resp && resp.data) {
                    const { title, content, _id } = resp.data;
                    updateNoteByIndex({ title, content, _id }, currentIndex);
                }
            });
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        saveNote(notes[currentIndex]);
    };

    const initializeNewNote = () => {
        const newNotes = [...notes, { title: "", content: "" }];
        setCurrentIndex(notes.length);
        setCurrentTitle("");
        setCurrentContent("");
        setNotes(newNotes);
    };

    const handleDelete = index => {
        const deletedNote = notes[index];
        const newIndex = index === 0 ? 0 : index - 1;
        if (deletedNote) {
            if (deletedNote._id) {
                deleteNote(deletedNote._id).then(resp => {
                    setNotes(notes.filter(note => note._id !== deletedNote._id));
                    selectNote(newIndex);
                });
            } else {
                setNotes(notes.filter((note, indx) => indx !== index));
                selectNote(newIndex);
            }
        }
    };

    return (
        <div className="window">
            <div className="flex-row full-window">
                <div className="border-solid third-window">
                    <ListPanel
                        notes={notes}
                        isLoading={loading}
                        currentIndex={currentIndex}
                        selectNote={selectNote}
                        onDelete={handleDelete}
                        newNote={initializeNewNote}
                    />
                </div>
                <div className="border-solid third-window">
                    <EditPanel
                        onSubmit={handleSubmit}
                        title={currentTitle}
                        content={currentContent}
                        onTitleChange={handleTitleChange}
                        onContentChange={handleContentChange}
                    />
                </div>
                <div className="third-window">
                    <PreviewPanel title={currentTitle} content={currentContent} />
                </div>
            </div>
        </div>
    );
};

export default Notes;
