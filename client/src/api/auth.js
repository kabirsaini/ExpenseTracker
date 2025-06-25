import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/auth' });

export const loginUser = (credentials) => API.post('/login', credentials);
export const registerUser = (credentials) => API.post('/register', credentials);
