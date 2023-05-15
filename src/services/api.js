/* eslint-disable max-len */
import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://script.google.com/macros/s/AKfycbwQJQndq-kYDuYbbpkuS9FP_-hkn07GcwH_kPoazaNq9jPLLCWqqRGKr63zp-rfHYA/exec',
  withCredentials: false,
  method: 'get',
  headers: {
    'Content-Type': 'text/plain;charset=utf-8',
  },
});

export default api;
