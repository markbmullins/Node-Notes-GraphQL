import React from 'react';
const ReactMarkdown = require('react-markdown');

const PreviewPanel = ({ selectedNote}) => {
    return (
        <div className="margin-small">
            <div className="title underlined">{selectedNote.title}</div>
            <ReactMarkdown source={selectedNote.content} />
        </div>
    );
};

export default PreviewPanel;
