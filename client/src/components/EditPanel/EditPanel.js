import React from "react";

const EditPanel = ({ selectedNote, onSubmit, onTitleChange, onContentChange }) => {
    return (
        <div className="margin-small">
            <form id="notes-form">
                <div>
                    <label>
                        <div className="title underlined">Name </div>
                        <input
                            type="text"
                            value={selectedNote.title || ""}
                            onChange={onTitleChange}
                            className="input title-input"
                            onBlur={onSubmit}
                        />
                    </label>
                </div>
                <div className="margin-top">
                    <label>
                        <div className="title underlined">Content </div>
                        <textarea
                            spellCheck="false"
                            onChange={onContentChange}
                            value={selectedNote.content || ""}
                            className="input content-input"
                            onBlur={onSubmit}
                        />
                    </label>
                </div>
            </form>
        </div>
    );
};

export default EditPanel;
