import { gql } from "apollo-boost";

export const GET_NOTES = gql`
    {
        getNotes {
            title
            content
            id
            order
        }
    }
`;

export const GET_NOTE = gql`
    query GetSingleNoteByID($id: ID!) {
        getNote(id: $id) {
            title
            content
            id
            order
        }
    }
`;

export const UPDATE_NOTE = gql`
    mutation UpdateNote($id: ID!, $title: String!, $content: String, $order: Int) {
        updateNote(id: $id, title: $title, content: $content, order: $order) {
            title
            content
            id
            order
        }
    }
`;

export const CREATE_NOTE = gql`
    mutation CreateNote($title: String!, $content: String, $order: Int) {
        createNote(title: $title, content: $content, order: $order) {
            title
            content
            id
            order
        }
    }
`;

export const DELETE_NOTE = gql`
    mutation DeleteNote($id: ID!) {
        deleteNote(id: $id) {
            id
            order
        }
    }
`;
