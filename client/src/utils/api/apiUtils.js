import axios from 'axios';
import { apiURL } from '../config';

const notesURL = apiURL + '/notes';

export const getNote = id => {
  axios.get(`${notesURL}/${id}`).then(res => {
    console.log('data: ', res.data);
    return res.data;
  });
};

export const getAllNotes = () => {
  console.log('called');
  axios.get(notesURL).then(res => {
    console.log('data: ', res.data);
    return res.data;
  });
};

export const createNote = note => {
  axios.post(notesURL, note).then(res => console.log(res.data));
};

export const updateNote = (id, note) => {
  axios.put(`${notesURL}/${id}`, note).then(res => console.log(res.data));
};

export const deleteNote = id => {
  axios.delete(`${notesURL}/${id}`).then(res => console.log(res.data));
};
