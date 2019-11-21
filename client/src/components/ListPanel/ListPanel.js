import React from "react";

const ListPanel = ({ notes, isLoading, currentIndex, selectNote, onDelete, newNote }) => {
    return (
        <div className="notes-panel">
            <div className="flex-row">
                <div className="title underlined">Notes:</div>
            </div>

            {isLoading ? (
                <div>Loading.....</div>
            ) : (
                <div>
                    {notes &&
                        notes[0] &&
                        notes.map((note, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => selectNote(index)}
                                    className={index === currentIndex ? "card-selected" : "card"}>
                                    <div className="card-body">
                                        <div>{note.title}</div>
                                        <div>{note.content.substring(0, 20) + "..."}</div>
                                    </div>
                                    <div className="delete-button" onClick={() => onDelete(index)}>
                                        &#10006;
                                    </div>
                                </div>
                            );
                        })}
                    <div className="card" onClick={() => newNote()}>
                        {" "}
                        <br /> + Add new note
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListPanel;
