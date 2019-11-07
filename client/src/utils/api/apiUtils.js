import axios from 'axios';
import { apiURL } from '../config';

const notesURL = apiURL + '/notes';

export const getNote = id => {
    console.log(`Called getNote API call with id: ${id}.`);
    return axios.get(`${notesURL}/${id}`);
};

export const getAllNotes = () => {
    console.log('Called getAllNotes API call.');
    return axios.get(notesURL);
};

export const createNote = note => {
    console.log(`Called createNote API call with note: ${note}.`);
    return axios.post(notesURL, note);
};

export const updateNote = note => {
    console.log(`Called updateNote API call with id: ${note._id}.`);
    return axios.put(`${notesURL}/${note._id}`, note);
};

export const deleteNote = id => {
    console.log(`Called deleteNote API call with id: ${id}.`);
    return axios.delete(`${notesURL}/${id}`);
};
