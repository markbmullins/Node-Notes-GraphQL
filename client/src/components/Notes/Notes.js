import React from 'react';
import {getAllNotes} from "../../utils/api/apiUtils";

const Notes = () => {
    return (
        <div>
        <div>Notes:</div>
        <div>{getAllNotes() ? getAllNotes.data : ""}</div>
        </div>
    );
};

export default Notes;