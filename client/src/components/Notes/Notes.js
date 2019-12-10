import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_NOTES, UPDATE_NOTE, CREATE_NOTE, DELETE_NOTE } from "../../utils/api/apolloUtils";
import "./Notes.scss";
import PreviewPanel from "../PreviewPanel/PreviewPanel";
import ListPanel from "../ListPanel/ListPanel";
import EditPanel from "../EditPanel/EditPanel";

/**
 *  Sorts an array of notes by their order property
 * @param {Array} data an array of notes
 */
const sortByOrder = data => {
    if (data && Array.isArray(data) && data.length !== 0) {
        data.sort((a, b) => (a.order > b.order ? 1 : -1));
    }
};

/**
 * Returns the highest order number in a list of notes
 * @param {Array} data an array of notes
 */
const getHighestOrder = data => {
    let highest = -1;
    data.forEach(note => {
        if (note.order > highest) highest = note.order;
    });
    return highest;
};

/**
 * Adds item to the end of an array of items
 * @param {*} a original array of items
 * @param {*} b item to add to array
 */
const addToArray = (a, b) => [...a, b];

/**
 * Filters item from array by id property
 * @param {*} a array of items with an id property
 * @param {*} b item to remove from array
 */
const filterFromArrayById = (a, b) => a.filter(a => a.id !== b.id);

// TODO: Fix selected note updating incorrectly after delete
const Notes = () => {
    /**
     * Local state
     */
    const [selectedNote, setSelectedNote] = useState({
        id: "",
        title: "",
        content: ""
    });

    /**
     * GraphQL Queries
     */
    const { loading, error, data } = useQuery(GET_NOTES);

    if (data && data.getNotes) {
        sortByOrder(data.getNotes);
    }

    /**
     * GraphQL Mutations
     */
    const [updateNoteMutation] = useMutation(UPDATE_NOTE);

    /**
     * Reads cache and updates it with a passed in note, in a manner defined
     * by the filter function.
     * @param {Object} cache A reference to the Apollo Cache object
     * @param {Object} note The note that is being added, updated or removed from cache.
     * @param {Object} filterFunction The function to apply to the list of notes from cache. 
     */
    const updateCache = (cache, note, filterFunction) => {
        const { getNotes: notes } = cache.readQuery({ query: GET_NOTES });
        cache.writeQuery({
            query: GET_NOTES,
            data: { getNotes: filterFunction(notes, note) }
        });
    };

    const [createNoteMutation] = useMutation(CREATE_NOTE, {
        update(cache, { data: { createNote } }) {
            updateCache(cache, createNote, addToArray);
            setSelectedNote(createNote);
        }
    });

    const [deleteNoteMutation] = useMutation(DELETE_NOTE, {
        update(cache, { data: { deleteNote } }) {
            updateCache(cache, deleteNote, filterFromArrayById);
            setSelectedNote(deleteNote.order - 1);
        }
    });

    /**
     * Handlers
     */

    /**
     * Handles the title change event
     * @param {Event} e change event emitted from the input element 
     */
    const handleTitleChange = e =>
        setSelectedNote({ ...selectedNote, title: e.target.value });

    /**
     * Handles the content change event
     * @param {Event} e change event emitted from the textarea element
     */
    const handleContentChange = e =>
        setSelectedNote({ ...selectedNote, content: e.target.value });

    const handleNewNote = () =>
        createNoteMutation({
            variables: { content: "", title: "", order: getHighestOrder(data.getNotes) + 1 }
        });

    const handleDelete = id => deleteNoteMutation({ variables: { id } });

    /**
     * Handles the event from the submit button and executes update mutatuin
     * with the selected note.
     * @param {Event} e submit event emitted from submit button
     */
    const handleSubmit = e => {
        e.preventDefault();
        if (!selectedNote) return;

        const variables = {
            content: selectedNote.content,
            title: selectedNote.title
        };

        // Note should have an id because new note 
        // function stores a blank note in the DB 
        if (selectedNote.id) {
            updateNoteMutation({
                variables: {
                    id: selectedNote.id,
                    ...variables
                }
            });
        }
    };

    return (
        <div className="window">
            <div className="flex-row full-window">
                <div className="border-right-solid third-window">
                    <ListPanel
                        data={data}
                        isLoading={loading}
                        error={error}
                        selectedNote={selectedNote}
                        onSelectNote={setSelectedNote}
                        onDelete={handleDelete}
                        onNewNote={handleNewNote}
                    />
                </div>
                <div className="border-right-solid third-window">
                    <EditPanel
                        selectedNote={selectedNote}
                        onSubmit={handleSubmit}
                        onTitleChange={handleTitleChange}
                        onContentChange={handleContentChange}
                    />
                </div>
                <div className="third-window">
                    <PreviewPanel selectedNote={selectedNote} />
                </div>
            </div>
        </div>
    );
};

export default Notes;
