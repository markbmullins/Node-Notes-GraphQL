import React from "react";
const ReactMarkdown = require("react-markdown");

const PreviewPanel = ({ content, title }) => {
    return (
        <div className="margin-small">
            <div className="title underlined">{title}</div>
            <ReactMarkdown source={content} />
        </div>
    );
};

export default PreviewPanel;
