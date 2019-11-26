import React from 'react';

const Card = ({ note, onSelectNote, onDelete, selectedNote }) => {
    const { id, title, content } = note;
    return (
        <div
            key={id}
            onClick={() => onSelectNote(note)}
            className={id === selectedNote.id ? 'card-selected' : 'card'}>
            <div className="card-body">
                <div>{title}</div>
                <div>{content.substring(0, 20) + '...'}</div>
            </div>
            <div className="delete-button" onClick={() => onDelete(id)}>
                &#10006;
            </div>
        </div>
    );
};

const ListPanel = props => {
    const { data, isLoading, error, onNewNote } = props;
    let notes;
    if (data) notes = data.getNotes;
    if (isLoading) return <div>Loading.....</div>;
    if (error || !notes || !notes[0]) return <div>An error occured.</div>;

    return (
        <div className="margin-small">
            <div className="flex-row">
                <div className="title underlined">Notes:</div>
            </div>
            <div>
                {notes.map(note => {
                    return <Card note={note} {...props} />;
                })}
                <div className="card" onClick={() => onNewNote()}>
                    + Add new note
                </div>
            </div>
        </div>
    );
};

export default ListPanel;
