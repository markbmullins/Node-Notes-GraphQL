import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    GET_NOTES,
    UPDATE_NOTE,
    CREATE_NOTE,
    DELETE_NOTE
} from '../../utils/api/apolloUtils';
import './Notes.scss';
import PreviewPanel from '../PreviewPanel/PreviewPanel';
import ListPanel from '../ListPanel/ListPanel';
import EditPanel from '../EditPanel/EditPanel';

const Notes = () => {
    /**
     * Local state
     */
    const [selectedNote, setSelectedNote] = useState({
        id: '',
        title: '',
        content: ''
    });

    /**
     * GraphQL Mutations
     */
    const { loading, error, data } = useQuery(GET_NOTES);
    let notes;
    if (data) notes = data.getNotes;
    const [updateNoteMutation] = useMutation(UPDATE_NOTE);
    const [createNoteMutation] = useMutation(CREATE_NOTE, {
        update(cache, { data: { createNote } }) {
            const { getNotes: notes } = cache.readQuery({ query: GET_NOTES });
            cache.writeQuery({
                query: GET_NOTES,
                data: { getNotes: [...notes, createNote] }
            });
            setSelectedNote(createNote);
        }
    });
    const [deleteNoteMutation] = useMutation(DELETE_NOTE, {
        update(cache, { data: { deleteNote } }) {
            const { getNotes: notes } = cache.readQuery({ query: GET_NOTES });
            cache.writeQuery({
                query: GET_NOTES,
                data: { getNotes: notes.filter(note => note.id !== deleteNote) }
            });
            setSelectedNote(deleteNote);
        }
    });

    /**
     * Handlers
     */
    const handleSelectNote = note => setSelectedNote(note);

    const handleTitleChange = event =>
        setSelectedNote({ ...selectedNote, title: event.target.value });

    const handleContentChange = event =>
        setSelectedNote({ ...selectedNote, content: event.target.value });

    const handleSubmit = event => {
        event.preventDefault();
        if (selectedNote && selectedNote.id) {
            updateNoteMutation({
                variables: {
                    id: selectedNote.id,
                    content: selectedNote.content,
                    title: selectedNote.title
                }
            });
        } else {
            createNoteMutation({
                variables: {
                    content: selectedNote.content,
                    title: selectedNote.title
                }
            });
        }
    };

    const handleNewNote = () => {
        createNoteMutation({ variables: { content: '', title: '' } });
    };

    const handleDelete = id => {
        console.log('id in handle delete: ', id);
        deleteNoteMutation({ variables: { id } });
    };

    return (
        <div className="window">
            <div className="flex-row full-window">
                <div className="border-right-solid third-window">
                    <ListPanel
                        notes={notes}
                        isLoading={loading}
                        error={error}
                        selectedNote={selectedNote}
                        onSelectNote={handleSelectNote}
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
