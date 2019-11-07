import React, { useState, useEffect } from "react";
import { getAllNotes, updateNote } from "../../utils/api/apiUtils";

const Notes = () => {
  const [notes, setNotes] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [currentNote, setCurrentNote] = useState(0);

  useEffect(() => {
    setLoading(true);
    getAllNotes().then(resp => {
      setNotes(resp.data);
      setLoading(false);
    });
  }, []);

  const selectNote = note => {
    setCurrentNote(note);
  };

  const handleSubmit = event => {
    event.preventDefault();
    saveNote(notes[currentNote]);
  };

  const handleTitleChange = event => {
    const newTitle = event.target.value;
    const editingNote = notes[currentNote];
    editingNote.title = newTitle;
    setNotes(
      notes.map(note => {
        if (note._id === editingNote._id) {
          return editingNote;
        } else {
          return note;
        }
      })
    );
  };

  const handleContentChange = event => {
    const newContent = event.target.value;
    const editingNote = notes[currentNote];
    editingNote.content = newContent;
    setNotes(
      notes.map(note => {
        if (note._id === editingNote._id) {
          return editingNote;
        } else {
          return note;
        }
      })
    );
  };

  const saveNote = newNote => {
    updateNote(newNote).then(resp => {
      const newNotes = notes.map(note => {
        if (note._id === newNote._id) {
          return newNote;
        } else {
          return note;
        }
      });
      setNotes(newNotes);
    });
  };

  console.log(notes);
  if(notes[0]) console.log(notes[0]._id);
  return (
    <div className="window">
      <div className="notes-list-panel">
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
                    <div>{note.content.substring(0, 15) + "..."}</div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className="edit-note">
        {/* Individual note */}
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={notes[currentNote].title}
              onChange={handleTitleChange}
            />
          </label>
          <label>
            Content:
            <input
              type="text"
              value={notes[currentNote].content}
              onChange={handleContentChange}
            />
          </label>
          <input type="submit" value="Save Note" />
        </form>
      </div>
    </div>
  );
};

export default Notes;
