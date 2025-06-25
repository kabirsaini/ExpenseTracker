import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/expenses',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchExpenses = () => API.get('/');
export const createExpense = (expense) => API.post('/', expense);
export const updateExpense = (id, expense) => API.put(`/${id}`, expense);
export const deleteExpense = (id) => API.delete(`/${id}`);
