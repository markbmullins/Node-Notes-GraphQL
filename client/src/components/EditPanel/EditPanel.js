import React from "react";

const EditPanel = (onSubmit, title, onTitleChange, content, onContentChange) => {
    return (
        <div className="current-note-panel">
            <form onSubmit={onSubmit} id="notes-form">
                <div>
                    <label>
                        <div className="title underlined">Name: </div>
                        <input
                            type="text"
                            value={title}
                            onChange={onTitleChange}
                            className="title-input"
                        />
                    </label>
                </div>
                <div className="content-input-section">
                    <label>
                        <div className="title underlined">Content: </div>
                        <textarea
                            spellCheck="false"
                            onChange={onContentChange}
                            value={content}
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
    );
};

export default EditPanel;
