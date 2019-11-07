import axios from "axios";
import { apiURL } from "../config";

const notesURL = apiURL + "/notes";

export const getNote = id => {
  return axios.get(`${notesURL}/${id}`);
};

export const getAllNotes = () => {
  return axios.get(notesURL);
};

export const createNote = note => {
  return axios.post(notesURL, note);
};

export const updateNote = note => {
  return axios.put(`${notesURL}/${note.id}`, note);
};

export const deleteNote = id => {
  return axios.delete(`${notesURL}/${id}`);
};
