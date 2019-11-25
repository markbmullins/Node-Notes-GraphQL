import React from 'react';

const ListPanel = ({
    notes,
    selectedNote,
    isLoading,
    error,
    onSelectNote,
    onDelete,
    onNewNote
}) => {
    return (
        <div className="margin-small">
            <div className="flex-row">
                <div className="title underlined">Notes:</div>
            </div>

            {isLoading ? (
                <div>Loading.....</div>
            ) : (
                <div>
                    {notes &&
                        notes[0] &&
                        notes.map(note => {
                            const { id, title, content } = note;
                            return (
                                <div
                                    key={id}
                                    onClick={() => onSelectNote(note)}
                                    className={
                                        id === selectedNote.id
                                            ? 'card-selected'
                                            : 'card'
                                    }>
                                    <div className="card-body">
                                        <div>{title}</div>
                                        <div>
                                            {content.substring(0, 20) + '...'}
                                        </div>
                                    </div>
                                    <div
                                        className="delete-button"
                                        onClick={() => onDelete(id)}>
                                        &#10006;
                                    </div>
                                </div>
                            );
                        })}
                    <div className="card" onClick={() => onNewNote()}>
                        + Add new note
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListPanel;
