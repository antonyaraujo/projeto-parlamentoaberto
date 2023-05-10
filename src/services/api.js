/* eslint-disable max-len */
import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://api.sheety.co/a012ef1bf2a0ba7f75fabc5dd7989da5/parlamentoAberto/plan1',
  withCredentials: false,
  method: 'get',
  headers: {
    'Content-Type': 'text/plain;charset=utf-8',
  },
});

export default api;
